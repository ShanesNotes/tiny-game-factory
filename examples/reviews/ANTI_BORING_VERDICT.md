# ANTI_BORING_VERDICT.md — EXAMPLE

> EXAMPLE artifact for the design-review gate (P07). Copy the shape, not the
> content: every claim below is placeholder text for the worked
> `tiny-asteroid-gardening` fixtures and must be re-derived from the real thesis.
> Lives at `reviews/ANTI_BORING_VERDICT.md` in the seed run dir, alongside
> `reviews/depth-vector.json`.

Verdict: ADVANCE

Total: 17/24 (register: mechanics-first; mandatory six axes nonzero: Choice,
Tradeoff, Pressure, Uncertainty, Mastery, Replayable Variation).

## Paper falsifiers

- Naked Mechanics Test: PASS — a rotating scarcity puzzle (light band vs water
  budget vs drift) stays interesting with the garden theme stripped.
- Dominant-Move Test: PASS — no single planting order exceeds the dominance
  threshold on paper; rotation timing and watering order trade off.
- Second-Session Test: PASS — procedural drift and sunlight angles change the
  scarcity puzzle each run (not "more levels").
- Two-Bot Test: DEFERRED to the spec — thesis `bot_success_criteria` are
  falsifiable enough for the co-dev repo (random vs skilled bot spread).

## Depth vector citations

Per-axis scores cite real field paths into the thesis canonical JSON (EXAMPLE —
see `examples/fixtures/minimal-depth-vector.json`; e.g. `pressure: 2` cites
`depth_mechanisms[1]`, `mastery: 2` cites `bot_success_criteria[2]`). Review
provenance recorded as `independent` (separate context from the thesis author).

## Distinctness

Distinctness disposition: nearest prior seed none — the portfolio digest lists
zero prior theses, so there is no prior design to falsify against; the
distinct mechanic on record is sunlight-sweep timing pressure on a shared
water budget.

Reference falsifier: SKIPPED (reference canon empty)
