const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const src = path.join(root, 'images', 'Icon.jpg');
const outDir = path.join(root, 'images');

const targets = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 192, name: 'icon-192.webp', webp: true },
  { size: 512, name: 'icon-512.webp', webp: true }
];

(async function(){
  if (!fs.existsSync(src)) {
    console.error('Source icon not found:', src);
    process.exit(2);
  }

  for (const t of targets) {
    const out = path.join(outDir, t.name);
    try {
      let s = sharp(src).resize(t.size, t.size, { fit: 'cover' });
      if (t.webp) {
        await s.webp({ quality: 85 }).toFile(out);
      } else {
        await s.png({ quality: 90 }).toFile(out);
      }
      console.log('created', out);
    } catch (err) {
      console.error('failed to create', out, err.message || err);
    }
  }
})();
