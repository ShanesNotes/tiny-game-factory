---
name: tgf-prototype-dispatch
description: Use to plan and dispatch 2-3 isolated prototype lanes when core-loop uncertainty is high or two hypotheses score close.
---

# tgf-prototype-dispatch

Use when: uncertainty is high or two core-loop hypotheses score close, so isolated prototype lanes are warranted.

Read first: `AGENTS.md`, `CONTEXT.md`, `docs/doctrine.md`, `.factory/prompts/P03_BRANCH_BAKEOFF_DISPATCH.md`, and the seed manifest `.tgf/seeds/{seed-id}/manifest.json` when present.

This skill is a **router**: read `.factory/prompts/P03_BRANCH_BAKEOFF_DISPATCH.md` and the manifest, then route work by the manifest's `current_phase` (dispatching isolated lanes/subagents only when justified). It does not implement gameplay itself.

## Role
Lane planner / worktree orchestrator. Plans 2-3 isolated first-slice lanes with identical seed/slice/budget/gates and a parent integrator.

## Inputs
- `GAME_THESIS.md`
- the engine ADR
- an uncertainty assessment

## Outputs (emit before summarizing)
- a lane plan and per-lane scope/manifests under the run state

## Borrowed behaviours (wrapped or referenced — never vendor a generic skill body)
- the upstream `prototype` pattern, adapted to require bot/playtest evidence and lane isolation

## Boundaries
- Obey `AGENTS.md`, `CONTEXT.md`, and `docs/doctrine.md`.
- Manifest beats memory: read and update `.tgf/seeds/{seed-id}/manifest.json`, and record the phase transition in that run's `execution-ledger.jsonl`.
- Dispatch multiple lanes only when uncertainty warrants it and touch sets are disjoint.
- No cross-branch reads during prototype production; the parent integrator owns selection.
- Never create a child game repo by default, never copy `.tgf`/`.omx`/ledgers/skill docs into a generated game, and never assume an unverified tool.
