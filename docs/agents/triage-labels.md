# Triage labels — canonical vocabulary

The canonical label set for the factory's **local** tracker (issues live as
markdown under `.tgf/seeds/{seed-id}/` or the workspace `.scratch/`, never a remote
host by default — ADR 0004). The borrowed `triage` and `to-issues` skills read this
file as their label authority.

**HARD RULE: these five labels are the entire vocabulary. Do not invent, alias, or
extend it.** A need that no label covers is a signal to sharpen the issue, not to
add a label.

## The label set

| Label | One-line meaning |
|---|---|
| `needs-triage` | Untriaged. Default on creation; no human or agent owns it yet. |
| `needs-info` | Blocked on missing evidence/answer; cannot proceed until supplied. |
| `ready-for-agent` | Scoped enough for an AFK agent to grab and execute unattended. |
| `ready-for-human` | Needs human judgement (taste, direction, a verdict) before it moves. |
| `wontfix` | Acknowledged and deliberately declined; closed without action. |

## Factory readiness notes (phase model — see CONTEXT.md)

Readiness is **evidence-gated**, not vibe-gated. "Completion is evidence, not prose."

- **A slice issue is `ready-for-agent` only when its thesis and engine ADR exist** —
  i.e. `GAME_THESIS.md` is written and `decisions/0001-engine-profile.md` is
  accepted. No first-slice work is agent-ready before the engine is earned (ADR
  0002: no default engine before the thesis). Absent either, label `needs-info`.
- **A gameplay-completion issue is `ready-for-human` only with a playtest report
  plus an anti-boring verdict** — a `playtests/` report and a
  `reviews/<branch>/ANTI_BORING_VERDICT.md` (depth verdict `ADVANCE`/`DEEPEN`/`KILL`,
  vector ≥16/24 with nonzero Choice/Tradeoff/Pressure/Uncertainty/Mastery/Replayable).
  Without both artifacts it stays `needs-info`; the human is not asked to judge fun
  on prose.
- **Direction/taste questions are `ready-for-human`** — but at most one before the
  first slice, and never engine/art/lane questions before `GAME_THESIS.md`.
- **A toolchain/setup issue is `ready-for-agent`** once it names a real probe to run
  (`tgf-verify-toolchain`); a verifier with no probe is `needs-info`.
- **A `DEEPEN` issue** carries exactly one named transform; if the transform is
  unnamed it is `needs-info`, not `ready-for-agent`.
- **`KILL` / `DISCARD_ALL` verdicts** map to `wontfix` (declined by evidence).

## State flow

```
created ──▶ needs-triage ──▶ needs-info ──▶ ready-for-agent ─┐
                  │              ▲   │                        ├─▶ done (evidence: validator/playtest/verdict)
                  │              │   └──▶ ready-for-human ─────┘
                  └──────────────┴───────────────────────────────▶ wontfix
```

Every issue enters as `needs-triage`. Triage routes it to exactly one of the other
four. `needs-info` and the two `ready-*` states cycle as evidence arrives or lapses.
Only `wontfix` and evidence-backed `done` are terminal.
