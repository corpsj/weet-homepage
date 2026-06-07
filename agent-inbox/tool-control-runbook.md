# Tool Control Runbook

## 2026-06-07: Antigravity IDE + Computer Use failure

Observed root causes:

- The machine has both `/Applications/Antigravity IDE.app` and `/Applications/Antigravity.app`.
- The Weet workspace is attached to `Antigravity IDE.app`; process evidence includes `--workspace_id file_Users_zoopark_studio_Documents_dev_weet_homepage`.
- `Antigravity IDE.app` has `CFBundleIdentifier=com.google.antigravity-ide`, `CFBundleName=Antigravity IDE`, but `CFBundleExecutable=Electron`.
- macOS visible process list exposes the IDE as `Electron`, not `Antigravity IDE`. This explains why Computer Use app lookup by `"Antigravity IDE"` can miss or hang.
- Computer Use also had multiple stale `SkyComputerUseClient mcp` processes. When `computer-use/list_apps` itself times out, the issue is the Computer Use bridge, not Antigravity.

Recovery checklist before delegating frontend work to Antigravity:

1. Verify the correct app and workspace:
   - `ls -la /Applications | rg -i 'Antigravity'`
   - `/usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' '/Applications/Antigravity IDE.app/Contents/Info.plist'`
   - `ps aux | rg -i 'Antigravity IDE|workspace_id file_Users_zoopark_studio_Documents_dev_weet_homepage'`
2. If Computer Use `list_apps` times out, do not keep trying Antigravity names. First inspect/clear stale bridge clients:
   - `pgrep -fl 'SkyComputerUseClient|SkyComputerUseService|Codex Computer Use'`
   - `pkill -f 'SkyComputerUseClient mcp' || true`
   - `open -a "$HOME/.codex/computer-use/Codex Computer Use.app" || true`
3. After bridge recovery, try Computer Use in this order:
   - `list_apps`
   - `get_app_state("Electron")`
   - `get_app_state("com.google.antigravity-ide")`
   - `get_app_state("/Applications/Antigravity IDE.app")`
4. If Computer Use returns `Transport closed`, the current tool session is broken. Stop using Computer Use in that turn and record the failure; a fresh turn/session is needed.

Do not confuse `Antigravity.app` (`com.google.antigravity`) with `Antigravity IDE.app` (`com.google.antigravity-ide`). The current repository frontend handoff target is the IDE app.

Latest retest:

- 2026-06-07: `computer-use/list_apps` immediately returned `Transport closed`.
- This means Antigravity IDE control is not yet fully verified in the current Codex tool session.
- The Antigravity identification problem is understood, but the Computer Use bridge must be healthy before claiming successful IDE control.
- Next fresh attempt must start with `list_apps`; only after it succeeds should the agent try `get_app_state("Electron")`, `get_app_state("com.google.antigravity-ide")`, and `get_app_state("/Applications/Antigravity IDE.app")`.
- 2026-06-07 follow-up user test asked to type `안녕` into Antigravity without sending. `computer-use/list_apps` still returned `Transport closed`; reopening `~/.codex/computer-use/Codex Computer Use.app` did not restore the tool connection. No text was typed into Antigravity.
- 2026-06-07 skill update: `/Users/zoopark-studio/.codex/skills/antigravity-frontend/SKILL.md` now includes a required Computer Use bridge preflight, the `Electron`/bundle-id/path target sequence, and a prompt input smoke test that pastes `안녕` without sending. `/Users/zoopark-studio/.codex/skills/antigravity-frontend/agents/openai.yaml` was updated to match. `python3 .../skill-creator/scripts/quick_validate.py` returned `Skill is valid!`.
- 2026-06-07 post-update live check: `computer-use:list_apps` still returned `Transport closed`, so the improved skill is ready for the next healthy Computer Use session but the current session still cannot type into Antigravity.

## 2026-06-07: Cockpit Tools launch hypothesis

Observed evidence:

- `launchctl list` showed `application.com.jlcodes.cockpit-tools...` and `ai.hermes.gateway-codex` running alongside Codex-related processes.
- Long-lived `SkyComputerUseClient ... turn-ended` processes were orphaned under parent pid `1`, which means they outlived their original Codex turn/session parent.
- `computer-use:list_apps` returned `Transport closed` even after reopening `~/.codex/computer-use/Codex Computer Use.app`.
- Only Codex crashpad helpers were visible in the process query, while the active tool-side transport stayed closed.

Likely interpretation:

- If Codex is launched through Cockpit Tools or an intermediate gateway instead of a direct normal Codex Desktop app session, the MCP/Computer Use transport may be attached to a wrapper-managed session and fail to reconnect after stale `SkyComputerUseClient` cleanup.
- In that state, Antigravity IDE can be running correctly and still be unreachable because the broken layer is the Codex-to-Computer-Use bridge.

Recommended recovery:

1. Quit Codex Desktop and Cockpit Tools completely.
2. Remove stale Computer Use turn clients only after quitting:
   - `pkill -f 'SkyComputerUseClient .*turn-ended' || true`
   - `pkill -f 'SkyComputerUseClient mcp' || true`
