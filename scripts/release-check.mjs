import fs from 'node:fs';import {parse} from 'yaml';
import {allArticles,zurichDate} from '../src/lib/catalogue.ts';import {validateRelease} from './release-policy.mjs';
const files=fs.readdirSync('src/content/articles').filter(f=>f.endsWith('.yaml'));const bytesById={};
for(const f of files){const bytes=fs.readFileSync('src/content/articles/'+f);bytesById[parse(bytes.toString()).id]=bytes;}
validateRelease({articles:allArticles(),publications:JSON.parse(fs.readFileSync('editorial/publications.json')),reviews:JSON.parse(fs.readFileSync('editorial/reviews.json')),bytesById,today:zurichDate()});
console.log('Content release records verified. This command does not deploy or merge.');
