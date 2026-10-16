const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, 'public/assets/xtech-branding.png');
const outDir = path.join(__dirname, 'public/assets');

/**
 * Ultra-clean background removal with thresholding and edge decontamination
 */
async function cleanTransparent(buffer, minLuma = 18, ramp = 20, brightenText = true) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const output = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Perceived luminance
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    const maxVal = Math.max(r, g, b);

    if (maxVal < minLuma) {
      // Complete background
      output[i] = 0;
      output[i + 1] = 0;
      output[i + 2] = 0;
      output[i + 3] = 0;
    } else if (maxVal < minLuma + ramp) {
      // Soft antialiased edge
      const alpha = (maxVal - minLuma) / ramp;
      output[i] = r;
      output[i + 1] = g;
      output[i + 2] = b;
      output[i + 3] = Math.round(alpha * 255);
    } else {
      // Full solid object
      if (brightenText && r === g && g === b && r > 40) {
        // Brighten silver/grey text to crisp platinum white
        const boost = Math.min(255, Math.round(r * 1.5 + 40));
        output[i] = boost;
        output[i + 1] = boost;
        output[i + 2] = boost;
      } else {
        output[i] = r;
        output[i + 1] = g;
        output[i + 2] = b;
      }
      output[i + 3] = 255;
    }
  }

  return sharp(output, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  }).png();
}

async function run() {
  console.log('Generating ultra-clean transparent logo assets...');

  // 1. Symbol 3D Icon only
  const symBuf = await sharp(src)
    .extract({ left: 295, top: 150, width: 430, height: 275 })
    .toBuffer();
  await (await cleanTransparent(symBuf, 22, 18, false))
    .toFile(path.join(outDir, 'x-symbol-3d.png'));
  console.log('✓ x-symbol-3d.png');

  // 2. Full Main Hero Lockup (3D X + XTECHNOLOGY + Tagline)
  const heroBuf = await sharp(src)
    .extract({ left: 110, top: 150, width: 804, height: 385 })
    .toBuffer();
  await (await cleanTransparent(heroBuf, 20, 16, true))
    .toFile(path.join(outDir, 'xtech-hero-lockup.png'));
  console.log('✓ xtech-hero-lockup.png');

  // 3. Horizontal Lockup
  const horizBuf = await sharp(src)
    .extract({ left: 320, top: 630, width: 360, height: 145 })
    .toBuffer();
  await (await cleanTransparent(horizBuf, 18, 14, true))
    .toFile(path.join(outDir, 'xtech-horizontal-lockup.png'));
  console.log('✓ xtech-horizontal-lockup.png');

  // 4. Vertical Lockup
  const vertBuf = await sharp(src)
    .extract({ left: 45, top: 630, width: 265, height: 145 })
    .toBuffer();
  await (await cleanTransparent(vertBuf, 18, 14, true))
    .toFile(path.join(outDir, 'xtech-vertical-lockup.png'));
  console.log('✓ xtech-vertical-lockup.png');

  // 5. Underline Lockup
  const underBuf = await sharp(src)
    .extract({ left: 40, top: 820, width: 285, height: 110 })
    .toBuffer();
  await (await cleanTransparent(underBuf, 16, 12, true))
    .toFile(path.join(outDir, 'xtech-underline-lockup.png'));
  console.log('✓ xtech-underline-lockup.png');

  // 6. Wireframe Blueprint
  const wireBuf = await sharp(src)
    .extract({ left: 370, top: 800, width: 260, height: 140 })
    .toBuffer();
  await (await cleanTransparent(wireBuf, 16, 12, true))
    .toFile(path.join(outDir, 'xtech-wireframe-lockup.png'));
  console.log('✓ xtech-wireframe-lockup.png');

  // 7. Flat Vector Lockup
  const flatBuf = await sharp(src)
    .extract({ left: 685, top: 820, width: 295, height: 110 })
    .toBuffer();
  await (await cleanTransparent(flatBuf, 16, 12, true))
    .toFile(path.join(outDir, 'xtech-flat-lockup.png'));
  console.log('✓ xtech-flat-lockup.png');

  // 8. App Icon: Keep the dark squircle badge, remove surrounding rectangle
  // The squircle container has r,g,b > 15, background is pitch black < 10
  const appBuf = await sharp(src)
    .extract({ left: 740, top: 615, width: 175, height: 175 })
    .toBuffer();
  await (await cleanTransparent(appBuf, 10, 8, false))
    .toFile(path.join(outDir, 'xtech-app-icon.png'));
  console.log('✓ xtech-app-icon.png');

  console.log('ALL PRO TRANSPARENT LOGOS GENERATED SUCCESSFULLY!');
}

run().catch(console.error);
