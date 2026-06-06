# ADR 0004 — Factory layout and skill packaging

- Status: **Accepted** (reconciliation; decided by the 2026-06-06 implementation
  handoff and the owned-skills package plan)
- Date: 2026-06-06

## Context

Two eras of planning disagreed on where prompts and skills live:

- The earlier **clean-init spec §4** put prompts at top-level `prompts/` and listed
  six skills at top-level `skills/`, with eight hyphenated schema filenames.
- The later **orchestration-mapping run** and the **implementation handoff** (the
  documents this build was told to execute) specify `.factory/prompts/`,
  `.codex/skills/` with **twelve** wrappers, a `docs/agents/` context set for
  borrowed skills, and normalization of `P07` to `P07_DEPTH_RED_TEAM.md`. The v0.3
  init pack itself ships prompts under `.factory/prompts/`.

A single repo cannot have both layouts without confusion, so the conflict had to be
resolved before authoring.

## Decision

Adopt the **later, authoritative layout**:

- Prompts live under `.factory/prompts/` (`P00`–`P17`), normalized
  (`P07_DEPTH_RED_TEAM.md`), with internal references pointing at the canonical
  lowercase-hyphenated `docs/*.md` and `schemas/*.schema.json`.
- The twelve project-local TGF skill wrappers live under `.codex/skills/`:
  `tgf-harness`, `tgf-office-hours-grill`, `tgf-verify-toolchain`,
  `tgf-seed-compile`, `tgf-engine-profile`, `tgf-prototype-dispatch`,
  `tgf-first-slice`, `tgf-depth-redteam`, `tgf-branch-bakeoff`,
  `tgf-existing-project-rescue`, `tgf-repo-scout`, `tgf-handoff`.
- `docs/agents/{domain,issue-tracker,triage-labels}.md` ground the borrowed Matt
  Pocock skills; those skills are **wrapped/referenced, never vendored**, and
  generic issue/PRD/triage skills route through local artifacts (no remote publish
  by default).
- `adapters/{codex,claude-code,grok-build,mcp}/` are thin per-host mirrors; the
  `.codex/skills/` definitions are the source of truth.
- Everything else follows clean-init spec §4: eight hyphenated `schemas/`, seven
  `hooks/`, five `scripts/`, `templates/run/` + `templates/game-repo/`,
  `examples/`, `docs/` with `adr/`.

Each wrapper references exactly one existing prompt/contract or declares itself a
router; `validate-artifacts.mjs --check skill-refs` enforces this.

## Consequences

- The clean-init spec §4 flat `prompts/`/`skills/` layout (6 skills) is
  **superseded** by this ADR. The test spec stays satisfied because its checks are
  path-agnostic ("prompts P00–P17 exist", "schemas parse") and the validator asserts
  the actual tree.
- Post-fun-lock prompts (`P05`, `P06`, `P09`–`P12`, `P14`) ship as contracts; their
  wrappers are deferred until gameplay proof exists.

## Provenance / caveat

This ADR records a decision made in the implementation handoff, not a novel
architectural choice invented here. It is flagged in the initialization report so it
can be revisited; if the flat layout is preferred, this ADR is the single place to
reverse.
