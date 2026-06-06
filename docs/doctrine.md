# Doctrine

The non-negotiable rules of the Tiny Game Factory. Prompts and skills cite this
file. Changing a rule here requires an ADR.

## Five principles

1. **Search over codegen.** The job is to find a playable loop, not to produce code.
2. **Fun over polish.** A proven shallow loop is still a failure.
3. **Evidence over sunk cost.** Bot/human playtests and falsifiers decide, not effort already spent.
4. **Code-native over opaque.** Diffable, reviewable artifacts beat opaque assets and editor state.
5. **Played by a bot or human over merely compiled.** A branch is not alive until a bot has played it.

## Non-negotiables

- No implementation before `GAME_THESIS.md` exists.
- No architecture or engine questions to the user before the first slice; at most
  one direction-changing taste question (with a recommended default).
- Existing projects are evidence, not destiny. The current engine is an option, not
  a constraint.
- No content expansion, high-fidelity or opaque art, multiplayer backend (before a
  solo- or hot-seat fun-lock), accounts, analytics, or release work before fun-lock
  and the relevant gate.
- Engine migration requires a new per-seed engine decision file
  (`decisions/NNNN-engine-*.md`), enforced by the `engine_migration_requires_adr`
  hook. This is a seed-scoped, ADR-style record — distinct from the factory-level
  ADRs in `docs/adr/`.
- Gameplay changes require playtest evidence (`playtests/**/playtest_report.json`).
- Completion is verifier evidence, not agent prose.
- Factory state (`.tgf/`, ledgers, hooks, skill docs, factory vocabulary) must never
  leak into a generated child game repo.

## Phase model

```
intake → toolchain → thesis → engine-profile → prototype-dispatch → first-slice → depth-review → bakeoff → fun-lock
  depth-review --DEEPEN--> deepen --(one transform)--> first-slice   (re-test the slice)
  deepen failed ×2 --> killed
post fun-lock: content → art → polish → qa → release-candidate → handoff
terminal: blocked · failed · killed · complete
```

A run is initialized at `toolchain`; `intake` is the entry phase only when a raw/
vague seed or an inherited repo needs office-hours grilling before the thesis. Each
phase is gated by an artifact, not a claim. On a `DEEPEN` verdict the slice re-enters
`first-slice` with **exactly one** transform applied, then re-tests at
`depth-review`; after two failed deepen attempts, kill the loop and distill learnings
into a new seed brief. Terminal states require an evidence-backed ledger row before
any resume.

## The anti-boring gate (`docs/anti-boring-gate.md`)

Four hard falsifiers — Naked Mechanics, Two-Bot, Dominant-Move (>70% action share),
Second-Session — plus a 12-axis depth vector. **Fun-lock requires total ≥ 16/24
with nonzero Choice, Tradeoff, Pressure, Uncertainty, Mastery, and Replayable
Variation.** Verdicts: `ADVANCE` | `DEEPEN` (one transform) | `KILL`.

## Engine doctrine (`docs/engine-matrix.md`)

No default engine before the thesis. Score candidates on headless testability,
iteration speed, fantasy fit, core-loop fit, deterministic sim, migration cost,
visual-wow-no-game risk, editor opacity, and toolchain-verified status. Choose the
cheapest reversible surface that proves the loop with bot evidence.

## Tool doctrine (`docs/toolchain-verification-ledger.md`)

A capability is never assumed from memory. Tools are `ACCEPT` / `PROBE` /
`OFF_BY_DEFAULT` / `ACCEPT_AFTER_PIN`, promoted only by a local probe or
current-doc harvest. Grok Build and mutation-capable MCP servers stay optional.

## Asset doctrine

Programmer/code-native art only before fun-lock. Opaque or high-fidelity assets
require fun-lock + art-direction lock + a provenance recipe
(`schemas/asset-provenance`) + asset review.

## Human taste gates

- **G1** — is the primitive loop worth replaying?
- **G2** — art direction (only after fun-lock).
- **G3** — release-candidate signoff.

Everything else the agent decides from evidence; it does not ask.
