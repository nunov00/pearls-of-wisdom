import fs from 'node:fs';import {allArticles,zurichDate} from '../src/lib/catalogue.ts';
const [id,...words]=process.argv.slice(2);const reason=words.join(' ').trim();
if(!id||!reason)throw new Error('Usage: npm run backlog -- <article-id> <reason>');
const a=allArticles().find(a=>a.id===id);if(!a)throw new Error('Unknown article');
const path='editorial/queue.json';const queue=JSON.parse(fs.readFileSync(path,'utf8'));let q=queue.find(q=>q.articleId===id);
if(!q){q={id:'revision-'+id,title:a.title,description:a.description,category:a.category,usefulness:a.goal,audienceInterest:'unassessed',practicalImpact:'unassessed',preliminaryEvidence:'Recheck required',priority:Math.max(...queue.map(q=>q.priority))+1,type:'revision',status:'revision',articleId:id,history:[]};queue.push(q);}
q.type='revision';q.status='revision';q.history.push({date:zurichDate(),event:reason});
fs.writeFileSync(path,JSON.stringify(queue,null,2)+'\n');console.log(`Queued ${id} for revision. Publication visibility and dates unchanged.`);
