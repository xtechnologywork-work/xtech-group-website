const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, 'public/assets/xtech-branding.png');
const outDir = path.join(__dirname, 'public/assets');

async function makeAppSquircle() {
  const cropLeft = 786;
  const cropTop = 659;
  const cropW = 124;
  const cropH = 121;

  const cropped = await sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .toBuffer();

  // Create perfectly fitted squircle mask with corner radius 26px
  const mask = Buffer.from(
    `<svg width="${cropW}" height="${cropH}">
       <rect x="0" y="0" width="${cropW}" height="${cropH}" rx="26" ry="26" fill="#FFFFFF" />
     </svg>`
  );

  await sharp(cropped)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile(path.join(outDir, 'xtech-app-icon.png'));

  console.log('✓ xtech-app-icon.png perfectly clipped to squircle boundary!');
}

makeAppSquircle().catch(console.error);
