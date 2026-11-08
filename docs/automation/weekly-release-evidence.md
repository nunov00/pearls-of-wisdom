# Monday release evidence and cycle records

This contract is for implementation and review. It does not activate publishing or replace the existing manual release policy.

Use one scheduled Codex task for all seven weekly dispatches from the [Monday design](weekly-production-design.md). Claude uses one separate reviewer routine. The Tuesday watchdog runs in GitHub Actions.

## Reservations and cycle outcome

Derive the slot from the actual dispatch time with `weeklySlot`. Reserve `weeklyReservationKey(slot)` before any editorial write or image dispatch. The reservation must use a create-only Git ref under a dedicated reservation namespace. A pre-existing ref, a concurrent creation conflict or an uncertain response means stop before mutation. A list-then-comment sequence is not a lock. Never use an upsert, update or force operation for the reservation. Re-read the resulting ref and record its immutable start evidence in the cycle ledger. A retry can reconcile existing work but cannot repeat an uncertain mutation. Prove this with competing writers before activation.

The cycle ledger records the Tuesday cycle key, actual Zurich slot, task and provider IDs, reservation ref, selected candidate, PR, reviewed heads and review/image budgets. It links evidence rather than reproducing mutable scores. Record exactly one terminal outcome (Published, Deferred, Blocked) with the same create-only reservation discipline. A merge with unverified deployment is pending. Tuesday's watchdog checks the prior cycle outcome and pauses if it is absent.

## Evidence

Before Monday, prepare the proposed release record on the candidate head. An intended publication date is not a publication claim. The record's article and both cover hashes are SHA-256 of the exact Git bytes. The weekly check reads those bytes directly from Git without running candidate scripts. Keep the existing published and manual records valid.

For the eligible review slot, the author and independent reviewer each return a separate exact-head receipt containing cycle, head, review slot, role, provider, article and cover scores, hashes of all three assets, a readiness decision and findings. Their ledger entries link the evidence for sources and browser verification. Read the genuine provider review evidence through the authorised surfaces and verify its provenance before accepting a receipt. Provider strings inside candidate files or PR comments are not proof of identity. If provenance is unavailable, block. Compare budgets with the complete ledger rather than trusting candidate counters.

`assertWeeklyRelease` validates the date, hashes, ratings, findings and budget shape. It does not fetch Git data, authenticate receipts, lock a slot, check branch protection or merge. The trusted integration must do those things separately. The dedicated required check must fail closed on missing, stale or ambiguous evidence and must be proven in the ruleset before activation. Monday must also pass the existing release checks and reconcile the public deployment before marking Published.
