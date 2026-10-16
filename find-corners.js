const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, 'public/assets/xtech-branding.png');

async function findCorners() {
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });

  function getPixel(x, y) {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  // Scan row by row around y = 180..220 to find top horizontal cuts
  console.log('--- SCANNING TOP CUTS (y ~ 190) ---');
  for (let y = 185; y <= 210; y += 5) {
    let rowPixels = [];
    for (let x = 300; x <= 720; x++) {
      const [r, g, b] = getPixel(x, y);
      if (Math.max(r, g, b) > 50) {
        rowPixels.push(x);
      }
    }
    if (rowPixels.length > 0) {
      console.log(`y=${y}: minX=${Math.min(...rowPixels)}, maxX=${Math.max(...rowPixels)}, count=${rowPixels.length}`);
    }
  }

  // Scan bottom cuts around y = 390..430
  console.log('--- SCANNING BOTTOM CUTS (y ~ 410) ---');
  for (let y = 395; y <= 425; y += 5) {
    let rowPixels = [];
    for (let x = 300; x <= 720; x++) {
      const [r, g, b] = getPixel(x, y);
      if (Math.max(r, g, b) > 50) {
        rowPixels.push(x);
      }
    }
    if (rowPixels.length > 0) {
      console.log(`y=${y}: minX=${Math.min(...rowPixels)}, maxX=${Math.max(...rowPixels)}, count=${rowPixels.length}`);
    }
  }
}

findCorners().catch(console.error);
