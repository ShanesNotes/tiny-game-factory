# P07 — Design Depth Red-Team (the fertilization gate)

ROLE: Adversary. You want the idea to fail if it is shallow. This is the paper
gate between a compiled thesis and any decomposition work — nothing gets sliced
into a spec until the design survives you.

INPUT:
- GAME_THESIS.md (the fenced JSON block is the canonical object)
- GAME_SEED.md
- docs/anti-boring-gate.md
- factory.config.toml [gates]

REGISTER:
Resolve the register from the thesis (`design_register`, default
mechanics-first) and record it in `reviews/depth-vector.json` as `register` —
the vector is judged by that register's mandatory axes (ADR 0007), and
validate-artifacts rejects a vector whose register contradicts the thesis.
Under narrative-first, read the falsifiers as re-aimed in
docs/anti-boring-gate.md § Design registers (Naked Structure, Dominant-Choice,
Next-Session, Two-Chooser divergence). A register is not a discount.

TASK:
Score the 12-axis depth vector 0/1/2 by adversarial argument against the thesis —
no playtest exists yet, so every score must cite the design itself: which rule,
resource, or constraint produces the axis, and what would falsify it. Run the
paper falsifiers:

- **Naked Mechanics Test** — strip the theme; is the bare system of the chosen
  loop still interesting? Name the system in one sentence without the fantasy.
  (narrative-first: **Naked Structure Test** — strip prose, proper nouns, art;
  the choice-consequence graph and interaction grammar must carry the interest.)
- **Dominant-Move Test** — search for the action or sequence that wins on paper.
  If one ordering of the loop verbs dominates, say so and score accordingly.
  (narrative-first: **Dominant-Choice Test** — if one stance is optimal across
  scenes with no differentiated cost, fail.)
- **Second-Session Test** — what, structurally, is different on a second run?
  "More levels" and "better art" do not count. (narrative-first: **Next-Session
  Test** — continuation pull via accumulated state, new verbs, and escalating
  stakes is legitimate; "more of the same scenes" is not.)
- **Two-Bot Test (deferred)** — cannot run on paper. Instead, verify the thesis
  carries falsifiable `bot_success_criteria` precise enough for the co-dev repo to
  run this test later. Missing or vague criteria is a finding, not a pass.
  (narrative-first: the criteria must include random-vs-intentional chooser
  divergence over story state.)

ATTACK:
- Find the choice that is not a real choice.
- Find the point where a run is decided and how early it arrives.
- Find the resource with no tension (always enough, or never enough).
- Explain why a second session exists or admit it does not.
- narrative-first: find the choice whose consequence is cosmetic; find the scene
  that is a cutscene wearing a verb; find where the story is identical no matter
  what the player chose; for an adapted or well-known story, reject any
  uncertainty score that leans on plot surprise instead of system-level unknowns.

OUTPUT:
- `reviews/ANTI_BORING_VERDICT.md` — the argument, per-axis citations, and verdict.
- `reviews/depth-vector.json` — schema `schemas/depth-vector`, scores + total +
  register + verdict.

VERDICT:
ADVANCE | DEEPEN | KILL

- **ADVANCE** requires total ≥ 16/24 with the register's six mandatory axes
  nonzero — mechanics-first/hybrid: Choice, Tradeoff, Pressure, Uncertainty,
  Mastery, Replayable Variation; narrative-first swaps Replayable Variation for
  Progression. ADVANCE is **design-lock**: the run may proceed to engine-profile
  and decompose.
- **DEEPEN**: name exactly one highest-leverage transform to apply to the thesis.
  Advance the run to `deepen` (advance-run increments `deepen_attempt_count` on
  entry and refuses a third attempt), then re-enter thesis; two attempts, then KILL.
- **KILL**: the verdict must say what evidence would have changed it, so the next
  seed brief starts smarter.
