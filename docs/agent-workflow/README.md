# Universal Agent Workflow Kit

This folder contains project-agnostic agent operating documents extracted from the current repository workflow.

Use these files when a repository should be handled by a local implementation agent that:

- reads explicit project instructions before acting
- modifies the local repository in small, reviewable units
- records state, commands, validation, and visual QA evidence
- prepares a complete review packet for an external GPT Pro reviewer
- applies only concrete required reviewer feedback
- avoids duplicate ChatGPT sends and unsafe browser retries

## Files

- `AGENTS.template.md`: root-level agent instructions to copy to `AGENTS.md`.
- `codex-loop.template.md`: task loop and completion rules to copy to `codex-loop.md`.
- `review-template.md`: external reviewer packet template to copy to `.codex/review-template.md`.
- `agent-inbox.README.template.md`: trusted user-inbox instructions to copy to `agent-inbox/README.md`.
- `chrome-gpt-pro-runbook.md`: browser-controlled ChatGPT/GPT Pro review procedure.
- `visual-qa-runbook.md`: visual verification expectations for UI, document, image, and browser-facing work.
- `antigravity-frontend-runbook.md`: optional frontend delegation workflow for Antigravity or a similar IDE agent.
- `state-template.md`: `.codex/state.md` structure.
- `current-task-template.md`: `.codex/current-task.md` structure.
- `setup-guide.md`: how to install and adapt the workflow in another repository.

## Recommended Target Layout

```text
<project>/
  AGENTS.md
  codex-loop.md
  .codex/
    current-task.md
    state.md
    review-template.md
    review-packet.md
    pro-review.md
    qa/
  agent-inbox/
    README.md
    instructions.md
```

The templates intentionally avoid this repository's product names, routes, and deployment details. Add those details only in `.codex/current-task.md`, `.codex/state.md`, or `agent-inbox/*.md` for the target project.
