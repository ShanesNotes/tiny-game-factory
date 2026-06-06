# ADR 0002 — Evidence-first prototype search

- Status: **Accepted** (doctrine; grill decisions Q4/D004, Q10/D010, Q11/D011). The
  anti-boring gate thresholds and the two-attempt deepen budget are inherited
  doctrine (`docs/anti-boring-gate.md`, init pack v0.3), not a grill-resolved decision.
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
- A branch is not alive until a bot has played it ≥60s; ≥60s play makes a branch
  eligible for review but passes no gate by itself (nightly/AFK runs require ≥300s,
  per `afk_heartbeat_required`). Gameplay changes must emit a `playtest_report.json`.
- The depth red-team (P07) emits `ADVANCE | DEEPEN | KILL`. **Fun-lock** — the point
  a slice may expand into content/art/polish/multiplayer — requires passing the
  **anti-boring gate**: the four falsifiers plus a depth vector total ≥16/24 with
  nonzero Choice, Tradeoff, Pressure, Uncertainty, Mastery, and Replayable Variation.
- `deepen` allows one transform per attempt; after two failures, kill and re-seed.
- No default engine before the thesis (the engine is chosen on evidence, ADR-recorded,
  and reversible).
- Completion is verifier evidence, not agent prose.

## Consequences

- Hooks and validators enforce the gates mechanically (`scope_brake`,
  `playtest_report_required`, the `no-default-engine` check). The depth-vector schema
  only checks the twelve axes are present and in range; the ≥16 total and nonzero-axes
  thresholds are applied by `P07_DEPTH_RED_TEAM`, not the schema.
- Honest failure (all branches killed with evidence + a better next seed) is an
  acceptable outcome; silent drift is not.

## Alternatives considered

- *Polish-first / preserve-the-build.* Rejected: it is exactly the failure mode the
  factory exists to prevent.
- *Unbounded deepen / pivot-in-place.* Rejected: it removes the forcing function
  against sunk cost. The two-attempt deepen cap is the deliberate ceiling before a
  kill-and-reseed.
