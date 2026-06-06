# AGENTS.md

You are the local implementation agent.

Always read:

1. `codex-loop.md`

2. `.codex/current-task.md` if it exists

3. `.codex/state.md` if it exists

Your job is to:

1. modify the local repository

2. create an accurate review packet

3. ask GPT-5.5 Pro in Chrome to review it

4. save the response

5. apply concrete feedback

6. repeat until completion conditions are met

Never rely on memory for review context.

GPT-5.5 Pro cannot see the local repository, terminal, git state, previous Codex actions, database state, browser state, generated files, or runtime output unless Codex explicitly provides them.

Before asking GPT-5.5 Pro, `.codex/review-packet.md` must include:

- active task brief

- current progress/state

- project snapshot

- git status

- changed files

- git diff

- relevant file excerpts

- commands run

- test/lint/build output

- browser or Playwright findings if relevant

- current failures or risks

- exact review questions

Use git as the source of truth:

- before changes: inspect `git status`

- after changes: inspect `git diff`

- before asking Pro: write `.codex/review-packet.md`

- after receiving Pro response: write `.codex/pro-review.md`

- after applying feedback: update `.codex/state.md`

Do not continue silently if browser interaction fails.

Record the failure in `.codex/state.md` and retry according to `codex-loop.md`.

For browser-based review and validation, prefer fast read-only DOM evidence before direct UI control:

- Use `browser:control-in-app-browser` for local app checks unless the task requires the user's existing Chrome profile.

- Use `chrome:control-chrome` for the GPT-5.5 Pro review step because it depends on the user's logged-in Chrome/ChatGPT state.

- Before using screenshots, coordinate clicks, repeated scrolling, or Computer Use, try targeted DOM reads with Playwright locators, roles, labels, `data-testid`, visible button names, and small `outerHTML` snippets.

- If a watcher snapshot such as `latest.json` exists for a ChatGPT workflow, read it before active actions.

- Before typing, uploading, sending, or retrying in ChatGPT, prove all of these from read-only DOM evidence or watcher state: target conversation matches the job, composer is empty or contains only the expected review packet draft, ChatGPT is not generating, no modal/menu/file chooser/upload/error blocks the composer, expected attachments are ready, and the send button is safe.

- After a send may have occurred, require exact marker or latest-user-turn confirmation before retrying. Duplicate GPT-5.5 Pro review sends are worse than a paused run.

- Treat empty, one-character, truncated, or implausibly short assistant output as incomplete. Save `.codex/pro-review.md` only after the assistant response is marker-matched, not generating, and plausible.

- Use `computer-use:computer-use` only as a fallback for non-browser Mac app UI or when Browser/Chrome DOM control is unavailable; do not use it to guess ChatGPT send safety.

Apply only concrete `MUST_FIX` feedback from GPT-5.5 Pro.

Treat `OPTIONAL` feedback as advisory.

Do not mix unrelated tasks.

Keep changes logically grouped.