3. Launch Codex Desktop directly from `/Applications/Codex.app`, not through Cockpit Tools, for any work requiring Computer Use.
4. Start or resume a thread and immediately run `computer-use:list_apps`.
5. If `list_apps` succeeds, continue with the Antigravity target sequence.
6. If `list_apps` still returns `Transport closed`, treat it as a Codex/Computer Use session issue rather than an Antigravity issue.

Direct recovery attempt results:

- 2026-06-07: The agent attempted to quit Cockpit Tools with AppleScript, killed stale `SkyComputerUseClient ... turn-ended` and `SkyComputerUseClient mcp` clients, reopened `~/.codex/computer-use/Codex Computer Use.app`, and confirmed `SkyComputerUseService` was running.
- Process evidence then showed the active Codex renderer/service using `--user-data-dir=/Users/zoopark-studio/.antigravity_cockpit/instances/codex-app-data/...`, proving the active Codex session was launched/mediated through Antigravity Cockpit/Cockpit Tools state.
- `computer-use:list_apps` still returned `Transport closed` after the cleanup.
- The agent launched a direct `/Applications/Codex.app` instance with `open -na /Applications/Codex.app`; this did not repair the current thread's already-closed MCP transport.
- Conclusion: once the current thread's Computer Use transport is closed inside a Cockpit-mediated Codex session, helper cleanup and launching another Codex instance do not reconnect the existing MCP tool. Continue from a freshly opened direct Codex Desktop session and test `computer-use:list_apps` there.
- 2026-06-07 after Codex relaunch: `computer-use:list_apps` succeeded. Antigravity IDE appeared as `/Applications/Antigravity IDE.app/`, bundle id `com.google.antigravity-ide`, frontmost/running. `get_app_state("Antigravity IDE")` succeeded, the Agent composer was visible, and the agent pasted `안녕` into the `Message input` without clicking Send. The send button became enabled, proving prompt input works.

## 2026-06-07: ChatGPT Deep Research report extraction

Observed root cause:

- Completed Deep Research reports may be visually present while normal page text and `[data-message-author-role="assistant"]` show an empty `ChatGPT의 말:` turn.
- The report card is exposed through Chrome visible DOM / accessibility-style output, not ordinary assistant message DOM extraction.
- On the observed report tab, `dom_cua.get_visible_dom()` exposed:
  - `button aria-label="내보내기"` for export.
  - `button "내용 복사"`.
  - `button "마크다운으로 내보내기"`.
  - `button "Word로 내보내기"`.
  - `button "PDF로 내보내기"`.
  - `div role="button"` containing the visible report text, starting with `VERDICT: PASS`.
- Clicking `마크다운으로 내보내기` did not emit a Playwright `download` event, but it silently created `~/Downloads/deep-research-report (1).md`.

Correct extraction procedure:

1. Never click `답변 중지` while research may be generating. Treat `답변 중지` as proof that generation is active.
2. If ordinary DOM says the assistant is empty but the screen shows a report, call `tab.dom_cua.get_visible_dom()` and search for `내보내기`, `마크다운으로 내보내기`, `PDF로 내보내기`, or the marker/verdict text.
3. Click `내보내기`, then click `마크다운으로 내보내기`.
4. Do not rely on `waitForEvent("download")`; check Downloads directly:
   - `find ~/Downloads -maxdepth 1 -type f -mmin -10 -print0 | xargs -0 ls -lt | sed -n '1,20p'`
5. Copy the newest `deep-research-report*.md` into `.codex/pro-review.md` only after it contains a plausible marker-matched report or the expected review format.

Observed successful file:

- `~/Downloads/deep-research-report (1).md`
- Size: `4957` bytes
- SHA-256: `4bee8c809afd9b295c896a2d2ba092ccfd2dfbebf15bd8c6166433f0186128b7`
- Verdict: `PASS`

## 2026-06-07: Stickies steering notes

User instruction:

- Continuously monitor the macOS Stickies app for steering notes.

Current tool state:

- `Stickies` is running: `/System/Applications/Stickies.app/Contents/MacOS/Stickies`.
- Computer Use `get_app_state("Stickies")` timed out twice before bridge cleanup.
- After stale `SkyComputerUseClient mcp` cleanup, Computer Use returned `Transport closed`; Stickies could not be read in the same turn.

Next attempt procedure:

1. First verify Computer Use bridge with `list_apps`.
2. If `list_apps` works, read `get_app_state("Stickies")`.
3. If it still fails, record the exact failure in `.codex/state.md` and `agent-inbox/tool-control-runbook.md`.

Live recovery:

- 2026-06-07 after Codex relaunch: `get_app_state("com.apple.Stickies")` and `get_app_state("Stickies")` both succeeded.
- Current visible note says to check `agent-inbox`, deeply analyze and fix why Antigravity IDE could not be used through Computer Use, remember that research is in progress, and never stop research mid-generation.
- A Codex heartbeat automation named `Stickies steering monitor` was created with id `stickies-steering-monitor` to re-check Stickies every 5 minutes in this thread.
- 2026-06-07 final resume: `computer-use:list_apps` succeeded and showed Stickies running, but both `get_app_state("com.apple.Stickies")` and `get_app_state("Stickies")` returned `cgWindowNotFound`. Treat this as "no visible Stickies window found" rather than a Computer Use transport failure; retry after the Stickies note window is visible.
