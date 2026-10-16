const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public/assets');

// 1. Horizontal Brand Lockup SVG with XTECHNOLOGY GROUP QATAR
const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 120" width="100%" height="100%">
  <defs>
    <linearGradient id="hChromeMain" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#CBD5E1" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
    <linearGradient id="hBlueWing" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0052FF" />
      <stop offset="60%" stop-color="#0070F3" />
      <stop offset="100%" stop-color="#00E5FF" />
    </linearGradient>
    <filter id="hBlueGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Wireframe X Emblem on Left -->
  <g transform="translate(10, 15) scale(0.38)">
    <polygon points="50,230 115,230 150,185 110,135 75,180" fill="none" stroke="url(#hChromeMain)" stroke-width="4.5" />
    <polygon points="175,120 215,170 280,35 215,35" fill="none" stroke="url(#hBlueWing)" stroke-width="5" filter="url(#hBlueGlow)" />
    <polygon points="50,35 120,35 280,230 210,230" fill="none" stroke="url(#hChromeMain)" stroke-width="4.5" />
  </g>

  <!-- Vertical Divider Line -->
  <line x1="135" y1="20" x2="135" y2="100" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="1.5" />

  <!-- Typography Right -->
  <text x="160" y="52" font-family="'Archivo Black', sans-serif" font-size="24" font-weight="900" letter-spacing="0.06em" fill="#FFFFFF">
    XTECHNOLOGY GROUP
  </text>
  <text x="160" y="76" font-family="'Archivo Black', sans-serif" font-size="16" font-weight="900" letter-spacing="0.14em" fill="#1182FF">
    QATAR
  </text>
  <text x="162" y="98" font-family="'Space Mono', monospace" font-size="9.5" font-weight="700" letter-spacing="0.10em" fill="#94A3B8">
    TECH SOLUTIONS FOR A SMARTER TOMORROW
  </text>
</svg>`;

fs.writeFileSync(path.join(outDir, 'xtech-horizontal-lockup.svg'), horizontalSvg);
console.log('✓ xtech-horizontal-lockup.svg updated with XTECHNOLOGY GROUP QATAR');

// 2. Underline Lockup SVG with QATAR
const underlineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" width="100%" height="100%">
  <defs>
    <linearGradient id="uChrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
    <linearGradient id="uBlue" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0066FF" />
      <stop offset="100%" stop-color="#00E5FF" />
    </linearGradient>
    <filter id="uGlow" x="-10%" y="-30%" width="120%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Wireframe X -->
  <g transform="translate(10, 15) scale(0.3)">
    <polygon points="50,230 115,230 150,185 110,135 75,180" fill="none" stroke="url(#uChrome)" stroke-width="4.5" />
    <polygon points="175,120 215,170 280,35 215,35" fill="none" stroke="url(#uBlue)" stroke-width="5" />
    <polygon points="50,35 120,35 280,230 210,230" fill="none" stroke="url(#uChrome)" stroke-width="4.5" />
  </g>

  <!-- Typography -->
  <text x="115" y="48" font-family="'Archivo Black', sans-serif" font-size="22" font-weight="900" letter-spacing="0.12em" fill="#FFFFFF">
    XTECHNOLOGY GROUP
  </text>
  <text x="115" y="74" font-family="'Archivo Black', sans-serif" font-size="16" font-weight="900" letter-spacing="0.18em" fill="#00D2FF">
    QATAR
  </text>

  <!-- Glowing Blue Underline Accent -->
  <rect x="115" y="82" width="380" height="3" rx="1.5" fill="url(#uBlue)" filter="url(#uGlow)" />
</svg>`;

fs.writeFileSync(path.join(outDir, 'xtech-underline-lockup.svg'), underlineSvg);
console.log('✓ xtech-underline-lockup.svg updated with XTECHNOLOGY GROUP QATAR');

// 3. Wireframe / Blueprint Lockup SVG
const wireframeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" width="100%" height="100%">
  <defs>
    <filter id="wfGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Wireframe X -->
  <g transform="translate(140, 10) scale(0.55)">
    <polygon points="50,230 115,230 150,185 110,135 75,180" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round" />
    <polygon points="175,120 215,170 280,35 215,35" fill="none" stroke="#00D2FF" stroke-width="4" stroke-linejoin="round" filter="url(#wfGlow)" />
    <polygon points="50,35 120,35 280,230 210,230" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round" />
  </g>

  <!-- Typography Below -->
  <text x="220" y="172" font-family="'Archivo Black', sans-serif" font-size="20" font-weight="900" letter-spacing="0.10em" fill="#FFFFFF" text-anchor="middle">
    XTECHNOLOGY GROUP
  </text>
  <text x="220" y="196" font-family="'Archivo Black', sans-serif" font-size="15" font-weight="900" letter-spacing="0.16em" fill="#1182FF" text-anchor="middle">
    QATAR
  </text>
</svg>`;

fs.writeFileSync(path.join(outDir, 'xtech-wireframe-lockup.svg'), wireframeSvg);
console.log('✓ xtech-wireframe-lockup.svg updated with XTECHNOLOGY GROUP QATAR');
