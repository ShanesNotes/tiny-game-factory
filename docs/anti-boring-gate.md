# Anti-Boring Gate

The gate runs **on paper, against `GAME_THESIS.md`**, at the `design-review` phase
(P07). A thesis cannot be design-locked — and nothing may be decomposed into a
spec — until it passes this gate. The passing (`ADVANCE`) verdict is
**design-lock**; fun-lock remains downstream doctrine inside the spec pack.

## Four hard falsifiers

1. **Naked Mechanics Test** *(argued analytically)*
   Strip theme, art, narrative. Is the bare system still interesting?

2. **Dominant-Move Test** *(argued analytically)*
   If one action or fixed sequence is optimal across states, fail. Default threshold: one action >70% of meaningful actions across varied states.

3. **Second-Session Test** *(argued analytically)*
   Why play again after understanding the loop once? “More levels” and “better art” do not count.

4. **Two-Bot Test** *(deferred into the spec)*
   A random bot and a heuristic/skilled bot must produce materially different outcomes. This cannot be run on paper, so it ships as `bot_success_criteria` obligations carried by the spec's slices; the co-dev repo must prove it.

## Depth vector

Score each axis 0/1/2:

- meaningful choice
- tradeoff
- pressure
- uncertainty
- progression
- mastery
- combinatorial interaction
- emergence
- replayable variation
- failure/recovery
- player expression
- expansion headroom

Minimum for design-lock: 16/24 with nonzero score in the register's six mandatory
axes (see § Design registers; mechanics-first default: Choice, Tradeoff, Pressure,
Uncertainty, Mastery, Replayable Variation).

## Design registers (ADR 0007)

The thesis declares `design_register`: `mechanics-first` (default) |
`narrative-first` | `hybrid`. The gate keeps the same twelve axes and the same
≥16/24 floor in every register — what changes is which axes are mandatory and how
the falsifiers are read. A register is not a discount: a boring story dies here
exactly like a boring loop. The depth vector records its register
(`reviews/depth-vector.json` `register`), and the mandatory sets live in
`scripts/lib/factory-contract.mjs`:

- `mechanics-first` / `hybrid` — Choice, Tradeoff, Pressure, Uncertainty,
  Mastery, Replayable Variation. (Hybrid claims mechanics are load-bearing, so it
  is held to the mechanics bar.)
- `narrative-first` — Choice, Tradeoff, Pressure, Uncertainty, Mastery,
  **Progression**. A campaign's pull is forward accumulation, not re-run
  variation; Replayable Variation still scores but is no longer load-bearing.

Narrative-first readings of the falsifiers:

1. **Naked Structure Test** (Naked Mechanics, re-aimed) — strip prose, proper
   nouns, art. Is the choice-consequence graph plus the interaction grammar still
   interesting? Theme may carry meaning, but the structure must carry
   consequence: a story whose choices do not change reachable state is a film
   pitch, not a game thesis.
2. **Dominant-Choice Test** — a narrative game's dominant move is a stance. If
   one policy ("always the pious option", "always fight") is optimal across
   scenes with no differentiated cost, fail.
3. **Next-Session Test** (Second-Session, re-aimed) — for a campaign, the
   structural pull into the next session is legitimate evidence: accumulated
   state, new verbs, escalating stakes. "More of the same scenes" does not
   count; "chapter 2 plays differently because of what you did in chapter 1"
   does. Whole-game replay scores under Replayable Variation but is not
   mandatory.
4. **Two-Chooser divergence** (the Two-Bot deferral) — a random chooser and an
   intentional chooser must reach materially different story states (endings,
   relationship flags, world state). Ships as `bot_success_criteria`
   obligations, same as ever.

Axis readings under narrative-first: **mastery** is system literacy — the player
gets better at reading and using the game's interaction grammar and symbolic
language. **Uncertainty** must be system-level: for an adapted or well-known
story, plot surprise is unavailable, so cite hidden state, dramatic-irony
mechanics, or outcome spread — never "the player won't see it coming".

## Shallow-loop transform kit

If the loop resembles sorting/matching/collection, apply at most two transforms, then re-test:

- conflicting criteria
- resource scarcity
- time/space pressure
- irreversible commitment
- risk/reward uncertainty
- hidden information
- changing rule modifiers
- enemy/opposing system
- player-build expression
- recovery paths

Narrative-first transforms (same rules — name exactly one):

- consequence-bearing state (a choice must write state a later scene reads)
- persistent cost (choices price something that stays spent)
- hidden-state literacy (state the player learns to read; mastery grows)
- stance differentiation (make competing choice policies genuinely viable)
- irreversible commitment at scene scale
- recontextualization (later scenes re-read earlier state, not just reference it)

A `DEEPEN` verdict re-enters the `thesis` phase with exactly one transform.
After two failed deepen attempts: throw away the loop and distill learnings into a new seed brief.
