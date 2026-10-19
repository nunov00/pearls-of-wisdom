import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { articleSchema, type Article } from './schema.ts';
export const projectRoot=process.cwd();
export function allArticles():Article[]{
 const dir=path.join(projectRoot,'src/content/articles');
 const articles=fs.readdirSync(dir).filter(p=>p.endsWith('.yaml')).map(p=>articleSchema.parse(parse(fs.readFileSync(path.join(dir,p),'utf8'))));
 for(const field of ['id','slug'] as const)if(new Set(articles.map(a=>a[field])).size!==articles.length)throw new Error(`Duplicate article ${field}`);
 const ids=new Set(articles.map(a=>a.id));
 for(const a of articles)for(const id of a.relatedIds)if(!ids.has(id)||id===a.id)throw new Error(`Invalid related article ${id}`);
 return articles;
}
export function zurichDate(now=new Date()):string{return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Zurich',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
export function eligible(a:Article, records:any[],today=zurichDate()):boolean {
 const record=records.find(r=>r.articleId===a.id);
 return !!(a.publishedAt && a.publishedAt<=today && record?.state==='published' && record.publishedAt===a.publishedAt);
}
export function visibleArticles():Article[]{
 const articles=allArticles();
 if(process.env.RELEASE!=='1')return articles.sort((a,b)=>a.id.localeCompare(b.id));
 const records=JSON.parse(fs.readFileSync(path.join(projectRoot,'editorial/publications.json'),'utf8'));
 return articles.filter(a=>eligible(a,records)).sort((a,b)=>(b.publishedAt??'').localeCompare(a.publishedAt??'')||a.id.localeCompare(b.id));
}
export function formatDate(value:string|null){return value?new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(value+'T12:00:00Z')):'Editorial preview';}
export function categorySlug(value:string){return value.toLowerCase().replaceAll(' ','-');}

export function withdrawnArticles():Article[]{
 if(process.env.RELEASE!=='1')return [];
 const records=JSON.parse(fs.readFileSync(path.join(projectRoot,'editorial/publications.json'),'utf8'));
 return allArticles().filter(a=>records.some((r:any)=>r.articleId===a.id&&r.state==='withdrawn'));
}
export function withdrawalReason(id:string):string{
 const records=JSON.parse(fs.readFileSync(path.join(projectRoot,'editorial/publications.json'),'utf8'));
 return records.find((r:any)=>r.articleId===id&&r.state==='withdrawn')?.withdrawalReason||'This article is being corrected. Its previous advice is temporarily unavailable.';
}
