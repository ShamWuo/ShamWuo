const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'assets', 'images');
const files = ['p1-thumb.svg','p2-thumb.svg','p3-thumb.svg'];

(async function(){
  for (const f of files) {
    const src = path.join(srcDir, f);
    const base = path.basename(f, path.extname(f));
    const outWebp = path.join(srcDir, `${base}.webp`);
    const outPng = path.join(srcDir, `${base}.png`);
    if (!fs.existsSync(src)) { console.warn('missing', src); continue; }
    try {
      const buffer = fs.readFileSync(src);
      // Convert SVG to PNG 2x (retina) for crispness
      await sharp(buffer).resize(480, 320, { fit: 'contain' }).png({ quality: 90 }).toFile(outPng);
      await sharp(buffer).resize(480, 320, { fit: 'contain' }).webp({ quality: 80 }).toFile(outWebp);
      console.log('created', outPng, outWebp);
    } catch (err) {
      console.error('failed', f, err);
    }
  }
})();
