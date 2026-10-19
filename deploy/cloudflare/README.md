# Cloudflare setup — source stays private

The source repository and private feedback repository do **not** need to be public. Cloudflare's GitHub App can be authorised for the selected private source repository. Its deployment access is separate from the feedback token.

## Current state

The Owner connected the private GitHub source repository in the Cloudflare dashboard on 19 October 2026, selected a dedicated build token and Node 24, and ran a successful build/dry run. The screenshot shows `--dry-run: exiting now`; it does not prove upload permission, Access protection, a live site or working feedback. No credentials were shared with the agent.

The agent's earlier secure dashboard sign-in returned HTTP 403. The Owner's separate browser session is not available to the agent. No widget, runtime secret or public deployment has been configured by the agent.

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
3. Current dashboard commands: build `npm run build`, deploy `npm run cf:validate`; Node variable `NODE_VERSION=24`, path `/`. Preview builds are off. This deliberately repeats the build inside validation but is temporary setup, not the final production workflow. Leave custom domains/routes empty and the production workers.dev URL disabled. Do not substitute the default deploy command while drafts await launch.
4. For an access-restricted hosted preview, configure and verify Cloudflare Access first; a preview URL or noindex is not privacy. Do not attach any production credentials to a branch preview.
5. After public launch is separately approved and the initial articles pass independent review, configure the production build with `RELEASE=1` and the approved `SITE_URL`. Set the deliberate `PUBLIC_LAUNCH_APPROVED=true` acknowledgement only within that authorised deployment workflow. Build command: `npm run build`; deploy command: `npm run cf:deploy` (it revalidates). Confirm main-branch CI before enabling automated deployment.
6. Following the Owner's public-access decision, the release branch sets `workers_dev:true` and `preview_urls:false`; feedback stays disabled and no custom domain is added. This takes effect only after a real guarded deployment. Dashboard settings alone do not replace the tracked source configuration.

Cloudflare Git integration supplies its own deployment credential. It does not require storing a Cloudflare token in GitHub. Avoid adding another broad personal token for deployment.

## Public launch authorised — current next step

Owner authorised the whole website to be publicly accessible on 19 October 2026 (issue #5). Zero Trust/Access is not needed for that public site; the private-preview instructions below are superseded. Do not enable account-wide protection or change other projects.

Before actual deployment, complete the profile assessment in PROJECT.md. The Manager proposes retaining Lightweight for a manual public Pilot; the Owner must choose. Verify the production Worker URL under Domains. The expected URL, derived from the current Five Minutes account hostname, is `https://pearls-of-wisdom.vitoria-nuno.workers.dev`; confirm it in this project's dashboard before setting canonical metadata.

With the matching approved release merged and the profile choice recorded, configure:

| Dashboard setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npm run cf:deploy` |
| `NODE_VERSION` | `24` |
| `RELEASE` | `1` |
| `SITE_URL` | Exact verified HTTPS Worker origin, no trailing slash |
| `PUBLIC_LAUNCH_APPROVED` | `true` |
| Preview builds | Off |
| Access / Zero Trust protection | Not required; do not apply it to the public site |

These are build settings/non-secret variables; no feedback token or Turnstile secret is required while feedback stays disabled. Source now enables production `workers_dev` and explicitly disables preview URLs. The guarded command validates release records, tests and the build before uploading. A new source commit after this command is activated can update the public site; this is deployment automation, not a scheduled article writer.

First release is prepared for 19 October 2026. If deployment happens later, update first-publication dates and revalidate exact review hashes before deploying. A record selected for release is not proof that it has already appeared online. After deployment, record the actual URL/version, check signed-out reading and metadata, and establish a known-good rollback version. Agent dashboard login remains unavailable; the Owner must make these dashboard changes and share the non-secret outcome.

Official references checked 19 October 2026: [Worker Access](https://developers.cloudflare.com/workers/configuration/cloudflare-access/) and [Worker Previews](https://developers.cloudflare.com/workers/previews/get-started/). A future preview command needs `--config deploy/cloudflare/wrangler.jsonc`; keep branch previews disabled for this launch.

## Feedback credentials — production only

See docs/FEEDBACK.md. Provision a fine-grained GitHub token scoped only to `nunov00/pearls-of-wisdom-feedback`: Issues read/write and Metadata read. Store it directly as production Worker secret `FEEDBACK_GITHUB_TOKEN`, never in source, chat, logs, build variables or previews.

Create a Turnstile widget restricted to the final production hostname. Store its secret directly as production `TURNSTILE_SECRET_KEY`. `TURNSTILE_SITE_KEY` is public configuration, not a secret. Set the exact `FEEDBACK_ALLOWED_HOSTNAME` after the hostname is known. Keep keys unavailable in branch builds and previews.

`FEEDBACK_ENABLED` is currently false in source and previews. For durable activation, change the production source variable to true in a reviewed configuration PR once keys/hostname exist, retaining false in previews. Dashboard-only edits may be overwritten by a later deployment. Configure non-secret runtime values in the production source or matching deployment environment consistently. Test one private submission after activation without exposing the resulting issue publicly.

Do not reuse the Five Minutes feedback token or Turnstile secret. Keep deployment credentials and feedback credentials separate. Current GitHub connector operations cannot create fine-grained personal tokens; use GitHub's own secure settings and enter the resulting credential directly into Cloudflare secrets. New credentials and permissions must be confirmed through the respective secure UI flow.

## Later activation checks

Verify shared free-tier allowances; production/preview secret isolation; configured hostname; private repository visibility; source and release checks; actual iPhone Safari; private submission, provider failure and deletion; and a real Cloudflare rollback. None is established by a successful local dry run.
