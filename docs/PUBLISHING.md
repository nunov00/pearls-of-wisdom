# Manual publication workflow

Recurring automation is disabled by Owner instruction. `editorial/automation.json` is a disabled-state record, not an executable scheduler. No scheduled workflow is present.

1. Reconcile open work and choose one candidate from the queue/revision backlog. Never duplicate an existing article to revise it.
2. Research competing recommendations, check sources, draft and self-edit. Update the same candidate branch and run validation. Keep content PRs from modifying workflow code, permissions or release safeguards.
3. Ask a separate reviewer to assess the audience/goal independently, then inspect the draft and exact supporting evidence. Prefer a different provider when accessible. Copilot review can supplement this but cannot replace it.
4. Address significant findings in no more than two rounds. The reviewer validates the changed content and implications; record the reviewed commit and SHA-256 of the exact final article bytes. A record declaring a different reviewer is not proof of review.
5. Only after launch authorisation, set the real publication date, obtain review of those final bytes and add a publication record. Never backdate first publication. Reject a future date, stale hash, self-review or unresolved significant finding.
6. In GitHub, verify the current PR head equals the reviewed commit, inspect required checks and base changes, then use an expected-head guarded merge. This remote merge step is not implemented locally yet. Do not turn on auto-merge as a substitute.
7. Run a release build with `RELEASE=1 SITE_URL=<approved HTTPS origin> npm run build`. Release check failure means stop, not bypass. The preview bundle must never be used as a release bundle.
8. Deploy through verified Cloudflare access only after approval. Record the actual commit, deployment version and live check; a merge is not proof of publication. On deployment failure reconcile the provider state before retrying.

A manual run record should include runId, Zurich targetDate, candidateId, PR, current head, review round, checks, merge result, deployment version and final outcome. Use one candidate/run identity per target date. Retry the same work and inspect existing merge/deploy state before taking another action. Late work is explicitly rescheduled and revalidated. Failure leaves the latest valid article available.

## Honest current boundary

The implementation has local content/release validation and tests, not unattended research, cross-provider coordination or remote merge/deploy control. Manual instructions do not prove those integrations work. Initial review records are empty and `npm run release:check` intentionally fails. No article is approved for publication.

## Proposed future activation

After separate approval, verify available task slots and execution capabilities before choosing one coordinator or separate writer/reviewer entry points. Test the real scheduled environment, interruptions, correction handoff and independent review. A subscription is not an API. Do not add paid model calls, remove another project’s task or assume a reviewer can launch another provider.
