# Validation record — 19 October 2026

## Verified state on 19 October 2026

- Astro/TypeScript diagnostics have zero errors, warnings or hints. Sixteen local tests pass, covering content/release policy, search, private-feedback boundaries, deployment refusal and source-backup exclusions.
- Three initial articles and thirteen queue entries validate, leaving ten future candidates after first release. Preview and release builds produce eleven HTML pages and seventeen static files; internal references resolve, with one H1 and British-English metadata per page. Preview noindex stays separate from public release metadata.
- Independent source review inspected all eight cited pages. A separate reviewer considered the goals before reading the articles, then challenged the selections. Minor changes were corrected and rechecked; exact final article hashes and access limits are in docs/reviews/. Both reviewers are separate OpenAI agents, not different providers. No publication authorisation is implied.
- GitHub Baseline passed on PR #4. All ten Chromium/phone-WebKit cases passed in [Browser QA run 39269869985](https://github.com/nunov00/pearls-of-wisdom/actions/runs/39269869985): page structure, automated serious/critical accessibility checks, 320px overflow, search/filter/reset and fetch-failure recovery, keyboard/evidence controls and no-JavaScript reading. Mobile home/article screenshots were visually inspected. The first harness runs exposed unsupported example inflection and overly exact selectors; these were corrected. Results for the final dependency/documentation commit are also recorded on PR #4.
- The backup fixture confirms content can be read back and its checksum matches, while root/nested environment and Cloudflare development credentials, local runtime state, test artefacts and old archives stay out. An earlier full source archive was restored into an empty workspace with clean installation and successful checks. The latest changes have the focused archive test; a new full recovery drill is not claimed.
- Wrangler is pinned to 4.151.2 after an npm advisory in its local dependency chain. Updated dependencies report zero npm audit vulnerabilities at this check; this is a point-in-time result. Static site and feedback adapter bundle successfully with `npm run cf:validate`, ending with `--dry-run: exiting now` and feedback disabled. No upload is performed.
- The Owner's Cloudflare dashboard screenshot separately confirms a successful Git-integrated build/dry run. This does not verify upload permission, private routing, runtime secrets or a real deployment. Source and feedback repositories remain private.
- Public access is now Owner-authorised (issue #5). The 19 October article dates match an independently verified content commit and exact hashes; release validation and a full local release-mode verification pass using a non-live test origin. This is not a live deployment. Automation and feedback remain disabled. A date change requires renewed exact-byte validation.

## Remaining limits and Owner handoff

Actual iPhone Safari, screen-reader journeys and complete accessibility conformance; live public routing/metadata; live Turnstile/submission/deletion; real deployment/rollback; current aggregate account quotas; agreed durable backup destination; and unattended cross-provider publishing remain unverified. Browser emulation and mocked feedback tests do not establish those results.

The Owner has chosen a public site, so Access/Zero Trust is unnecessary. See deploy/cloudflare/README.md and docs/LAUNCH-CHECKLIST.md for the remaining Cloudflare settings. The agent has no working Cloudflare account connection; credentials must be entered directly into the relevant service, never chat. Public access is approved; the Owner confirmed Lightweight for the initial public Pilot and verified the production origin on 19 October 2026.

The entries below are historical, superseded by the current state above.

# Initial validation — historical

## Passed

- Astro/TypeScript diagnostics: zero errors, warnings or hints.
- Five policy/search tests covering Zurich dates, release visibility, malformed/unsafe content, independent-review records, stale content hashes, significant findings, correction limits, duplicate records and metadata search.
- Three structured article drafts and twelve queue entries validate.
- Static build: ten HTML pages, sixteen files; internal references resolve, one H1 and British-English language metadata per page, preview noindex.
- All eight unique source URLs returned HTTP 200 in a separate reachability run. This does not replace factual source inspection.
- `npm run release:check` rejects the current project as expected: no independently reviewed articles are selected for release.
- A source backup was extracted into a separate empty workspace, dependencies installed from the lockfile, and all diagnostics/tests/build checks passed there.
- The offline preview has valid JavaScript syntax and consistent internal route references. It is a derivative of the static preview, with inlined CSS and local navigation/search; it does not establish browser compatibility.
- Automation is disabled; no cron or writer/reviewer task has been created.

## Not verified

Browser visual QA, automated accessibility/browser journeys, WebKit, actual iPhone Safari, external independent editorial review, GitHub push/PR checks, real guarded merge, Cloudflare access/deployment, live rollback, current account quotas and unattended AI capabilities. No public deployment exists.

## Next actions

Create/identify the GitHub repository, transfer the prepared source via a feature branch, run CI, arrange independent content review, and verify mobile rendering. Public launch and recurring scheduling remain separate Owner decisions. Three example drafts are not published articles.

## Repository/feedback follow-up

The two repositories now exist and are private; the source repository contains the governance template. Its GOVERNANCE.md is retained unchanged, AGENTS.md gains project-specific scope notes, and PROJECT.md is filled in without changing profile. Feedback adapter/form tests use mocked provider responses; no real reader message or GitHub token is used. Live spam protection, deployment and mobile verification remain outstanding.

## Cloudflare preparation follow-up

Pinned Wrangler 4.147.0 bundles the static site and feedback adapter successfully using `npm run cf:validate` (`wrangler deploy --dry-run`). This does not upload or create a Cloudflare resource. Fifteen local tests pass, including deployment-authorisation/origin refusal. The config remains workers_dev=false and FEEDBACK_ENABLED=false. Actual dashboard setup and credential provisioning are blocked by a Cloudflare login HTTP 403 in the available browser. No repository visibility changes were made.

## Idea queue update — 28 October 2026

The historical 13-entry validation above is unchanged. The idea trial now contains 15 entries, including 12 future ideas. PR #23's initial head passed Baseline and Privacy check; amendments require fresh CI. Queue checks and independent-review limits are recorded on that PR. This update makes no new deployment or article-validation claim.
