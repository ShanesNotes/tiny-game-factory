# Grok Build adapter

Status: **PROBE**. Optional **third competitor lane** alongside the Claude Code
and Codex lanes — account-tier gated and not provisioned by default.

**The factory must NOT depend on this lane.** Every core loop (scaffold,
build, gameplay falsification, selection) has to run with Grok Build absent.
Treat it strictly as an extra competitor whose output is judged like any other.

## Before use — local verification

Per `docs/toolchain-verification-ledger.md`, this surface is `PROBE`. Verify
locally before wiring it into `factory.config.toml`:

1. `grok-build --version` — confirms the binary exists for this account tier.
2. Headless `-p` invocation works (non-interactive prompt mode).
3. Git worktrees behave (each candidate gets an isolated worktree).
4. Any Arena-like scoring is reproducible locally — do not trust hosted scores.

## Selection rule

If used, feed it **gameplay falsifier results** — never code taste alone. A
Grok Build candidate wins only by surviving the same falsifiers as every other
lane. "Arena Mode" / model self-judgment is advisory at most; it never selects.
