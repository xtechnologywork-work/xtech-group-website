const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, 'public/assets/xtech-branding.png');
const outDir = path.join(__dirname, 'public/assets');

async function crop() {
  // 1. Symbol 3D Icon only (transparent background or crisp black background)
  await sharp(src)
    .extract({ left: 300, top: 155, width: 424, height: 265 })
    .toFile(path.join(outDir, 'x-symbol-3d.png'));

  // 2. Full Main Hero Lockup (3D X + XTECHNOLOGY + Tagline)
  await sharp(src)
    .extract({ left: 110, top: 150, width: 804, height: 385 })
    .toFile(path.join(outDir, 'xtech-hero-lockup.png'));

  // 3. Horizontal Lockup (X | XTECHNOLOGY \n TECH SOLUTIONS FOR A SMARTER TOMORROW)
  await sharp(src)
    .extract({ left: 320, top: 630, width: 360, height: 145 })
    .toFile(path.join(outDir, 'xtech-horizontal-lockup.png'));

  // 4. App Icon (rounded square badge)
  await sharp(src)
    .extract({ left: 740, top: 615, width: 175, height: 175 })
    .toFile(path.join(outDir, 'xtech-app-icon.png'));

  // 5. Vertical Lockup (X above XTECHNOLOGY)
  await sharp(src)
    .extract({ left: 45, top: 630, width: 265, height: 145 })
    .toFile(path.join(outDir, 'xtech-vertical-lockup.png'));

  // 6. Underline Lockup (X TECHNOLOGY with blue line)
  await sharp(src)
    .extract({ left: 40, top: 820, width: 285, height: 110 })
    .toFile(path.join(outDir, 'xtech-underline-lockup.png'));

  // 7. Wireframe / Blueprint Lockup (outline X)
  await sharp(src)
    .extract({ left: 370, top: 800, width: 260, height: 140 })
    .toFile(path.join(outDir, 'xtech-wireframe-lockup.png'));

  // 8. Flat Vector Lockup (flat X | XTECHNOLOGY)
  await sharp(src)
    .extract({ left: 685, top: 820, width: 295, height: 110 })
    .toFile(path.join(outDir, 'xtech-flat-lockup.png'));

  console.log('All 8 XTECH logo assets updated with optimal margins!');
}

crop().catch(console.error);
