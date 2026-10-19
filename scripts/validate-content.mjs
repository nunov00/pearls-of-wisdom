import {allArticles} from '../src/lib/catalogue.ts';
import fs from 'node:fs';
const articles=allArticles();
for(const a of articles)if(a.figure){const file='public'+a.figure.src;if(!fs.existsSync(file))throw new Error('Missing figure '+file);if(file.endsWith('.svg')){const svg=fs.readFileSync(file,'utf8');if(/<script|<foreignObject|on[a-z]+\s*=|(?:href|src)\s*=\s*["'](?!#)|url\s*\(|<!ENTITY/i.test(svg))throw new Error('Unsafe SVG '+file);}}

const queue=JSON.parse(fs.readFileSync('editorial/queue.json','utf8'));
const automation=JSON.parse(fs.readFileSync('editorial/automation.json','utf8'));
if(automation.enabled!==false||automation.mode!=='manual-only')throw new Error('Recurring automation is not authorised');
if(queue.length<10)throw new Error('Maintain at least ten candidates');
for(const key of ['id','priority'])if(new Set(queue.map(q=>q[key])).size!==queue.length)throw new Error(`Duplicate queue ${key}`);
for(const q of queue){for(const key of ['title','description','category','usefulness','audienceInterest','practicalImpact','preliminaryEvidence','status'])if(!q[key])throw new Error(`Missing queue ${key}`);if(!Array.isArray(q.history)||!q.history.length)throw new Error('Missing queue history');if(q.articleId&&!articles.some(a=>a.id===q.articleId))throw new Error('Unknown queue article');}
if(process.env.RELEASE==='1'){await import('./release-check.mjs');}
console.log(`Validated ${articles.length} article drafts and ${queue.length} queue entries; automation disabled.`);
