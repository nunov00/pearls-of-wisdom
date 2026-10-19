# Cloudflare setup — source stays private

The source repository and private feedback repository do **not** need to be public. Cloudflare's GitHub App can be authorised for the selected private source repository. Its deployment access is separate from the feedback token.

## Current state

No Cloudflare account configuration, Worker, widget, credentials or public deployment has been created by the agent. An attempted secure dashboard sign-in on 19 October 2026 was rejected with HTTP 403 in the available cloud browser. This is a browser-specific sign-in failure, not evidence that the user's password was wrong or the site is down.

The repository contains pinned Wrangler, a local dry-run command, a guarded production deployment command and disabled feedback configuration. No recurring tasks are present.

## Verify locally without account access

```sh
npm ci --ignore-scripts
npm run verify
npm run cf:validate
```

`cf:validate` builds and bundles using `wrangler deploy --dry-run`. It does not log in, upload, create a Worker or deploy. No credentials are needed. Production `cf:deploy` refuses to run without explicit launch acknowledgement, RELEASE=1, a valid approved HTTPS SITE_URL and passing release/editorial checks. Setting the flag is not itself Owner approval.

## Initial dashboard setup

1. In Workers & Pages, import the existing GitHub repository. Grant the Cloudflare GitHub App access to **only** `nunov00/pearls-of-wisdom` for this project; retain unrelated existing project permissions. Do not make either repository public. The Cloudflare Git integration does not need access to the feedback repository.
2. Worker name: `pearls-of-wisdom`; repository root: `/`; Node version: `24`.
3. Initially use build command `npm run cf:validate`. Do **not** enable automatic deployment or public branch-preview URLs while the articles are drafts. Leave custom domains/routes empty and the production workers.dev URL disabled. If the import wizard requires an immediate deployment, stop until a private test setup or launch is authorised rather than selecting the default public deployment.
4. For an access-restricted hosted preview, configure and verify Cloudflare Access first; a preview URL or noindex is not privacy. Do not attach any production credentials to a branch preview.
5. After public launch is separately approved and the initial articles pass independent review, configure the production build with `RELEASE=1` and the approved `SITE_URL`. Set the deliberate `PUBLIC_LAUNCH_APPROVED=true` acknowledgement only within that authorised deployment workflow. Build command: `npm run build`; deploy command: `npm run cf:deploy` (it revalidates). Confirm main-branch CI before enabling automated deployment.
6. The tracked `workers_dev:false` and lack of domain/routes intentionally prevent public exposure. Any activation must be a reviewed configuration change with the appropriate Owner decision; do not assume the dashboard overrides this source file permanently.

Cloudflare Git integration supplies its own deployment credential. It does not require storing a Cloudflare token in GitHub. Avoid adding another broad personal token for deployment.

## Feedback credentials — production only

See docs/FEEDBACK.md. Provision a fine-grained GitHub token scoped only to `nunov00/pearls-of-wisdom-feedback`: Issues read/write and Metadata read. Store it directly as production Worker secret `FEEDBACK_GITHUB_TOKEN`, never in source, chat, logs, build variables or previews.

Create a Turnstile widget restricted to the final production hostname. Store its secret directly as production `TURNSTILE_SECRET_KEY`. `TURNSTILE_SITE_KEY` is public configuration, not a secret. Set the exact `FEEDBACK_ALLOWED_HOSTNAME` after the hostname is known. Keep keys unavailable in branch builds and previews.

`FEEDBACK_ENABLED` is currently false in source and previews. For durable activation, change the production source variable to true in a reviewed configuration PR once keys/hostname exist, retaining false in previews. Dashboard-only edits may be overwritten by a later deployment. Configure non-secret runtime values in the production source or matching deployment environment consistently. Test one private submission after activation without exposing the resulting issue publicly.

Do not reuse the Five Minutes feedback token or Turnstile secret. Keep deployment credentials and feedback credentials separate. Current GitHub connector operations cannot create fine-grained personal tokens; use GitHub's own secure settings and enter the resulting credential directly into Cloudflare secrets. New credentials and permissions must be confirmed through the respective secure UI flow.

## Later activation checks

Verify shared free-tier allowances; production/preview secret isolation; configured hostname; private repository visibility; source and release checks; actual iPhone Safari; private submission, provider failure and deletion; and a real Cloudflare rollback. None is established by a successful local dry run.
