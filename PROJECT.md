# Project configuration

- **Project:** Pearls of Wisdom (working title)
- **Purpose:** Concise, evidence-based practical foundations for everyday goals.
- **Owner:** Nuno Vitoria
- **Manager:** ChatGPT (or designated manager)
- **Governance template:** v0.3
- **Stage:** Pilot
- **Governance profile:** Lightweight
- **Technology:** Astro, TypeScript, structured YAML, portable static output; optional narrow Cloudflare feedback adapter.
- **Tests / required checks:** `npm run verify`; `Baseline / baseline` CI. No enforcement ruleset is claimed.
- **Deployment:** Cloudflare Git integration configured; Owner authorised public access on 19 October 2026. Release preparation and CI are complete; public origin confirmed as https://pearls-of-wisdom.vitoria-nuno.workers.dev. Dashboard activation and live deployment remain unverified.
- **Material paths:** `.github/**`, `scripts/release-*`, `scripts/trial-schedule.mjs`, `deploy/**`, `editorial/automation.json`
- **Control overrides:** None
- **Standing delegations:** Bounded one-off preparation/review trial only; see docs/pilots/2026-11-06-activation.md. No unattended publication.

Stage is one of PoC, Pilot or Production; profile is Lightweight, Standard or Strict (see `GOVERNANCE.md` → Profiles and controls). Keep the profile word first on its line: the approval check reads it. Material paths are backtick-quoted globs that always make a PR material. Control overrides are lasting changes to one control of the profile, for example: "Release approval: as in Strict (Owner, 2026-10-17, customer-facing launch)". An override does not change any check by itself; the same PR must make the matching CI or GitHub settings change (see `GOVERNANCE.md` → Profiles and controls). Temporary exemptions, such as no approvals for one feature, are review waivers (GitHub issues labelled `review-waiver`), not entries here.

Reassess the profile before the first production deployment. Changing this file does not configure GitHub rules, CI or Copilot; see `GOVERNANCE.md` → GitHub settings per profile.

## Profile history

| Date | From → to | Stage | Reason | Approved by |
|---|---|---|---|---|
| 2026-10-19 | — → Lightweight | PoC | Approved implementation plan | Owner (chat) |
| 2026-10-19 | Lightweight retained | Pilot | Initial manual public site; independent editorial release gates and green checks; feedback/schedules disabled | Owner: “Lightweight confirmed for now” (chat) |

## Available AI and development tools

These are starting assumptions; confirm actual access, plan limits and project suitability before relying on them.

| Service | Plan / budget | Typical use |
| --- | --- | --- |
| ChatGPT | Plus (existing subscription) | Planning, architecture, implementation, coordination |
| Claude | Pro (existing subscription) | Implementation, alternative approaches, independent review |
| GitHub Copilot | Pro (existing subscription) | Coding assistance and PR reviews |
| GitHub | Free tier; Copilot billed separately | Repository, pull requests, Actions / CI |
| Cloudflare | Free tier preferred | Hosting, Workers, static assets, deployment |

**Cost policy:** Prefer existing subscriptions and free tiers. Do not introduce paid APIs, subscriptions, metered infrastructure or recurring costs without Owner approval. Verify current quotas and limits before choosing an architecture.

**Access policy:** A subscription does not imply API access, unrestricted usage or permission to act through a connector. Verify available tools, permissions and deployment capability. Prefer simple, maintainable, portable architectures; choose a different provider when requirements justify it.

## Shared infrastructure and known limits

GitHub and Cloudflare are shared by all projects. Plan for aggregate resource use, not an assumed independent quota per repository.

| Service | Planning constraint (October 2026; verify before use) |
| --- | --- |
| ChatGPT Plus | Variable usage limits; API billed separately |
| Claude Pro | Session and weekly usage limits; API billed separately |
| Copilot Pro | Plan-specific premium requests and review limits |
| GitHub Free | Actions allowance commonly 2,000 minutes/month for private repositories; storage and other limits apply |
| Cloudflare Workers Free | Common reference: 100,000 requests/day and 10 ms CPU/request; asset and build limits also apply |

