# ADR 0001 — `/home/ark/tiny-game-factory` is a meta-factory root

- Status: **Accepted** (grill decision Q1, user-accepted)
- Date: 2026-06-06

## Context

The repository could be either the first generated game or a reusable factory that
generates many games. Tiny App Factory demonstrated that mixing orchestration
artifacts with a shipped product pollutes both: the product carries developer-only
state, and the reusable process memory is trapped inside one product.

## Decision

`/home/ark/tiny-game-factory` is a **meta-factory repository**, not the first
generated game. It owns reusable doctrine, prompts, schemas, hooks, adapters,
validators, and run ledgers. Per-seed work lives in `.tgf/seeds/{seed-id}/`;
generated games live outside the factory (see ADR 0003).

## Consequences

- The factory preserves durable process memory; generated games stay disposable.
- The factory must never become a hidden dependency copied wholesale into a game.
- Initialization creates docs/schemas/prompts/hooks/validators and a non-destructive
  run initializer only — no game, no engine, no gameplay code.

## Alternatives considered

- *Repo is the first game.* Rejected: couples reusable process to one disposable
  prototype and re-creates the TAF pollution problem.
