import {execFileSync} from 'node:child_process';import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
const destination=path.resolve(process.argv[2]||'backups');fs.mkdirSync(destination,{recursive:true});
const out=path.join(destination,'pearls-source-'+new Date().toISOString().replaceAll(':','-')+'.tar.gz');
execFileSync('tar',['--exclude=./node_modules','--exclude=./dist','--exclude=./.astro','--exclude=./backups','--exclude=./.git','--exclude=.env*','--exclude=.dev.vars*','--exclude=.wrangler','--exclude=./playwright-report','--exclude=./test-results','--exclude=./.playwright','--exclude=pearls-source-*.tar.gz*','--exclude=*.log','-czf',out,'.'],{stdio:'pipe'});
fs.writeFileSync(out+'.sha256',createHash('sha256').update(fs.readFileSync(out)).digest('hex')+'  '+path.basename(out)+'\n');console.log(out);
