# ADR 0003 — Factory / game separation

- Status: **Accepted** (grill decisions Q2, Q3)
- Date: 2026-06-06

## Context

Reusable factory state (prompts, ledgers, hooks, skill docs, factory vocabulary)
must not contaminate a shipped game, and a disposable game prototype must not be
able to corrupt the factory. The two have opposite lifecycles.

## Decision

Three strata with hard boundaries:

- **Factory repo** — `/home/ark/tiny-game-factory/` (durable).
- **Per-seed run state** — `.tgf/seeds/{seed-id}/` inside the factory (durable
  temporal truth: manifest, ledger, thesis, decisions, playtests, reviews, handoffs).
- **Child game repo** — `/home/ark/tgf-games/{seed-id}/` by default (disposable). An
  opt-in `runs/{seed-id}/game/` bundled mode exists but is not the default.

The child game root is a **declared default, not a created path**: nothing creates
`/home/ark/tgf-games/` until an explicit child-game phase. `scripts/init-game-run.mjs`
creates only `.tgf/seeds/{seed-id}/`.

**No leakage (generated-game surface):** generated child-game templates and example
seeds must contain no `.tgf/`/`.omx/`/`.sandcastle/` paths,
GStack/Pocock/OMX/Sandcastle markers, source-product terms, or absolute
`/home/ark/...` paths; ledgers, handoffs, and skill docs are likewise prohibited by
doctrine. The `generated-leakage` validator enforces the path/marker tokens against
`templates/game-repo/**` and `examples/seeds/**`. (Pocock here = the borrowed-skill
attribution, which must not appear in shipped game docs.)

## Consequences

- The run initializer is non-destructive and child-repo-free; child repo creation is
  a separate, explicitly-requested phase (`init-game-repo` is deferred, not shipped
  as an active path).
- The only absolute `/home/ark/...` value allowed in a run manifest is
  `default_child_game_root`, and it must equal `/home/ark/tgf-games/{seed-id}`.
- The two absolute-path rules apply to **different surfaces**: the
  `default_child_game_root` allowance is run-manifest metadata only and must never be
  normalized into a generated template, where every `/home/ark/...` path is forbidden.

## Alternatives considered

- *Everything under the factory by default.* Rejected as default (kept as opt-in):
  bundling makes prototype churn destabilize the factory and risks leakage. The
  external default is a sibling `/home/ark/tgf-games/` — outside the factory's git,
  disposable, and bulk-deletable — so killed prototypes leave no trace in the factory.
