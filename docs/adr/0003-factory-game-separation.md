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

**No leakage:** generated child-game templates must contain no `.tgf/`, `.omx/`,
`.sandcastle/`, GStack/Pocock/OMX/Sandcastle markers, ledgers, handoffs, skill docs,
source-product terms, or absolute `/home/ark/...` paths. The
`generated-leakage` validator enforces this against `templates/game-repo/**`.

## Consequences

- The run initializer is non-destructive and child-repo-free; child repo creation is
  a separate, explicitly-requested phase (`init-game-repo` is deferred, not shipped
  as an active path).
- The only absolute `/home/ark/...` value allowed in a run manifest is
  `default_child_game_root`, and it must equal `/home/ark/tgf-games/{seed-id}`.

## Alternatives considered

- *Everything under the factory by default.* Rejected as default (kept as opt-in):
  bundling makes prototype churn destabilize the factory and risks leakage.
