// Builds a throwaway copy of the site in which every article has a placeholder
// main image, then checks the page and share metadata on an article and the home page.
import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import zlib from 'node:zlib';
import {spawnSync} from 'node:child_process';
import {imageSize} from '../scripts/image-size.mjs';

const root=process.cwd();
const origin='https://pearls.example';
function png(width,height){
  const crc=(buf)=>{let c=~0;for(const byte of buf){c^=byte;for(let k=0;k<8;k++)c=(c>>>1)^(0xedb88320&-(c&1));}return ~c>>>0;};
  const chunk=(type,data)=>{const t=Buffer.from(type);const len=Buffer.alloc(4);len.writeUInt32BE(data.length);const sum=Buffer.alloc(4);sum.writeUInt32BE(crc(Buffer.concat([t,data])));return Buffer.concat([len,t,data,sum]);};
  const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(width,0);ihdr.writeUInt32BE(height,4);ihdr[8]=8;ihdr[9]=2;
  const row=Buffer.concat([Buffer.from([0]),Buffer.alloc(width*3,200)]);
  return Buffer.concat([Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]),chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(Buffer.concat(Array(height).fill(row)))),chunk('IEND',Buffer.alloc(0))]);
}
function siteCopy(){
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pearls-main-image-'));
  for(const item of ['src','public','scripts','editorial','astro.config.mjs','package.json','tsconfig.json'])fs.cpSync(path.join(root,item),path.join(dir,item),{recursive:true});
  fs.symlinkSync(path.join(root,'node_modules'),path.join(dir,'node_modules'),'dir');
  return dir;
}
function addMainImage(dir,size){
  fs.writeFileSync(path.join(dir,'public/figures/fixture-main.png'),png(...size));
  const articles=path.join(dir,'src/content/articles');
  for(const file of fs.readdirSync(articles).filter(f=>f.endsWith('.yaml'))){
    const p=path.join(articles,file);const a=JSON.parse(fs.readFileSync(p,'utf8'));
    a.mainImage={src:'/figures/fixture-main.png',shareSrc:'/figures/fixture-main.png',alt:'Fixture main image'};
    fs.writeFileSync(p,JSON.stringify(a,null,2));
  }
}
const run=(dir,args)=>spawnSync(process.execPath,args,{cwd:dir,encoding:'utf8',env:{...process.env,SITE_URL:origin,RELEASE:''}});
const meta=(html,attr,name)=>html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];

test('image size reader handles PNG and the WebP figures',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pearls-size-'));const file=path.join(dir,'x.png');fs.writeFileSync(file,png(1200,630));
  assert.deepEqual(imageSize(file),{width:1200,height:630});fs.rmSync(dir,{recursive:true,force:true});
  assert.deepEqual(imageSize(path.join(root,'public/figures/exercise-moving-v2.webp')),{width:600,height:600});
});

test('content check rejects a main image that is not 1200x630',()=>{
  const dir=siteCopy();addMainImage(dir,[800,600]);
  const result=run(dir,['scripts/validate-content.mjs']);
  assert.notEqual(result.status,0);assert.match(result.stderr,/must be 1200x630/);
  fs.rmSync(dir,{recursive:true,force:true});
});

test('article and home page publish the main image and share metadata',{timeout:180000},()=>{
  const dir=siteCopy();addMainImage(dir,[1200,630]);
  assert.equal(run(dir,['scripts/validate-content.mjs']).status,0);
  const build=run(dir,['node_modules/astro/bin/astro.mjs','build']);
  assert.equal(build.status,0,build.stderr);
  const shareUrl=`${origin}/figures/fixture-main.png`;
  const article=fs.readFileSync(path.join(dir,'dist/articles/exercise-foundations-after-65/index.html'),'utf8');
  assert.match(article,/<img class="article-main-image" src="\/figures\/fixture-main.png" alt="Fixture main image" width="1200" height="630"/);
  assert.equal(meta(article,'property','og:image'),shareUrl);
  assert.equal(meta(article,'property','og:image:alt'),'Fixture main image');
  assert.equal(meta(article,'property','og:type'),'article');
  assert.equal(meta(article,'name','twitter:card'),'summary_large_image');
  assert.match(article,/"image":"https:\/\/pearls.example\/figures\/fixture-main.png"/);
  const home=fs.readFileSync(path.join(dir,'dist/index.html'),'utf8');
  assert.equal(meta(home,'property','og:image'),shareUrl);
  assert.equal(meta(home,'property','og:type'),'website');
  assert.equal(meta(home,'name','twitter:card'),'summary_large_image');
  assert.doesNotMatch(home,/application\/ld\+json/);
  fs.rmSync(dir,{recursive:true,force:true});
});
