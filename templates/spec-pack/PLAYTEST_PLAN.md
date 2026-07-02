# PLAYTEST_PLAN.md

## Bot sessions

- random bot: 60s minimum
- heuristic/skilled bot: 60s minimum
- long session: 300s after initial stability

## Required reports

Each run emits `playtests/<branch>/playtest_report.json`.

## Falsifiers

- Naked Mechanics Test
- Two-Bot Test
- Dominant-Move Test
- Second-Session Test

Narrative-first packs (see `guards/guard-config.json`) read these as: Naked
Structure (the choice-consequence graph carries the interest), random-vs-
intentional chooser divergence over story state, Dominant-Choice (no stance
wins everywhere without cost), and Next-Session (continuation pull via
accumulated state counts; more-of-the-same scenes do not).

## Metrics

- crashes
- stuck states
- terminal loop completion
- action distribution
- score/win/spread between bots
- unique states reached
- replay variation
- frame time/perf budget
