# ADR 0007 — Register-aware design-lock (narrative-first seeds)

- Status: **Accepted.** Owner-directed (2026-07-02): the factory must serve a
  story/adventure-capable seed on its own terms; the gate was tuned on
  mechanics-first tiny games and bent narrative seeds toward roguelites.
- Date: 2026-07-02

## Context

The anti-boring gate (P07) and its mechanical checker were calibrated on
mechanics-first seeds (dolphin-ocean-explorer, vault-cracker): the Naked
Mechanics Test strips theme and narrative, the Second-Session Test treats the
game as an endlessly re-run loop, and design-lock hard-requires a nonzero
**Replayable Variation** axis. A narrative-first seed — a campaign adventure
whose payload is choice-with-consequence inside a story — can only clear that
bar by growing procedural replay structure it does not want, i.e. by being bent
into a roguelite. Downstream, the shipped `no_content_before_fun_lock` guard
blocks `story/`, `narrative/`, and `quests/` paths before fun-lock, but a
narrative game's tracer slice *is* story content: the loop cannot be proven
without some of it.

The gate's purpose — kill shallow premises with falsifiable argument — is
register-independent. What is register-dependent is *where depth lives*.

## Decision

1. **The thesis declares a design register.** `GAME_THESIS.md` gains an optional
   `design_register` field: `mechanics-first` (default when absent) |
   `narrative-first` | `hybrid`. P01 must declare it honestly; it is a routing
   fact, not a discount.
2. **Same axes, same floor, register-specific mandatory set.** The depth vector
   keeps all twelve axes and the ≥16/24 design-lock floor in every register.
   The mandatory-nonzero set is resolved per register in
   `scripts/lib/factory-contract.mjs` (`REQUIRED_NONZERO_AXES_BY_REGISTER`):
   - `mechanics-first` / `hybrid`: Choice, Tradeoff, Pressure, Uncertainty,
     Mastery, Replayable Variation (unchanged; hybrid claims mechanics are
     load-bearing, so it is held to the mechanics bar).
   - `narrative-first`: Choice, Tradeoff, Pressure, Uncertainty, Mastery,
     **Progression** — a campaign's pull is forward accumulation, not re-run
     variation. Replayable Variation still scores; it is no longer load-bearing.
3. **The depth vector records its register.** `reviews/depth-vector.json` gains
   an optional `register` field (default `mechanics-first`). The consistency
   checker (`scripts/lib/anti-boring-gate.mjs`) resolves the mandatory set from
   it, and `validate-artifacts --check run` rejects a gate-passing vector whose
   register contradicts the thesis's `design_register` (policy in checkers, not
   schemas — ADR 0005).
4. **Register-aware falsifier readings** (doctrine in
   `docs/anti-boring-gate.md`, executed by P07): under `narrative-first`, Naked
   Mechanics is read as the **Naked Structure Test** (strip prose/names/art; the
   choice-consequence graph must carry the interest), Dominant-Move as the
   **Dominant-Choice Test** (no stance may be optimal across scenes without
   differentiated cost), Second-Session as the **Next-Session Test**
   (continuation pull via accumulated state is legitimate; "more of the same
   scenes" is not), and the deferred Two-Bot Test as **random-vs-intentional
   chooser divergence** over story state.
5. **Narrative content allowance in the shipped content guard.** The pack
   exporter stamps `guards/guard-config.json` with the thesis's register.
   `no_content_before_fun_lock` keeps its current behavior for
   `mechanics-first`/`hybrid`; for `narrative-first` it allows pre-fun-lock
   edits under content paths **only when playtest evidence exists** in
   `playtests/` — content trails play, never leads it. Fun-lock still lifts the
   guard entirely. All other guards are unchanged.

## Alternatives rejected

- **A separate narrative depth vector / schema.** Two vocabularies to keep in
  sync for one judgment; the twelve axes already read cleanly in both registers.
- **Prompt-only guidance with no checker awareness.** The mechanical checker
  would still hard-fail a narrative ADVANCE with Replayable Variation at 0, so
  the prompt and the checker would disagree — the drift seam the contract
  module exists to prevent.
- **Lowering the ≥16/24 floor for narrative seeds.** The floor is the
  anti-boring doctrine; registers relocate where depth must show up, they do
  not reduce how much of it is required.

## Consequences

- A narrative seed can design-lock without procedural replay structure, but a
  boring story dies at the same gate: zero-consequence choices fail the
  mandatory Choice/Tradeoff axes and the Naked Structure Test by argument.
- The register travels with the artifacts (thesis → depth vector → pack guard
  config), so downstream doctrine stays coherent without referencing factory
  state.
- Reversal trigger: if register-specific mandatory sets prove gameable (seeds
  register-shopping to dodge a weak axis), collapse the sets back to a single
  mandatory list and supersede this ADR.
