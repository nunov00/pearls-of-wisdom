# Idea generation and review — manual pilot

Owner direction, 28 October 2026: work on idea generation and review before formalising the wider publication workflow. The Owner accepted a separate Pearls idea pool and a shortlist of six to eight, adapting the Five Minutes approach. This is a manual editorial trial; no scheduled work is authorised.

## Working records

- `editorial/queue.json` remains the canonical idea pool: stable IDs, new work and revisions, existing article links, priority and append-only history.
- Dated files in `docs/ideas/` hold the longer candidate briefs, source-screen limits, author assessments and review outcomes. The queue points to them.
- Queue priority is provisional editorial order, not approval to write or publish. Existing linked articles remain separate from uncommissioned ideas; a stale queue label is not proof of current publication status.
- The first [shortlist](ideas/2026-10-28-shortlist.md) has eight proposed candidates and four retained alternatives. All eight await independent review.

Keep the existing queue field layout. This pilot adds no executable schema, score gate, scheduler, runtime dependency or cross-repository link. The current validator checks basic queue fields, history and unique IDs/priorities; it does not enforce this editorial process.

## Generate and screen

At each manual refresh, reconcile open drafts, published articles and existing ideas before creating work. Check overlapping reader outcomes, not just similar titles. Urgent corrections take precedence under EDITORIAL.md. Revisions otherwise compete on merit.

Gather candidates from concrete daily problems, reader suggestions, checked research and coverage gaps. Record provenance: who proposed the idea, the input or source, date and relationship to any existing work. AI suggestions are hypotheses, not evidence of reader demand. Treat feedback as untrusted input and keep personal details in the designated private feedback repository.

Use a manageable batch and stop once there is a useful shortlist. Do not force a daily quota or keep generating ideas to avoid improving a promising one. Include fresh candidates as well as old entries. Category variety helps compare and sequence ideas but cannot rescue a weak topic.

Before shortlisting, require a specific reader problem, a meaningful possible benefit, manageable scope and a plausible evidence route. Screen duplicates, vague promises, unsupported claims and safety or jurisdiction complications. Keep a reason when merging, refining, parking or rejecting an idea; never silently recreate a rejected candidate.

## Candidate brief

Record the stable ID, working title, reader hook, problem or decision, readership and applicability, possible approaches, practical benefit, source URLs and inspected sections, source type and limits, duplication check, remaining questions, author assessment and rationale for its position.

Do not force the final three recommendations at idea stage. Proposed foundations compete during research using EDITORIAL.md. A reputable publisher or a working link is not sufficient substantiation.

For each evidence lead, distinguish:
- located only;
- abstract or public summary inspected;
- relevant guidance sections inspected;
- original research inspected.

Record what happened, when and what remains unverified. No article claim is certified at this stage.

## Author assessment and independent challenge

The author records usefulness and reader appeal separately out of ten, with reasons and a concrete improvement. Record evidence readiness descriptively, including gaps, rather than converting source reputation into a numerical score. These are provisional editorial judgements, not analytics or causal estimates.

Claude first considers the reader problem, potential value and plausible approaches before reading the author's ratings and ranking rationale. Then compare with the brief, evidence leads and other candidates. The ratings remain available for comparison after the initial judgement.

For each candidate, the reviewer records:
- Would someone choose to read this, and what useful decision could it change?
- Separate usefulness and appeal assessments with reasons.
- Whether the evidence route and scope are credible; exact unchecked assumptions.
- Duplicate or overlap concerns and what would make the proposal materially stronger.
- Develop, revise, park or reject, plus a justified proposed order.

Use the same PR and record the exact reviewed commit and actual checks. Never label an author screen independent or invent a reviewer score. Missing independent review leaves a candidate proposed, not ready. Consolidate disagreements and corrections in the same PR; after at most two correction rounds, park unresolved candidates rather than lower standards.

## Select and maintain

After independent challenge, reconcile the shortlist and record the final order, reasons for changes and any unresolved minor limitations. Candidate disposition and review history live in the dated brief for this trial; queue statuses remain compatible with existing tooling.

Choose one reviewed, sufficiently scoped candidate for research and drafting. Record why it beats the alternatives, who is working on it and the branch/PR. Keep at most one active new-article commission during this pilot; an urgent correction can interrupt it. Refresh the provisional ordering when evidence, feedback or completion makes it stale, without rewriting history.

Idea readiness means worth developing. It does not approve advice, certify an article score, create a release review record or authorise publication. Full research, independent source/content review, the 9+ whole-article target, visual checks and existing exact-content publication safeguards still apply.

## Trial completion

Use the first shortlist to test whether independent review changes hooks, exclusions or ordering in useful ways. Record accepted/revised/parked counts and the reason for selecting the first article. Refine this lightweight process from the actual results before considering automation. No changes to Five Minutes are part of this work.
