import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('dist');let count=0;const pages=[];
function visit(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,f.name);if(f.isDirectory())visit(p);else{count++;if(fs.statSync(p).size>25*1024*1024)throw new Error('Oversize static asset');if(p.endsWith('.html'))pages.push(p);}}}visit(root);
if(count>16000)throw new Error('Static file count needs capacity review');
for(const file of pages){const html=fs.readFileSync(file,'utf8');if((html.match(/<h1\b/g)||[]).length!==1)throw new Error('Expected one H1: '+file);if(!html.includes('lang="en-GB"'))throw new Error('Missing language');
 for(const match of html.matchAll(/(?:href|src)="([^"?#]*)(?:[?#][^"]*)?"/g)){const href=match[1];if(!href||/^(https?:|data:|mailto:)/.test(href))continue;const resolved=path.resolve(href.startsWith('/')?root:path.dirname(file),href.startsWith('/')?'.'+href:href);if(!resolved.startsWith(root+path.sep)&&resolved!==root)throw new Error('Unsafe internal path');if(!fs.existsSync(resolved)&&!fs.existsSync(path.join(resolved,'index.html')))throw new Error(`Broken internal link ${href} in ${file}`);}
 if(process.env.RELEASE!=='1'&&!html.includes('noindex,nofollow'))throw new Error('Preview must be noindex');
}
console.log(`Verified ${pages.length} HTML pages and ${count} static files; internal links resolve.`);
