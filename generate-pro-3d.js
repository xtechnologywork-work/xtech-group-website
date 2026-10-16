const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, 'public/assets/xtech-branding.png');
const outDir = path.join(__dirname, 'public/assets');

// Check if a point (x,y) is inside a polygon
function pointInPolygon(x, y, vs) {
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Distance from point to line segment
function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

// Min distance from point to polygon boundary
function distToPolygonBoundary(px, py, vs) {
  let minDist = Infinity;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const d = distToSegment(px, py, vs[i][0], vs[i][1], vs[j][0], vs[j][1]);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

async function generatePro3D() {
  const cropLeft = 345;
  const cropTop = 195;
  const cropW = 325;
  const cropH = 220;

  const { data, info } = await sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Polygons relative to cropLeft, cropTop
  // 1. Main Diagonal (from top-left to bottom-right)
  const mainPoly = [
    [362 - cropLeft, 207 - cropTop],
    [452 - cropLeft, 207 - cropTop],
    [654 - cropLeft, 399 - cropTop],
    [564 - cropLeft, 399 - cropTop]
  ];

  // 2. Lower-Left Arm
  const lowerPoly = [
    [362 - cropLeft, 399 - cropTop],
    [452 - cropLeft, 399 - cropTop],
    [495 - cropLeft, 345 - cropTop],
    [448 - cropLeft, 283 - cropTop],
    [402 - cropLeft, 345 - cropTop]
  ];

  // 3. Upper-Right Blue Wing
  const bluePoly = [
    [524 - cropLeft, 260 - cropTop],
    [570 - cropLeft, 322 - cropTop],
    [654 - cropLeft, 207 - cropTop],
    [573 - cropLeft, 207 - cropTop]
  ];

  const polys = [mainPoly, lowerPoly, bluePoly];
  const outBuf = Buffer.alloc(cropW * cropH * 4);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const idx = (y * cropW + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      let isInside = false;
      let minEdgeDist = Infinity;

      for (const poly of polys) {
        if (pointInPolygon(x, y, poly)) {
          isInside = true;
          const d = distToPolygonBoundary(x, y, poly);
          if (d < minEdgeDist) minEdgeDist = d;
        } else {
          const d = distToPolygonBoundary(x, y, poly);
          if (d < minEdgeDist) minEdgeDist = d;
        }
      }

      if (isInside) {
        // Soft antialiased interior edge
        const edgeAlpha = Math.min(1.0, minEdgeDist + 0.5);
        outBuf[idx] = r;
        outBuf[idx + 1] = g;
        outBuf[idx + 2] = b;
        outBuf[idx + 3] = Math.round(edgeAlpha * 255);
      } else if (minEdgeDist < 1.2) {
        // Sub-pixel antialiased boundary
        const edgeAlpha = Math.max(0, 1.2 - minEdgeDist) / 1.2;
        outBuf[idx] = r;
        outBuf[idx + 1] = g;
        outBuf[idx + 2] = b;
        outBuf[idx + 3] = Math.round(edgeAlpha * 180);
      } else {
        // Check if it's the radiant blue neon glow near the top-right wing
        const distToBlueTop = Math.hypot(x - (615 - cropLeft), y - (207 - cropTop));
        if (distToBlueTop < 30 && b > 40 && b > r * 1.5) {
          const glowAlpha = Math.max(0, (30 - distToBlueTop) / 30) * 0.7;
          outBuf[idx] = r;
          outBuf[idx + 1] = g;
          outBuf[idx + 2] = b;
          outBuf[idx + 3] = Math.round(glowAlpha * 255);
        } else {
          // Pure transparent background
          outBuf[idx] = 0;
          outBuf[idx + 1] = 0;
          outBuf[idx + 2] = 0;
          outBuf[idx + 3] = 0;
        }
      }
    }
  }

  await sharp(outBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'x-symbol-3d.png'));

  console.log('✓ x-symbol-3d.png PERFECTLY GENERATED WITH MATHEMATICAL ANTIALIASED POLYGON CLIPPING!');
}

generatePro3D().catch(console.error);
