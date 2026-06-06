# ADR 0002 — Evidence-first prototype search

- Status: **Accepted** (doctrine; grill decisions Q4, Q10, Q11)
- Date: 2026-06-06

## Context

Local coding agents scaffold games quickly but drift toward architecture polish,
visual-wow, and sunk-cost continuation before proving the game is worth playing.
The factory's value is resisting that drift.

## Decision

The factory optimizes for **finding a playable loop with evidence**, not for code
or screenshots:

- No implementation before `GAME_THESIS.md`; the thesis frames hypotheses, it does
  not ask the user architecture questions.
- A branch is not alive until a bot has played it ≥60s; gameplay changes must emit a
  `playtest_report.json`.
- Advancement past first slice requires passing the **anti-boring gate** (four
  falsifiers + depth vector ≥16/24 with the six required nonzero axes).
- `deepen` allows one transform per attempt; after two failures, kill and re-seed.
- No default engine before the thesis (the engine is chosen on evidence, ADR-recorded,
  and reversible).
- Completion is verifier evidence, not agent prose.

## Consequences

- Validators, hooks, and schemas enforce these gates mechanically (`scope_brake`,
  `playtest_report_required`, `no-default-engine`, depth-vector schema).
- Honest failure (all branches killed with evidence + a better next seed) is an
  acceptable outcome; silent drift is not.

## Alternatives considered

- *Polish-first / preserve-the-build.* Rejected: it is exactly the failure mode the
  factory exists to prevent.
