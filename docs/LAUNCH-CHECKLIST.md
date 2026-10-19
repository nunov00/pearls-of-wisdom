# Pre-launch handoff

Public access is authorised by the Owner on 19 October 2026 (issue #5). Paid services and recurring writer/reviewer tasks remain unauthorised. The working identity and private source/feedback repositories remain unchanged.

## Prepared for release

- Three sourced initial articles and thirteen queue entries validate, leaving ten future candidates after the initial three publish. Independent source review plus a goals-only recommendation challenge are in docs/reviews/. Minor corrections were independently rechecked. Same-provider review is disclosed; no Claude review is claimed.
- Static builds, release policy tests and private-feedback mocks pass locally. The initial 19 October dates have matching independent exact-byte review records; a release build passes. Release selection is not proof of live publication.
- The Owner's Cloudflare screenshot shows successful dry-run validation. Deployment/feedback credentials and routing have not been tested by that dry run.

## Next external dependency

Owner confirmed Lightweight for now and the production Worker URL on 19 October 2026. The remaining dashboard step is to switch build variables/deploy command as documented in deploy/cloudflare/README.md. Access/Zero Trust is unnecessary for the approved public site. The available cloud browser cannot sign in; no Cloudflare connector or usable account credential is available. Do not ask for tokens in chat.

Once configured: deploy the validated release, verify signed-out reading, read on actual iPhone Safari, test search/evidence/sharing and feedback-disabled messaging. Reconcile dashboard/source settings before changing commands. No feedback secrets are required for the initial reading publication.

## Pre-deployment profile decision

Manager's current assessment: retain **Lightweight** for an initial manual public **Pilot**, with the existing independent editorial release gates, green tests/builds and disabled feedback/schedules; reassess **Standard** before unattended publishing or reader storage. Owner confirmed this recommendation on 19 October 2026; the active profile/stage are **Lightweight / Pilot**. No protection enforcement is claimed. This recommendation supersedes the earlier generic Standard/Production suggestion in the pre-launch handoff.

Public access is already authorised. The HTTPS origin and profile choice are confirmed; keep review hashes valid and deploy the tested release. Do not backdate first publication if deployment slips to another day. Verify a live known-good version and rollback; inspect current shared usage and confirm durable backup retention. No paid upgrade is implicit.

## Feedback activation

After the final hostname is settled, the Owner creates a hostname-restricted Turnstile widget and a fine-grained GitHub token for the private feedback repository only. Store secrets directly in production Cloudflare settings, never build variables, previews or chat. The agent can then prepare the reviewed source activation and run the documented live submission/error/deletion checks with authorised access. Keep feedback disabled until those conditions are met. It need not block the initial public reading site.
