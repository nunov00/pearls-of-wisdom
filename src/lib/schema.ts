import { z } from 'zod';
export const categories = ['Health','Wellbeing','Finance','Learning','Productivity','Relationships','Parenting','Everyday life'] as const;
const text = z.string().trim().min(1).max(8000).refine(v=> !/[<>\u0000-\u0008]/.test(v),'HTML/control characters are not permitted');
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>!Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10)===v,'Invalid date');
const url = z.url().refine(v=>{ const u=new URL(v); return u.protocol==='https:' && !u.username && !u.password; },'Use HTTPS without credentials');
const claim = z.object({id,text,kind:z.enum(['benefit','consequence','qualification']),basis:z.enum(['guideline','causal','associative','editorial']),sourceIds:z.array(id).min(1),strength:z.enum(['strong','moderate','limited','consensus-based']),strengthRationale:text}).strict();
export const articleSchema=z.object({
 schemaVersion:z.literal(1), id,slug:id,title:text,description:text,category:z.enum(categories),keywords:z.array(text).min(1),goal:text,audience:text,assumptions:text,introduction:text,
 publishedAt:day.nullable(),revisedAt:day.nullable(),lastEvidenceCheckedAt:day,
 selection:z.object({basis:z.enum(['foundations','ranked']),rationale:text,alternatives:z.array(z.object({candidate:text,reason:text}).strict()).min(1),extraRationale:text.optional()}).strict(),
 recommendations:z.array(z.object({id,heading:text,whatToDo:text,whyItMatters:text,consequence:text,action:text,details:text,safety:text.optional(),claimIds:z.array(id).min(1)}).strict()).min(3),
 claims:z.array(claim).min(1),
 sources:z.array(z.object({id,title:text,organisation:text,url,checkedAt:day,access:z.enum(['checked','partial','unavailable']),section:text,support:text,limitations:text}).strict()).min(1),
 figure:z.object({src:z.string().regex(/^\/figures\/[a-z0-9-]+\.(svg|png|jpg|webp)$/),alt:text,caption:text,description:text}).strict().optional(),
 limitations:text,revisionHistory:z.array(z.object({date:day,reason:text}).strict()),relatedIds:z.array(id),summary:z.object({title:text,recommendationIds:z.array(id).min(3)}).strict()
}).strict().superRefine((a,ctx)=>{
 const issue=(message:string)=>ctx.addIssue({code:'custom',message});
 for(const [label,items] of [['recommendations',a.recommendations],['claims',a.claims],['sources',a.sources]] as const){if(new Set(items.map(x=>x.id)).size!==items.length)issue(`Duplicate ${label} ID`);}
 if(a.recommendations.length>3&&!a.selection.extraRationale)issue('Additional recommendations require a rationale');
 const cs=new Map(a.claims.map(x=>[x.id,x])),ss=new Map(a.sources.map(x=>[x.id,x]));
 for(const r of a.recommendations){
  for(const c of r.claimIds)if(!cs.has(c))issue(`Unknown claim ${c}`);
  if(!r.claimIds.some(c=>cs.get(c)?.kind==='benefit'))issue(`Missing benefit evidence for ${r.id}`);
  if(!r.claimIds.some(c=>cs.get(c)?.kind==='consequence'))issue(`Missing consequence evidence for ${r.id}`);
 }
 for(const c of a.claims)for(const s of c.sourceIds)if(!ss.has(s))issue(`Unknown source ${s}`);
 if(new Set(a.summary.recommendationIds).size!==a.recommendations.length||a.summary.recommendationIds.length!==a.recommendations.length||a.recommendations.some(r=>!a.summary.recommendationIds.includes(r.id)))issue('Summary must reference every recommendation once');
 if(a.revisedAt&&(!a.publishedAt||a.revisedAt<a.publishedAt))issue('Revision precedes publication');
 if(a.revisedAt&&!a.revisionHistory.some(r=>r.date===a.revisedAt))issue('Revision history missing');
 if(a.sources.some(s=>s.checkedAt>a.lastEvidenceCheckedAt))issue('Evidence check date inconsistent');
});
export type Article=z.infer<typeof articleSchema>;
