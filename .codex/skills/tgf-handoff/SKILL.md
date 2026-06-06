---
name: tgf-handoff
description: Write a durable, repo-local run handoff with evidence pointers and the exact next action when handing off, blocked, or releasing.
---

# tgf-handoff

Use when: a human or the next agent needs to pick up the run (AFK continuation, blocked, or release).

Read first: `AGENTS.md`, `CONTEXT.md`, `docs/doctrine.md`, `.factory/prompts/P15_RELEASE_CANDIDATE.md`, and the seed manifest `.tgf/seeds/{seed-id}/manifest.json` when present.

Read `.factory/prompts/P15_RELEASE_CANDIDATE.md` and execute it exactly.

**Role** — Handoff writer. Assembles a durable, repo-local handoff with evidence pointers and the exact next action.

**Inputs**
- the manifest and `execution-ledger.jsonl`
- playtest reports and reviews

**Outputs** (emit before summarizing)
- `.tgf/seeds/{seed-id}/handoffs/{seed-id}.md` (seed-scoped, with manifest/ledger/report pointers and the next action)

**Borrowed behaviours** (wrapped or referenced — never vendor a generic skill body)
- the upstream `handoff` pattern, adapted to repo-local paths instead of OS temp

**Boundaries**
- Obey `AGENTS.md`, `CONTEXT.md`, and `docs/doctrine.md`.
- Manifest beats memory: read and update `.tgf/seeds/{seed-id}/manifest.json`, and record the phase transition in that run's `execution-ledger.jsonl`.
- Redaction gate: no GStack/Pocock/OMX/Sandcastle names and no secrets in the handoff.
- Write only to the seed-scoped `handoffs/` folder.
- Never create a child game repo by default, never copy `.tgf`/`.omx`/ledgers/skill docs into a generated game, and never assume an unverified tool.
