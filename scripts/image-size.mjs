// Reads the pixel size of a PNG, JPEG or WebP file from its header, without
// decoding it, so content checks need no image library.
import fs from 'node:fs';

export function imageSize(file){
  const b=fs.readFileSync(file);
  if(b.length>=24&&b.readUInt32BE(0)===0x89504e47&&b.toString('ascii',12,16)==='IHDR')return {width:b.readUInt32BE(16),height:b.readUInt32BE(20)};
  if(b.length>=30&&b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP'){
    const chunk=b.toString('ascii',12,16);
    if(chunk==='VP8X')return {width:1+b.readUIntLE(24,3),height:1+b.readUIntLE(27,3)};
    if(chunk==='VP8L'){const bits=b.readUInt32LE(21);return {width:1+(bits&0x3fff),height:1+((bits>>>14)&0x3fff)};}
    if(chunk==='VP8 ')return {width:b.readUInt16LE(26)&0x3fff,height:b.readUInt16LE(28)&0x3fff};
  }
  if(b.length>=4&&b[0]===0xff&&b[1]===0xd8){
    let i=2;
    while(i+9<b.length){
      if(b[i]!==0xff){i++;continue;}
      const marker=b[i+1];
      if(marker===0xff){i++;continue;}
      if(marker===0xd8||marker===0x01||(marker>=0xd0&&marker<=0xd7)){i+=2;continue;}
      const length=b.readUInt16BE(i+2);
      if(marker>=0xc0&&marker<=0xcf&&![0xc4,0xc8,0xcc].includes(marker))return {width:b.readUInt16BE(i+7),height:b.readUInt16BE(i+5)};
      i+=2+length;
    }
  }
  throw new Error(`Cannot read image size of ${file}`);
}
