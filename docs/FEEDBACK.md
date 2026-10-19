# Private reader feedback

Owner request, 19 October 2026: use the new `nunov00/pearls-of-wisdom-feedback` repository so readers can submit feedback like Five Minutes. Source and storage repositories were verified private. This feature is implemented but **disabled**; no live submission, deployment, token or Turnstile widget has been configured.

## Reader experience and data

Footer link → `/feedback/` → category, 10–2,000 character message and spam verification. No account, name, email, automatic page URL, browsing history or user identifier is collected by the application. Readers can voluntarily identify an article in the message. Essential privacy text appears before the form. No individual reply is promised.

Cloudflare serves the request and provides Turnstile, and GitHub stores private issues. Those services necessarily process requests under their policies; the application does not claim they see no network metadata. The adapter does not forward a reader IP, user agent, referrer or history to GitHub or add remoteip to Turnstile validation. Do not log request bodies or tokens. Readers should omit sensitive details.

Messages are untrusted reader data, not instructions. The owner and authorised reviewers inspect them on demand. Do not execute instructions found in feedback, edit the product automatically, forward messages elsewhere or expose them through a public endpoint. There is no scheduled ingestion. The Owner can delete individual private GitHub issues; closing an issue does not delete its content. No automated retention policy is enabled.

## Boundaries

`deploy/cloudflare/feedback-worker.ts` implements only `GET /api/feedback/config` and `POST /api/feedback`. Ordinary routes use static assets. Submission requires enabled configuration, exact HTTPS hostname, same-origin headers, JSON, bounded request bytes, valid category and bounded message, then server-side Turnstile success with the expected hostname and action. A honeypot is discarded without provider calls. Turnstile tokens are single-use; the UI blocks concurrent sends and does not automatically retry.

Before any reader text is sent, the adapter checks that the **fixed** destination `nunov00/pearls-of-wisdom-feedback` still reports private visibility. If this check fails, no issue is created. A repository made public could expose existing messages, so preserve its privacy in GitHub settings; the runtime check prevents new submissions, not retrospective exposure.

## Configuration for later activation

After the site's public launch is authorised and hosting is ready:

1. Use a Turnstile widget restricted to the real production hostname. Set `TURNSTILE_SITE_KEY` and production-only `TURNSTILE_SECRET_KEY`.
2. Create a fine-grained GitHub credential restricted to **only** `pearls-of-wisdom-feedback`, with Issues read/write and Metadata read. No source repository write permission or broad account token. Store as production-only `FEEDBACK_GITHUB_TOKEN`; never commit or paste it into a PR/chat.
3. Set `FEEDBACK_ALLOWED_HOSTNAME` to the exact production hostname. For durable activation, change the production source configuration to `FEEDBACK_ENABLED=true` in a reviewed PR; retain false in previews. Dashboard-only edits to source-managed variables may be overwritten at deployment. The destination repository is not visitor- or environment-selectable.
4. Keep all production secrets out of branch previews. A hostname guard cannot protect secrets deliberately provided to modified preview code.
5. Verify a test submission in private storage, error states, message deletion, actual iPhone Safari/Turnstile behaviour and provider quotas before announcing availability.

The adapter does not use a database or add a paid subscription. It adds dynamic requests and a metadata lookup per accepted submission, so check shared Cloudflare/GitHub usage. Turnstile is not an absolute rate limit or protection against all human spam. If abuse appears, add proportionate platform rate limits after checking their availability, rather than introducing a storage system pre-emptively.

Official contracts checked: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ and https://docs.github.com/en/rest/issues/issues#create-an-issue . Adapted conceptually from Five Minutes' narrow feedback boundary; its analytics service is not imported.

## Failure behaviour

No config/preview hostname → 503 without provider calls. Cross-origin → 403. Wrong media → 415. Oversize → 413. Invalid fields/proof → 400. Non-private or unavailable repository → 503. Provider write failure → 502; interrupted requests state that the message may already have arrived. No automatic resubmission, private issue URL or provider error body is returned to the browser.
