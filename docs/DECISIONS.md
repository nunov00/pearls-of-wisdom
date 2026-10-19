# Decisions

## 001 — Static publication

Owner-approved direction, 19 October 2026: Astro, TypeScript, structured YAML and Cloudflare static output. Reasons: reuse familiar architecture, no server/database, portability and small operational footprint. Alternatives: a custom static generator saves dependencies but increases maintenance; a full application/CMS adds unnecessary infrastructure.

## 002 — Manual operation during development

Owner instruction, 19 October 2026: “Please proceed. Don’t schedule writer/reviewer tasks for now.” Implement disabled-state documentation and manual release checks. No schedules are created, edited or activated.

## 003 — Drafts are not publications

Preview mode is clearly labelled and noindex. Production mode requires publication records and matching independent-review evidence. Noindex is not privacy; public deployment still requires separate authorisation. Independent review is procedural as well as technical, and declared identities cannot cryptographically prove it happened.

## 004 — Private reader feedback

Owner request, 19 October 2026: created the source and feedback repositories “so that users can add feedback, like for the five minutes site”. Adapt the Five Minutes pattern without its analytics service: a same-origin form, Turnstile verification and private GitHub issues. Verify storage remains private before sending text. Keep disabled until deployment configuration exists. Feedback review is on demand; no automatic product changes, scheduled ingestion or paid service is introduced.

## 005 — Public website, manual publishing

Owner decision, 19 October 2026: “You can make the whole site publicly accessible like five minutes, no?” Prepare public Workers hosting and a normal reviewed release. Cancel the private-preview/Zero Trust detour. Source/feedback repositories stay private; feedback and writer/reviewer schedules stay disabled. Release authorisation, exact-byte editorial checks and CI still apply. The first-deployment profile assessment is proposed in PROJECT.md and needs the Owner's choice; no governance transition is silently inferred.
