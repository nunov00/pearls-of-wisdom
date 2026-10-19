# Content and records

The executable schema is `src/lib/schema.ts`. Articles have immutable IDs; slugs should stay stable. Dates use ISO calendar days displayed in British English. Daily selection uses Europe/Zurich. Drafts have null publication/revision dates. Meaningful revision requires history and never changes the first publication date.

Recommendations reference claim IDs. Claims reference source IDs and disclose basis and informal evidence strength. Summary cards reference every recommendation exactly once. The parser rejects unknown fields, invalid IDs/dates/URLs, HTML, duplicate identifiers, missing evidence references and unsupported additional recommendations.

Queue: `editorial/queue.json`. At least ten candidates with title, description, category, usefulness, estimated audience interest, practical impact, preliminary evidence, priority, status and history. Current estimates are qualitative, not analytics. `npm run backlog -- article-id reason` changes queue status only and does not silently unpublish or reset dates.

Publication and review records are separate from article prose. A publication record has articleId, state (published or withdrawn), original publishedAt, reviewId and optional withdrawalReason. A review has id, articleId, author/reviewer execution identities, reviewedCommit, articleSha256, correctionRounds, decision and findings. Reviewers create truthful records only after performing the review; never paste invented values from an example. The code verifies structure, distinct declared identities, content integrity and significant findings. It cannot establish whether a purported reviewer actually performed the work; repository permissions and honest review remain necessary.

No social distribution records are implemented. Summary data is ready for future caption/card generation without rewriting articles.
