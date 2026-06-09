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

2026-06-09 steering update:

- New GPT-5.5 Pro code/product reviews should not use `심층 리서치`.
- Use a normal ChatGPT `새 채팅` with `최신 • 5.5` and `Pro 확장`, and verify the composer does not show the `심층 리서치` chip before sending.
- The Deep Research extraction procedure below is retained only for recovering or auditing already-created Deep Research reports.

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
- 2026-06-10 00:34 KST current resume: `computer-use:list_apps` succeeded and showed Stickies running, but both `get_app_state("com.apple.Stickies")` and `get_app_state("Stickies")` returned `cgWindowNotFound`. Treat as no visible Stickies window found and continue by reading `agent-inbox/`.

## 2026-06-10: Chrome/ChatGPT image generation control degradation

Observed evidence:

- Chrome browser-client setup succeeded and `browser.user.openTabs()` returned open tabs including `https://chatgpt.com/`.
- Claiming or screenshotting the existing ChatGPT tab timed out at 45-60 seconds and reset the Node browser-control session.
- After reading Chrome troubleshooting, a lightweight `openTabs()` retry still succeeded, so the native host/extension was not fully disconnected.
- A second attempt to claim the existing ChatGPT tab without navigation also timed out and reset the session.

Decision:

- Do not send duplicate ChatGPT image prompts while tab claim/screenshot cannot be proven safe.
- For the `/customize` option modal slice, keep the UI non-broken by using existing GPT-generated/project visual assets as temporary image fallbacks and record the 9 assets that must be regenerated later.
- Next recovery should start with a fresh Chrome tab or a visible user-confirmed ChatGPT state, then prove composer/model/action/send safety before any image prompt.

## 2026-06-10: Chrome/ChatGPT image generation recovery notes

Observed recovery:

- Stickies became visible again and said `크롬 고쳤어. 다시 테스트 시작해`.
- Chrome extension tab claiming and pageAssets export worked again for ChatGPT.
- For image generation, the safe evidence pattern was:
  - `Thinking • 확장` menu item has `aria-checked="true"`.
  - `Pro • 확장` has `aria-checked="false"`.
  - Composer has `이미지` chip and no `심층 리서치` chip.
  - Composer text is exactly the intended option prompt.
  - Send button exposes `aria-label="프롬프트 보내기"` and is enabled.
- ChatGPT repeatedly restored a stale draft text `스티커 좀 봐줘` in fresh chats. Clear the composer with select-all/delete immediately after every `새 채팅`, and clear again after enabling `이미지 만들기` before pasting the intended prompt.
- Some abstract technical prompts (`ess`, `iot-package`, first `cellular-router`) stalled at `더욱 자세한 이미지를 생성하고 있습니다` without emitting a new image asset. If no `답변 중지` remains and pageAssets has no new ChatGPT `backend-api/estuary/content` image, record the failed attempt and retry with a simpler physical-scene prompt rather than resending the same prompt.

## 2026-06-10: updated Stickies image-generation steering

Visible Stickies note changed to:

> 탭을 병렬로 실행해서 이미지 생성을 병렬로 진행해.
> 그 중에서 5분이상 이미지 생성이 되지 않는 것들은 새로고침을 시도해보거나 그래도 이미지가 나타나지 않으면 실패한것으로 간주하고 재시도해.

Operational interpretation for Weet image work:

- Keep the user's option-by-option prompt discipline: one option image per prompt/chat.
- When many option images remain, multiple Chrome tabs may run separate one-option prompts in parallel so the user can see progress.
- If any run is stuck for 5+ minutes, first verify whether `답변 중지`/generation is still active. If safe, refresh or record that attempt as failed, then retry with a simpler physical-scene prompt.
- Do not duplicate-send a prompt unless the latest visible turn proves no send occurred.

## 2026-06-10: ChatGPT review packet paste size workaround

- Chrome/ChatGPT normal review chat was configured as `최신 • 5.5`, `Pro • 확장`, with no `심층 리서치` or image chip.
- A single 29KB review-packet paste was silently rejected by the visible `#prompt-textarea`, even though `chromeTab.clipboard.readText()` confirmed the full marker-matched packet was on the clipboard.
- Small/medium pastes worked after focusing the visible contenteditable textbox with CUA coordinates.
- Workaround: clear the composer, split the packet into ~3.5KB chunks, write each chunk to the Chrome tab clipboard, and paste each chunk with `CMD+V`. Verify final composer text length and marker before clicking `프롬프트 보내기`.
