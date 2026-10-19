# Pre-launch handoff

No public launch, paid service or recurring writer/reviewer task is authorised. The working identity and private repositories remain appropriate for preview.

## Ready for preview

- Three sourced drafts and twelve candidates validate. Independent source review plus a goals-only recommendation challenge are in docs/reviews/. Minor corrections have been made and independently rechecked. Same-provider review is disclosed; no Claude review is claimed.
- Static builds, content/release policy tests and private-feedback mocks pass locally. Release records deliberately remain empty and publication dates unset.
- The Owner's Cloudflare screenshot shows successful dry-run validation. Deployment/feedback credentials and routing have not been tested by that dry run.

## Next external dependency

The Owner must apply an identity-restricted Cloudflare Access policy to this Worker before a hosted preview is created. See deploy/cloudflare/README.md. The available cloud browser cannot sign in; no Cloudflare connector or usable account credential is available. Do not ask for tokens in chat.

Once protected: deploy the draft preview, verify signed-out blocking and allowed-reader access, read on actual iPhone Safari, test search/evidence/sharing and feedback-disabled messaging. Reconcile dashboard and source settings before changing build commands. No feedback secrets are required for this reading preview.

## Before a public launch decision

Recommend assessing **Standard / Production** for a public evidence-based publication, with tests/builds and proportionate independent review of material changes. The active profile remains **Lightweight / PoC** until the Owner decides; no protection enforcement is claimed. Check whether available GitHub Free settings can enforce the intended rules, and document any limitation rather than claiming protection.

Provide the final preview and remaining risks to the Owner. If launch is approved, agree the HTTPS origin, set genuine publication dates, validate review hashes on the final bytes, add truthful publication records, and run a release build. Do not backdate drafts. Verify a live known-good version and rollback. Check current shared usage and an off-repository backup destination before launch; no paid upgrade is implicit.

## Feedback activation

After the final hostname is settled, the Owner creates a hostname-restricted Turnstile widget and a fine-grained GitHub token for the private feedback repository only. Store secrets directly in production Cloudflare settings, never build variables, previews or chat. The agent can then prepare the reviewed source activation and run the documented live submission/error/deletion checks with authorised access. Keep feedback disabled until those conditions are met. It need not block the initial reading preview.
