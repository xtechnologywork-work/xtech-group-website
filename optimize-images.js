/**
 * Generates right-sized WebP derivatives for every image rendered on the page.
 * Run: node optimize-images.js
 */
const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, 'public/assets');

const jobs = [
  // XTECH emblem: nav (28px), footer (44px), hub (76px), hero (130px) -> 2x density targets
  { src: 'xtech-hero-logo.png', out: 'xtech-logo-96.webp', height: 96 },
  { src: 'xtech-hero-logo.png', out: 'xtech-logo-280.webp', height: 280 },
  { src: 'xtech-hero-logo.png', out: 'favicon-64.png', height: 64, png: true },
  // Product logos (displayed ~200x75 / 95x95) -> 2x
  { src: 'product-walae-white.png', out: 'product-walae.webp', width: 440 },
  { src: 'product-flexchange-white.png', out: 'product-flexchange.webp', width: 400 },
  { src: 'product-baqala.jpg', out: 'product-baqala.webp', width: 200, height: 200 },
];

(async () => {
  for (const j of jobs) {
    let img = sharp(path.join(dir, j.src)).resize({
      width: j.width,
      height: j.height,
      fit: j.width && j.height ? 'cover' : 'inside',
      withoutEnlargement: true,
    });
    img = j.png
      ? img.png({ compressionLevel: 9, palette: true })
      : img.webp({ quality: 82, alphaQuality: 90, effort: 6 });
    const info = await img.toFile(path.join(dir, j.out));
    console.log(`${j.out.padEnd(26)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
  }
})();
