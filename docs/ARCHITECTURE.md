# Architecture

Status: approved direction, local implementation in progress, no hosted deployment.

Astro produces static HTML. YAML article data is validated by `src/lib/schema.ts`; plain strings render through escaped Astro templates, never executable MDX or raw article HTML. The current `.yaml` examples use JSON syntax, which is valid YAML. No application database or server is needed. CSS and system fonts are local; no external font or analytics requests.

`src/lib/catalogue.ts` centralises identity, dates, category paths and release visibility. Preview builds include drafts with explicit labels. Release builds require publication records and matching review content hashes. Stable slugs are preferred; changing one requires redirects.

Library search downloads metadata JSON on first interaction, supports category and date/title ordering and leaves static browsing available without JavaScript. Native details/summary controls expose evidence; material safety notes remain visible. Summary cards derive their list from canonical recommendation IDs.

Provider config lives under deploy/cloudflare. Static output is portable; the current project intentionally has no deployment command, Worker code, bindings or credentials. The Cloudflare file is inactive configuration, not evidence that hosting exists.

Routes: `/`, `/library/`, `/articles/<slug>/`, `/categories/<category>/`, `/about/`, and a real 404. SEO endpoints include canonical metadata when SITE_URL is configured, sitemap and robots. Preview output must never be treated as access-controlled because it is noindex.

Deferred: accounts, reader state, analytics, social autopublishing, image services, AI APIs and elaborate agent orchestration. No illustrations are required for the three initial drafts.
