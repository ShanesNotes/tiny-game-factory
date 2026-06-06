# Game Repo

This is a generated child game repo produced by the Tiny Game Factory workflow.
It holds one game: its seed, its thesis, its slices, and the evidence that the
game is worth playing.

## Agent boot sequence

If you are an agent picking up this repo, do this in order:

1. Read `AGENTS.md` — the north star, non-negotiables, and required gates.
2. Read `GAME_SEED.md` — the premise this game grows from.
3. Run `.factory/prompts/P17` — scout the repo and current state.
4. Run `.factory/prompts/P01` — set or confirm the game thesis.

## Doctrine

search > codegen, fun > polish, evidence > sunk cost.

## Where evidence lives

- `playtests/` — bot and scripted playthrough reports.
- `reviews/` — depth, QA, and anti-boring verdicts.
- `decisions/` — recorded choices and their rationale.

## The rule

No code before `GAME_THESIS.md`. A game is an argument that it is fun, and the
thesis is that argument. Write it first, then build the smallest slice that
tests it, then let the evidence say whether to continue.
