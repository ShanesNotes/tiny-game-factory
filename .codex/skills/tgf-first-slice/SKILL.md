---
name: tgf-first-slice
description: Use to build the first playable loop once an engine ADR is accepted and a lane is selected, wiring deterministic RNG, bots, smoke run, and tests.
---

# tgf-first-slice

Use when: an engine ADR is accepted and a lane is selected; build the first playable loop.

Read first: `AGENTS.md`, `CONTEXT.md`, `docs/doctrine.md`, `.factory/prompts/P04_FIRST_PLAYABLE_SLICE.md`, and the seed manifest `.tgf/seeds/{seed-id}/manifest.json` when present.

Read `.factory/prompts/P04_FIRST_PLAYABLE_SLICE.md` and execute it exactly.

**Role** — First-slice engineer. Builds one complete loop with deterministic RNG, a debug overlay, random + skilled bots, a 60s smoke run, and core unit/sim tests.

**Inputs**
- the thesis first-slice scope
- the engine ADR
- the lane scope

**Outputs** (emit before summarizing)
- a runnable slice with tests
- `playtests/<branch>/playtest_report.json` (validates `schemas/playtest-report.schema.json`)
- a capture/replay artifact

**Borrowed behaviours** (wrapped or referenced — never vendor a generic skill body)
- `tdd` for core logic; `diagnose` for failing bot smoke; a Playwright CLI / sim harness

**Boundaries**
- Obey `AGENTS.md`, `CONTEXT.md`, and `docs/doctrine.md`.
- Manifest beats memory: read and update `.tgf/seeds/{seed-id}/manifest.json`, and record the phase transition in that run's `execution-ledger.jsonl`.
- First-slice scope only: no content sprawl, no high-fidelity/opaque art, no multiplayer backend, no accounts, no unjustified dependencies.
- A gameplay change must emit a playtest report.
- Never create a child game repo by default, never copy `.tgf`/`.omx`/ledgers/skill docs into a generated game, and never assume an unverified tool.
