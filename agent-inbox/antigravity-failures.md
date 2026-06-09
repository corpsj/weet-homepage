# Antigravity Failures

Antigravity is required for frontend/design implementation when available. Record failures here before continuing directly in Codex.

## 2026-06-07

- Antigravity IDE session was available and completed the first frontend/design implementation slice.
- Accepted intended Antigravity changes after reviewing scope:
  - `/customize` floorplan duplicate overlay fix.
  - Premium admin shell/sidebar/dashboard redesign.
  - E2E update for floorplan single-rendering behavior.
  - Initial implementation backlog notes.
- No active Antigravity failure remains for this slice.

## 2026-06-07 floorplan zoom slice

- Intended handoff: `/customize` floorplan zoom/fullscreen viewer and mobile E2E coverage.
- Failure:
  - `get_app_state("Antigravity IDE")` returned `cgWindowNotFound`.
  - `get_app_state("com.google.antigravity-ide")` returned `cgWindowNotFound`.
  - `open -a "Antigravity IDE"` succeeded at shell level, but `get_app_state("Antigravity IDE")` still returned `cgWindowNotFound`.
  - `get_app_state("/Applications/Antigravity IDE.app")` timed out after 120s.
- Decision: continue directly in Codex for this small UX slice to avoid stopping the recursive improvement loop.

## 2026-06-07 admin child console slice

- Intended handoff: admin child page visual unification using `agent-inbox/generated-ui-reference-admin-console.png` as the UI guide image.
- Failure:
  - `computer-use:list_apps` timed out after 120s.
  - `get_app_state("Antigravity IDE")` timed out after 120s.
- Decision: continue directly in Codex for this slice after recording the failure, because the repository loop requires progress and no safe Antigravity IDE input surface was reachable.
- Recovery attempt:
  - `open -a "Antigravity IDE"` succeeded and `ps aux | rg -i "Antigravity|antigravity"` showed `/Applications/Antigravity IDE.app/Contents/MacOS/Electron` plus the `file_Users_zoopark_studio_Documents_dev_weet_homepage` workspace language server.
  - `get_app_state("Antigravity IDE")` still timed out after 120s.
  - Current narrowed cause: Antigravity IDE is running, but Computer Use cannot retrieve the app window state in this Codex session.

## 2026-06-07 root-cause update

- There are two Antigravity apps:
  - `/Applications/Antigravity IDE.app` with bundle id `com.google.antigravity-ide`, bundle name `Antigravity IDE`, executable `Electron`.
  - `/Applications/Antigravity.app` with bundle id `com.google.antigravity`, bundle name/executable `Antigravity`.
- The Weet workspace is attached to `Antigravity IDE.app`, not `Antigravity.app`.
- macOS visible process list exposes the IDE as `Electron`, so Computer Use app lookup by `"Antigravity IDE"` can fail even when the IDE is open.
- Computer Use itself also had stale `SkyComputerUseClient mcp` processes; when `list_apps` times out, the bridge is unhealthy and app-name retries are wasted.
- After `pkill -f 'SkyComputerUseClient mcp'`, the current tool session returned `Transport closed`, which means Computer Use must be retried from a fresh session/turn.
- Future recovery procedure is documented in `agent-inbox/tool-control-runbook.md`.

## 2026-06-09 solution renewal slice

- Intended handoff: renew `/solution`, `/solution/cctv`, `/solution/network`, `/solution/iot`, and `/solution/design` with newly generated Korean photorealistic option images and operations-first UX.
- Computer Use was healthy and Antigravity IDE (`com.google.antigravity-ide`) was reachable.
- Antigravity accepted the implementation prompt, explored files, and ran `npm run lint`, but produced no code diff after repeated polling.
- Antigravity was already in `User cancelled agent execution` state when rechecked; no pending edit/accept controls remained.
- Decision: record the no-diff handoff failure and continue directly in Codex so the user-requested solution renewal could complete.
