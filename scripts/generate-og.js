// Generate site-wide OG image (1200x630 PNG) from SVG, run in build.
// Output: public/og-image.png + public/og-image.jpg (fallback).

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../public');

const W = 1200;
const H = 630;

const palette = {
    bg: '#0A0A0B',
    surface: '#111114',
    line: '#232328',
    fg: '#EDEDED',
    mute: '#8B8B92',
    mint: '#6EE7B7',
};

// Grid pattern via repeating SVG <pattern>
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="${palette.line}" stroke-width="1" opacity="0.7"/>
    </pattern>
    <radialGradient id="glow" cx="30%" cy="0%" r="60%">
      <stop offset="0%" stop-color="${palette.mint}" stop-opacity="0.18"/>
      <stop offset="70%" stop-color="${palette.mint}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="${palette.bg}"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>

  <!-- Logo block -->
  <g transform="translate(64,64)">
    <rect width="56" height="56" rx="12" fill="${palette.mint}" fill-opacity="0.15" stroke="${palette.mint}" stroke-opacity="0.4"/>
    <text x="28" y="40" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="32" fill="${palette.mint}" text-anchor="middle">m</text>
  </g>
  <text x="140" y="86" font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="22" fill="${palette.fg}">Maby Prochilo</text>
  <text x="140" y="112" font-family="Inter, system-ui, sans-serif" font-weight="400" font-size="16" fill="${palette.mute}">Digital Strategist &amp; AI Marketing</text>

  <!-- Eyebrow -->
  <g transform="translate(64, 360)">
    <circle cx="4" cy="0" r="4" fill="${palette.mint}"/>
    <text x="20" y="5" font-family="ui-monospace, monospace" font-size="16" fill="${palette.mute}" letter-spacing="2.4">MPROCHILO.IT · NEWSLETTER · STRATEGIA</text>
  </g>

  <!-- Title -->
  <g transform="translate(64, 420)">
    <text font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="76" fill="${palette.fg}" letter-spacing="-3">
      <tspan x="0" dy="0">Strategia digitale</tspan>
      <tspan x="0" dy="86">e <tspan fill="${palette.mint}">workflow AI</tspan></tspan>
    </text>
  </g>

  <!-- Footer rule -->
  <line x1="64" y1="${H - 80}" x2="${W - 64}" y2="${H - 80}" stroke="${palette.line}" stroke-width="1"/>

  <!-- Footer text -->
  <text x="64" y="${H - 40}" font-family="ui-monospace, monospace" font-size="16" fill="${palette.mute}" letter-spacing="2.4">MPROCHILO.IT</text>
  <text x="${W - 64}" y="${H - 40}" font-family="ui-monospace, monospace" font-size="16" fill="${palette.mint}" text-anchor="end" letter-spacing="2.4">· AVAILABLE · 2 SPOTS Q3 2026</text>
</svg>
`.trim();

// Skill Carosello variant
const svgSkill = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid2" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="${palette.line}" stroke-width="1" opacity="0.7"/>
    </pattern>
    <radialGradient id="glow2" cx="70%" cy="0%" r="60%">
      <stop offset="0%" stop-color="${palette.mint}" stop-opacity="0.22"/>
      <stop offset="70%" stop-color="${palette.mint}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="100%" height="100%" fill="${palette.bg}"/>
  <rect width="100%" height="100%" fill="url(#grid2)"/>
  <rect width="100%" height="100%" fill="url(#glow2)"/>

  <!-- Header -->
  <g transform="translate(64,64)">
    <rect width="56" height="56" rx="12" fill="${palette.mint}" fill-opacity="0.15" stroke="${palette.mint}" stroke-opacity="0.4"/>
    <text x="28" y="40" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="32" fill="${palette.mint}" text-anchor="middle">m</text>
  </g>
  <text x="140" y="86" font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="22" fill="${palette.fg}">Maby Prochilo</text>
  <text x="140" y="112" font-family="Inter, system-ui, sans-serif" font-weight="400" font-size="16" fill="${palette.mute}">Lead magnet · gratis</text>

  <!-- Eyebrow -->
  <g transform="translate(64, 290)">
    <circle cx="4" cy="0" r="4" fill="${palette.mint}"/>
    <text x="20" y="5" font-family="ui-monospace, monospace" font-size="16" fill="${palette.mute}" letter-spacing="2.4">SKILL CLAUDE · CAROSELLI · ZERO CANVA</text>
  </g>

  <!-- Title -->
  <g transform="translate(64, 360)">
    <text font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="64" fill="${palette.fg}" letter-spacing="-2.5">
      <tspan x="0" dy="0">Skill <tspan fill="${palette.mint}">Claude</tspan> per</tspan>
      <tspan x="0" dy="76">caroselli Instagram,</tspan>
      <tspan x="0" dy="76" fill="${palette.mint}">gratis<tspan fill="${palette.fg}">.</tspan></tspan>
    </text>
  </g>

  <!-- Footer rule -->
  <line x1="64" y1="${H - 80}" x2="${W - 64}" y2="${H - 80}" stroke="${palette.line}" stroke-width="1"/>

  <!-- Footer text -->
  <text x="64" y="${H - 40}" font-family="ui-monospace, monospace" font-size="16" fill="${palette.mute}" letter-spacing="2.4">MPROCHILO.IT/SKILL-CAROSELLO</text>
  <text x="${W - 64}" y="${H - 40}" font-family="ui-monospace, monospace" font-size="16" fill="${palette.mint}" text-anchor="end" letter-spacing="2.4">· SKILL + PROMPT + SCRIPT · 30¢ EACH</text>
</svg>
`.trim();

async function run() {
    const buf = Buffer.from(svg, 'utf-8');
    await sharp(buf).png({ quality: 90 }).toFile(resolve(out, 'og-image.png'));
    await sharp(buf).jpeg({ quality: 88 }).toFile(resolve(out, 'og-image.jpg'));

    const bufSkill = Buffer.from(svgSkill, 'utf-8');
    await sharp(bufSkill).png({ quality: 90 }).toFile(resolve(out, 'og-skill-carosello.png'));
    await sharp(bufSkill).jpeg({ quality: 88 }).toFile(resolve(out, 'og-skill-carosello.jpg'));

    console.log('✓ Generated public/og-image.{png,jpg} + og-skill-carosello.{png,jpg}');
}

run().catch((err) => { console.error(err); process.exit(1); });
