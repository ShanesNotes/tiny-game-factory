# ADR 0008 — World-first register and seam slices

- Status: **Accepted.** Owner-directed (2026-07-02): the factory must serve a
  seed whose payload is a *place* — an immersive world whose pull is discovery
  and growth-gated access — and must let a spec carry growth systems as honest
  stubs so a small playable seed can be iterated toward a larger game without
  rewrites.
- Date: 2026-07-02
- Extends: ADR 0007 (register-aware design-lock), ADR 0006 (spec pack terminal).

## Context

ADR 0007 made the gate register-aware, but both registers locate depth in either
the *loop* (mechanics-first/hybrid) or the *choice-consequence graph*
(narrative-first). A world-immersion seed — named places with withheld histories,
capability-gated reentry, descent-and-return excursions — can only pass by
contorting its depth into loop or story terms: the same bend ADR 0007 fixed, one
level deeper. None of the twelve axes is missing (uncertainty, progression, and
expansion headroom can carry discovery), but no register makes them load-bearing
or reads the falsifiers spatially.

Separately, the spec schema knew only `slice | feature | chore`. A spec that
wants an RPG-shaped data model under a small playable seed had no honest way to
say "this system is schema'd, persisted, and stubbed — deliberately not built" —
it either smuggled architecture into a fake slice (violating "vertical, not
horizontal") or dumped the system into `out_of_scope` and guaranteed a rewrite.

Third: owners increasingly hand seeds a north-star brief (qualities the game
must serve). There was no documented input seam for it, so briefs either leaked
into artifacts or got lost.

## Decision

1. **`world-first` register.** `DESIGN_REGISTERS` gains `world-first`; its
   mandatory-nonzero set is Choice, Tradeoff, Pressure, Uncertainty,
   **Progression**, **Expansion Headroom** (`REQUIRED_NONZERO_AXES_BY_REGISTER`).
   Mastery and Replayable Variation still score but are not load-bearing — the
   world's pull is discovery and growth, not execution skill or re-runs. Same
   twelve axes, same ≥16/24 floor (ADR 0007's invariants hold).
2. **World-first falsifier readings** (doctrine in `docs/anti-boring-gate.md`,
   executed by P07): Naked Mechanics → **Naked Map** (the spatial graph must
   carry interest), Dominant-Move → **Beeline** (ignoring the world must have
   differentiated cost), Second-Session → **Return** (new capability must re-key
   known ground), Two-Bot → **Two-Walker divergence** over the discovered-content
   set. These falsifiers guard the ground Mastery/Variation held in the
   mandatory set.
3. **`seam` slice type.** `spec-decomposition` and the issue contract gain type
   `seam`: a growth system's data model + persistence surface, schema'd but not
   built. Acceptance must prove (a) the data shape round-trips through save/load
   and (b) at least one live slice reads or writes it. A seam never adds UI,
   content, or systems. P18 pairs every later-intended `out_of_scope` system
   with a seam or an explicit "no seam — will rewrite" note. Guardrail: a
   handful at most — many seams is architecture fantasy.
4. **BRIEF.md input seam.** If `BRIEF.md` exists in the seed run dir, P01 reads
   it as owner intent evidence (qualities the thesis must serve — never genre,
   register, or mechanics dictation) and P07 treats its claims as claims to
   falsify. Brief provenance (e.g. comparable titles) never enters artifacts.
   No script changes: the file is optional, and validators ignore unknown files
   in the run dir.
5. **Content guard unchanged.** `no_content_before_fun_lock` keeps mechanics-first
   behavior for `world-first`: a world tracer needs geometry and gating, which
   live in scene/level paths, not the guarded story/narrative/quest paths.

## Alternatives rejected

- **A thirteenth "discovery" axis.** Breaks ADR 0007's same-twelve-axes/same-floor
  invariant across all history and registers; the existing axes already carry
  discovery once a register makes them load-bearing and reads them spatially.
- **Stretching `narrative-first` to cover worlds.** Its mandatory Mastery and its
  falsifiers (choice-consequence graph) measure the wrong substance; a world
  seed would pass or fail for reasons unrelated to its actual depth.
- **Seams as `chore` slices.** A chore has no falsifiable play evidence; seams
  need the round-trip + live-reader acceptance to stay honest stubs rather than
  architecture wishes.
- **A `--brief` CLI flag.** Pure convention suffices; adding flag plumbing to
  init-game-run for an optional file the prompts read directly is machinery
  without benefit.

## Consequences

- A place-payload seed can design-lock on its own terms, and a boring world
  dies at the same gate: scenery-worlds fail Beeline, corridor-maps fail Naked
  Map, mood-only awe fails the uncertainty reading.
- Specs can honestly carry "foundational seed, RPG-shaped data model": the
  tracer slice plays, seams pin the growth surfaces, `out_of_scope` stays true.
- Reversal triggers: if seeds register-shop into world-first to dodge Mastery,
  collapse per ADR 0007's trigger; if seam slices bloat past a handful per spec
  or ship without live readers, drop the type and return to out_of_scope-only.
