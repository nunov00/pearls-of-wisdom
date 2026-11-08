import { parse } from 'yaml';
import { readWeeklyLedger } from './release-weekly-ledger.mjs';
import { validateWeeklyRelease } from './release-weekly-policy.mjs';

const ledgerIssue = 58;
const checkName = 'Weekly release evidence';
const recordPaths = ['editorial/publications.json', 'editorial/reviews.json'];
const sha = /^[a-f0-9]{40}$/;

export async function checkWeeklyPullRequest({ github, context, core, trustedBase }) {
  const { owner, repo } = context.repo;
  const repoArgs = { owner, repo };
  const number = context.payload.pull_request?.number ?? context.payload.issue?.number;
  const { data: pr } = await github.rest.pulls.get({ ...repoArgs, pull_number: number });
  if (pr.state !== 'open' || pr.base.ref !== 'main' || pr.head.repo?.full_name !== owner + '/' + repo) return;

  const head = pr.head.sha;
  const externalId = 'pearls-weekly:' + number + ':' + head;
  async function publish(conclusion, summary) {
    const checks = await github.paginate(github.rest.checks.listForRef, {
      ...repoArgs, ref: head, check_name: checkName, filter: 'all',
    });
    const existing = checks.find((check) => check.app?.slug === 'github-actions' && check.external_id === externalId);
    const result = { ...repoArgs, status: 'completed', conclusion, output: { title: checkName, summary } };
    if (existing) await github.rest.checks.update({ ...result, check_run_id: existing.id });
    else await github.rest.checks.create({ ...result, name: checkName, head_sha: head, external_id: externalId });
  }

  async function readFile(path, ref) {
    const { data } = await github.rest.repos.getContent({ ...repoArgs, path, ref });
    if (data.type !== 'file') throw new Error('Expected a Git file at ' + path);
    if (data.encoding === 'base64' && data.content) return Buffer.from(data.content, 'base64');
    const blob = await github.rest.git.getBlob({ ...repoArgs, file_sha: data.sha });
    if (blob.data.encoding !== 'base64') throw new Error('Cannot read exact Git bytes');
    return Buffer.from(blob.data.content, 'base64');
  }
  const readJson = async (path, ref) => JSON.parse((await readFile(path, ref)).toString('utf8'));
  const readRecords = async (ref) => {
    const [publications, reviews] = await Promise.all(recordPaths.map((path) => readJson(path, ref)));
    return { publications, reviews };
  };

  async function changedPaths(base) {
    const { data } = await github.rest.repos.compareCommitsWithBasehead({ ...repoArgs, basehead: base + '...' + head });
    if (data.status !== 'ahead' || !Array.isArray(data.files) || data.files.length >= 300 ||
        data.files.some((file) => file.previous_filename)) throw new Error('Cannot verify complete forward-only diff');
    return data.files.map(({ filename }) => filename);
  }

  let summary;
  try {
    const comments = await github.paginate(github.rest.issues.listComments, { ...repoArgs, issue_number: ledgerIssue });
    const entries = readWeeklyLedger(comments, owner);
    const requests = entries.filter((entry) => entry.type === 'review-request' && entry.pr === number);
    if (!pr.head.ref.startsWith('weekly-article/') && !requests.length) {
      if (!sha.test(trustedBase) || pr.base.sha !== trustedBase) throw new Error('Trusted base moved');
      const paths = await changedPaths(trustedBase);
      if (paths.some((path) => recordPaths.includes(path))) throw new Error('Manual release routing is pending; do not require this check yet');
      summary = 'No weekly release or release-record changes';
    } else {
      if (!sha.test(trustedBase) || pr.base.sha !== trustedBase) throw new Error('Trusted base moved');
      const request = requests.at(-1);
      const candidate = request?.candidate;
      if (!candidate || typeof candidate.head !== 'string' || !sha.test(candidate.head) ||
          !candidate.paths || !Object.values(candidate.paths).every((path) => typeof path === 'string' && !path.includes('..'))) {
        throw new Error('Missing or invalid weekly review request');
      }
      const receipts = entries.filter((entry) => entry.type === 'receipt' && entry.pr === number &&
        entry.requestId === request.commentId && entry.commentId > request.commentId);
      if (receipts.length !== 2 || receipts.some(({ runId }) => typeof runId !== 'string' || !runId.trim()) ||
          receipts[0].runId === receipts[1].runId) throw new Error('Two distinct recorded provider runs required');

      const approval = new RegExp('^APPROVED · reviewer: Claude \\(Anthropic\\) · author: Codex \\(OpenAI\\) · commit ' + head + '\\s*$', 'm');
      const prComments = await github.paginate(github.rest.issues.listComments, { ...repoArgs, issue_number: number });
      if (!prComments.some((comment) => comment.user?.login === owner && comment.created_at &&
          comment.created_at === comment.updated_at && approval.test(comment.body ?? ''))) {
        throw new Error('Claude exact-head technical approval required');
      }

      const allowed = new Set([...recordPaths, ...Object.values(candidate.paths)]);
      if ((await changedPaths(trustedBase)).some((path) => !allowed.has(path))) throw new Error('Unexpected weekly PR changes');
      const afterReview = await changedPaths(candidate.head);
      const bytes = Object.fromEntries(await Promise.all(Object.entries(candidate.paths).map(async ([asset, path]) =>
        [asset, await readFile(path, head)])));
      const records = await readRecords(head);
      const baseRecords = await readRecords(trustedBase);
      const directory = await github.rest.repos.getContent({ ...repoArgs, path: 'src/content/articles', ref: head });
      if (!Array.isArray(directory.data)) throw new Error('Article directory unavailable');
      const articles = [];
      const bytesById = Object.create(null);
      for (const { path } of directory.data.filter(({ name }) => name.endsWith('.yaml'))) {
        const source = await readFile(path, head);
        const article = parse(source.toString('utf8'));
        if (Object.hasOwn(bytesById, article.id)) throw new Error('Duplicate article identity');
        articles.push(article);
        bytesById[article.id] = source;
      }
      const articlePath = directory.data.find(({ path }) =>
        path === candidate.paths.article && bytesById[candidate.articleId]?.equals(bytes.article))?.path;
      const releaseSlot = { stage: 'release', cycle: candidate.cycle, date: candidate.publishedAt };
      validateWeeklyRelease({ candidate, releaseSlot, bytes, receipts }, {
        ...records, articles, bytesById,
      }, articlePath, baseRecords, afterReview);
      summary = 'Verified exact-head editorial evidence and final release records';
    }
    await publish('success', summary);
  } catch (error) {
    await publish('failure', 'Weekly release verification failed. See the workflow run.');
    core.setFailed(error.message);
  }
}
