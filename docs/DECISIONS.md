# Decisions

## 001 — Static publication

Owner-approved direction, 19 October 2026: Astro, TypeScript, structured YAML and Cloudflare static output. Reasons: reuse familiar architecture, no server/database, portability and small operational footprint. Alternatives: a custom static generator saves dependencies but increases maintenance; a full application/CMS adds unnecessary infrastructure.

## 002 — Manual operation during development

Owner instruction, 19 October 2026: “Please proceed. Don’t schedule writer/reviewer tasks for now.” Implement disabled-state documentation and manual release checks. No schedules are created, edited or activated.

## 003 — Drafts are not publications

Preview mode is clearly labelled and noindex. Production mode requires publication records and matching independent-review evidence. Noindex is not privacy; public deployment still requires separate authorisation. Independent review is procedural as well as technical, and declared identities cannot cryptographically prove it happened.

## 004 — Private reader feedback

Owner request, 19 October 2026: created the source and feedback repositories “so that users can add feedback, like for the five minutes site”. Adapt the Five Minutes pattern without its analytics service: a same-origin form, Turnstile verification and private GitHub issues. Verify storage remains private before sending text. Keep disabled until deployment configuration exists. Feedback review is on demand; no automatic product changes, scheduled ingestion or paid service is introduced.
