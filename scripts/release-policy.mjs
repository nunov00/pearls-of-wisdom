import {createHash} from 'node:crypto';
export const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
export function validateRelease({articles,publications,reviews,bytesById,today}){
 const ids=new Set();
 for(const p of publications){
  if(ids.has(p.articleId))throw new Error('Duplicate publication record');ids.add(p.articleId);
  if(!['published','withdrawn'].includes(p.state))throw new Error('Invalid publication state');
  const a=articles.find(a=>a.id===p.articleId);if(!a)throw new Error('Unknown publication article');
  if(p.state==='withdrawn')continue;
  if(!a.publishedAt||a.publishedAt!==p.publishedAt||a.publishedAt>today)throw new Error('Missing, future or inconsistent publication date');
  const review=reviews.find(r=>r.id===p.reviewId);
  if(!review||review.articleId!==a.id||review.decision!=='ready')throw new Error('Independent review required');
  if(!review.author||!review.reviewer||review.author===review.reviewer)throw new Error('Self-review cannot authorise publication');
  if(!/^[a-f0-9]{40}$/.test(review.reviewedCommit??''))throw new Error('Reviewed Git commit required');
  if(!Number.isInteger(review.correctionRounds)||review.correctionRounds<0||review.correctionRounds>2)throw new Error('Invalid correction count');
  if(!Array.isArray(review.findings)||review.findings.some(f=>!['blocker','important','minor'].includes(f.severity)||!['open','resolved'].includes(f.status)||(f.severity!=='minor'&&f.status!=='resolved')))throw new Error('Unresolved or invalid review findings');
  if(review.articleSha256!==digest(bytesById[a.id]))throw new Error('Article changed after review');
  const cited=new Set(a.claims.flatMap(c=>c.sourceIds));
  if(a.sources.some(s=>cited.has(s.id)&&s.access!=='checked'))throw new Error('Material evidence is not fully checked');
 }
 if(!publications.some(p=>p.state==='published'))throw new Error('No reviewed articles selected for release');
 return true;
}
