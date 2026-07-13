# ADR 0012 — Design lanes and stop lines

- Status: **Accepted.** Owner-directed (Shane, 2026-07-12).
- Date: 2026-07-12
- Extends: ADR 0011 (portfolio at the front door)
- Evidence: studio Daily/vault entry “Orchestrate — design grill-refresh” and
  the owner grill that confirmed this slice

## Context

ADR 0011 made intake mandatory, but it did not distinguish a live design
session from an unattended run. Those are different attention contracts. A
live owner wants the agent to notice gaps, propose strong fills, and develop the
seed collaboratively. An AFK owner wants the same depth of work without being
stopped for clarification. Treating unattended work as a fast lane would revive
the unopposed, template-shaped thesis failure ADR 0011 was created to prevent.

The term **design lane** here does not restore retired parallel prototype lanes
or bakeoffs. Orchestration remains solo; the lane controls owner attention and
the human stop line.

## Decision

1. **Two first-class design lanes.** New manifests carry
   `design_lane = {mode, stop_line, origination}`. `mode` is `grill | yolo`;
   `stop_line` is `pack | design-lock`; `origination` is `user | auto`.
   Initializer defaults are `{mode:"grill", stop_line:"pack",
   origination:"user"}`. Lane-less manifests remain valid and retain their
   prior behavior. `auto` is accepted as manifest provenance now, but automatic
   seed generation is a later slice.
2. **Collaborative authorship is the default.** `grill` makes office hours a
   co-authoring session: the agent detects gaps, proposes concrete fills, and
   extrapolates game-quality principles with Shane while still producing all
   ten digest-grounded intake fields. It is not a passive questionnaire.
3. **Yolo is an attention mode, not a speed mode.** `yolo` asks zero questions
   and fills the same intake surface silently from evidence. Uncertainty becomes
   named prototype hypotheses. Every agent gate runs at full strength in both
   lanes: the same portfolio grounding, paper falsifiers, depth floor, feel
   findings, engine evidence, decomposition checks, leakage scan, and verifier.
4. **Recorded questions protect AFK phases.** Live grill conversation is exempt
   from `manifest.questions_asked`; it is the co-authoring session itself, not
   an interruption budget. Before decomposition, lane-aware yolo manifests
   permit zero recorded questions, while grill and lane-less legacy manifests
   retain the existing maximum of one recorded direction-changing question.
5. **Stop lines are a yolo toggle.** `--stop` is legal only with
   `--mode yolo`. `pack` runs through handoff export and parks pre-forge.
   `design-lock` parks after P07 `ADVANCE`, at `engine-profile`, with G1 carried
   by `reviews/G1_BRIEF.md`; crossing into decomposition requires a prior
   engine-profile ledger row authored by Shane with
   `event:"stop-line-released"` and `status:"passed"`. This is a hard checker
   gate, not prompt advice.
6. **G1 brief is lane-independent.** Both grill and yolo reach the same G1
   design-taste surface at design-lock and use the same canonical
   `reviews/G1_BRIEF.md` path. This slice records and routes that seam; brief
   generation is implemented later.
7. **The studio owns the front door.** The user-facing root verb is
   `studio seed`. It supplies the explicit user lane choice to this harness;
   its implementation remains studio-side and is outside this repository.

## Alternatives rejected

- **Yolo as a reduced-gate fast path.** Rejected: owner absence is not evidence
  that a shallow design should advance.
- **Infer lane from whether a user is currently responding.** Not durable;
  resumption reads the manifest, never chat state.
- **Allow stop lines in grill mode.** A live collaborative session already has
  Shane present at G1; the explicit parking toggle exists for unattended work.
- **Count live grill prompts in `questions_asked`.** That would turn co-authorship
  back into a one-question intake form and conflate conversation with AFK
  interruption.
- **Generate automatic seeds or G1 briefs in this slice.** Both seams are named
  and schema-compatible, but their producers have separate owners.

## Consequences

- New runs are explicit about attention mode and the point where unattended
  authority ends; legacy runs validate without migration.
- P00 and the office-hours skill must route from the manifest and preserve the
  same ten-field intake-to-toolchain contract in both lanes.
- A design-lock stop cannot be laundered by an agent-authored or retroactive
  ledger row; the checker requires Shane's release before the first downstream
  phase row.
- Reversal triggers: if live grill sessions produce less falsifiable intake than
  silent evidence synthesis, narrow the collaborative procedure; if zero-question
  yolo routinely encodes the wrong premise, park those runs at design-lock by
  default rather than weakening any gate.
