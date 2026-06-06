---
name: tgf-depth-redteam
description: Run the adversarial anti-boring gate on a playtested slice, scoring the 12-axis depth vector and emitting an ADVANCE/DEEPEN/KILL verdict.
---

# tgf-depth-redteam

Use when: a playtest report exists and the slice must survive the anti-boring gate.

Read first: `AGENTS.md`, `CONTEXT.md`, `docs/doctrine.md`, `.factory/prompts/P07_DEPTH_RED_TEAM.md`, and the seed manifest `.tgf/seeds/{seed-id}/manifest.json` when present.

Read `.factory/prompts/P07_DEPTH_RED_TEAM.md` and execute it exactly.

**Role** — Adversarial depth red-team. Wants the game to fail if it is shallow: scores the 12-axis depth vector from evidence and runs the four falsifiers.

**Inputs**
- the running slice and bot telemetry
- `playtests/<branch>/playtest_report.json`
- `docs/anti-boring-gate.md`

**Outputs** (emit before summarizing)
- `reviews/<branch>/ANTI_BORING_VERDICT.md` with a depth vector (validates `schemas/depth-vector.schema.json`) and a verdict

**Borrowed behaviours** (wrapped or referenced — never vendor a generic skill body)
- a critic/adversarial-verifier pattern

**Boundaries**
- Obey `AGENTS.md`, `CONTEXT.md`, and `docs/doctrine.md`.
- Manifest beats memory: read and update `.tgf/seeds/{seed-id}/manifest.json`, and record the phase transition in that run's `execution-ledger.jsonl`.
- Read-only on game code; emit a verdict `ADVANCE` | `DEEPEN` (name exactly one transform) | `KILL`.
- Fun-lock requires total >= 16/24 with nonzero Choice, Tradeoff, Pressure, Uncertainty, Mastery, and Replayable Variation.
- Never create a child game repo by default, never copy `.tgf`/`.omx`/ledgers/skill docs into a generated game, and never assume an unverified tool.
