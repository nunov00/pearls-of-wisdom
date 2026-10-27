# Manual publication workflow

Recurring automation is disabled by Owner instruction. `editorial/automation.json` is a disabled-state record, not an executable scheduler. No scheduled workflow is present.

1. Reconcile open work and choose one candidate from the queue/revision backlog. Never duplicate an existing article to revise it.
2. Research competing recommendations, check sources, draft and self-edit. Update the same candidate branch and run validation. Keep content PRs from modifying workflow code, permissions or release safeguards.
3. Ask a separate reviewer to assess the audience/goal independently, then inspect the draft and exact supporting evidence. Prefer a different provider when accessible. Copilot review can supplement this but cannot replace it.
4. Apply EDITORIAL.md’s 9/10-or-higher target to the whole article. Record the separate reviewer’s score, reasons, remaining weaknesses and actual checks in the review report or PR; improve a below-9 result within the existing correction limit or defer. A high score never overrides a blocker or important finding. Address significant findings in no more than two rounds. The reviewer validates the changed content and implications; record the reviewed commit and SHA-256 of the exact final article bytes. A record declaring a different reviewer is not proof of review.
5. Only after launch authorisation, set the real publication date, obtain review of those final bytes and add a publication record. Never backdate first publication. Reject a future date, stale hash, self-review or unresolved significant finding.
6. In GitHub, verify the current PR head equals the final integration-review commit, inspect checks and base changes, then use an expected-head guarded merge. Article records identify the immutable article-content commit and hash; a later record-only commit does not change the reviewed article bytes. Final integration review still covers the actual PR head. The manager has verified guarded connector merges; this is not an unattended merge service. Do not turn on auto-merge as a substitute.
7. Run a release build with `RELEASE=1 SITE_URL=<approved HTTPS origin> npm run build`. Release check failure means stop, not bypass. The preview bundle must never be used as a release bundle.
8. Deploy through verified Cloudflare access only after approval. Record the actual commit, deployment version and live check; a merge is not proof of publication. On deployment failure reconcile the provider state before retrying.

A manual run record should include runId, Zurich targetDate, candidateId, PR, current head, review round, checks, merge result, deployment version and final outcome. Use one candidate/run identity per target date. Retry the same work and inspect existing merge/deploy state before taking another action. Late work is explicitly rescheduled and revalidated. Failure leaves the latest valid article available.

## Honest current boundary

The implementation has content/release validation, browser checks and verified manager-driven GitHub merges, not unattended research, cross-provider coordination or deployment control. The initial three articles now have matching dated editorial readiness records. This permits a valid release build; it does not prove a real deployment. The Owner confirmed Lightweight for the manual public Pilot and verified the origin on 19 October 2026. Cloudflare dashboard activation remains an Owner step because the agent cannot authenticate there. Manual instructions do not establish an unattended service.

## Proposed future activation

After separate approval, verify available task slots and execution capabilities before choosing one coordinator or separate writer/reviewer entry points. Test the real scheduled environment, interruptions, correction handoff and independent review. A subscription is not an API. Do not add paid model calls, remove another project’s task or assume a reviewer can launch another provider.