Current official documentation: [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions), [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [Copilot plans](https://github.com/features/copilot/plans).

**Resource policy:** Prefer efficient CI triggers, caching, static delivery when suitable and proportionate background schedules. Avoid redundant builds, deployments, polling, storage and API calls. Preserve functionality, reliability, security and user experience. Check which limits are account-wide versus per-resource, and verify current usage before significant decisions. Escalate expected capacity pressure or paid upgrades to the Owner.

## Project decisions and current access

- Owner approved initial implementation on 19 October 2026: “Please proceed. Don’t schedule writer/reviewer tasks for now.” Routine implementation, fixes and tests within that scope do not need repeated approval.
- Owner created `nunov00/pearls-of-wisdom` and `nunov00/pearls-of-wisdom-feedback` and requested reader feedback like Five Minutes on 19 October 2026. Both repositories were verified private. Preserve private feedback storage.
- GitHub source and feedback repository access is verified. Owner's Cloudflare build screenshot confirms successful static generation and Wrangler dry run, not deployment permissions. Initial independent source and blind recommendation reviews are recorded in docs/reviews/; they are separate OpenAI agents, not different providers. Public deployment and actual iPhone Safari remain unverified.
- Do not launch publicly, create recurring tasks, incur additional costs or perform destructive operations without the relevant Owner decision. Feedback remains disabled until hosting and least-privilege credentials are configured.
- Keep the inherited governance template and active Lightweight profile. Reassess the profile before first public production deployment. No GitHub protection settings are implied by these files.

## Public launch decision and profile assessment

Owner decision, 19 October 2026: “You can make the whole site publicly accessible like five minutes, no?” This authorises a public site; it does not enable scheduled writer/reviewer tasks, paid services, public repositories or feedback credentials. The private-preview/Zero Trust detour is cancelled.

Owner confirmed on 19 October 2026: “Lightweight confirmed for now”. Retain Lightweight for the initial manual public Pilot, with independent editorial release checks, green tests/builds, explicit public-launch authorisation and disabled feedback/schedules. This completes the first-deployment profile assessment without a profile transition, waiver or change to approval rights. Reassess Standard before unattended publishing or reader storage. The Owner's Domains screenshot confirms https://pearls-of-wisdom.vitoria-nuno.workers.dev as the production origin.

## One-off weekly trial decision — 28 October 2026

Owner decision: “Ok, proceed”, following accepted PR #25 plan and proposed one-off activation. Authorises only the dated preflights and preparation/review tasks in docs/pilots/2026-11-06-activation.md, tracked in issue #26. This narrow decision supersedes the earlier scheduling prohibition only within that trial. Recurring tasks, trial extensions, costs and unattended publication remain unauthorised. Lightweight/Pilot remains unchanged. Both scheduled preflights must be verified before author/reviewer stage tasks are created; missing slots pause rather than roll forward. Configuration records authorisation, not proof tasks exist.

Preflight evidence clarification: each scheduled preflight may append exactly one keyed results comment to issue #26 and re-fetch it, testing the required comment path. This is the sole write exception to the otherwise repository-read-only preflight. The Manager verifies those retrievable results before marking the both-provider gate passed. No repository or publication write is authorised by preflight.

Historical combined author-task decision (superseded by the Sunday amendment below), 30 October 2026: “Ok please combine them then”. Authorises packaging only the existing 2/3/5 November author invocations into one finite COUNT=3 scheduler task, per the reviewed activation amendment. This is not ongoing recurring operation; editorial/automation.json remains unchanged and expires at the existing time. All Claude reviews, quality gates, setup checks and manual publication remain required.


Sunday four-review amendment, Owner decision 30 October 2026: “Ok, do you want to implement the trial with the new schedule?” following “An article should only be published if it’s rated 9+ by you and Claude, otherwise it goes back to the backlog.” Supersedes the earlier 2/3/5 November COUNT=3 packaging only for the same run/expiry. New finite schedule: Sunday 1 November topic selection/review and evening ranked-queue consolidation; Monday–Thursday up to four article reviews with three correction rounds; Friday manual publish only with both final scores >=9 and all safeguards, otherwise backlog. One COUNT=5 daily author task, one Sunday evening one-off queue task and five Claude one-off reviewer tasks, no ongoing recurrence or unattended publication. Topic correction budget remains two; activate only after independent review/merge and verified replacement of old tasks. See the current activation record.

Review correction, 30 October 2026: Claude's scheduler has no COUNT/RRULE support. Store five run_once_at reviewer tasks instead; retain all old v1 tasks disabled and never re-enable them. Article recovery uses only later existing opportunities with the next unused review number from genuine result history, at most four results/three corrections, no extra sessions. Permanent editorial quality/correction limits remain after the finite trial expires; only scheduling authority returns to manual-only.

## Single-task packaging — 30 October 2026

Owner decision: “Ok, do it please” (30 October 2026), consolidating the two ChatGPT tasks. One finite combined task now packages exactly the same six invocations: 1–5 November 09:13 Zurich and Sunday 1 November 19:13 Zurich. The existing current-main dispatcher chooses only the due author or queue role; both complete action bodies are retained. Its weekly rule uses WKST=SU and BYSETPOS=1,2,3,5,7,9 with COUNT=6, producing only those six dates. The standalone queue task is retired/disabled. Claude’s five one-offs and complete reviewer prompt are unchanged. No invocation, authority, review budget, prerequisite, quality gate, policy window or publication permission is added. PR #30’s independent approval and VERIFIED v2 provider evidence remain required. This is a material scheduler-packaging change under the existing Lightweight profile, which requires no additional independent approval; no waiver or bypass is introduced. Stored scheduler configuration is verified separately from future delivery.

## Scheduler dispatch tolerance — 1 November 2026

Owner decision: “Can you fix this? No need to be so strict with the timing”. A scheduled 09:13 author invocation arrived at 09:10 and was refused before any content or GitHub write. Nominal schedule times are dispatch targets, not exact-minute authorisation barriers. The current-main dispatcher now accepts starts up to 30 minutes early: author from 08:43, reviewer from 13:47, and Sunday queue from 18:43 Zurich. Later starts were already accepted within each existing window. Original completion boundaries, actual Zurich dates, prerequisites, duplicate reconciliation, review budgets, manual publication and policy expiry remain unchanged. Early reviewer/queue dispatch must still have the actual completed prerequisite; the grace period never substitutes for a handoff.

The existing Claude stored reviewer prompt/runtime command is unchanged and reads the current-main helper; no replacement reviewer task is needed. Update only the combined ChatGPT prompt to clarify dispatch tolerance; retain its exact six-occurrence schedule. A same-date replacement for the rejected Sunday selection is authorised by this repair, after checking no selection/request/completion was written; it replaces the no-work dispatch and adds no content/review opportunity. No old date is replayed.
