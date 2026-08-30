/** Stained-glass / manuscript wash SVGs. No text. Unique per motif + palette. */

export const PALETTES = {
  indigo: { a: "#1b2436", b: "#3d4a6b", c: "#c4a35a", d: "#e4cf96", e: "#8a6d28", f: "#f6f1e6", g: "#4f46e5" },
  rose: { a: "#2a1620", b: "#6b2d3c", c: "#c4a35a", d: "#e4cf96", e: "#9f1239", f: "#f6f1e6", g: "#be123c" },
  slate: { a: "#111827", b: "#334155", c: "#c4a35a", d: "#e4cf96", e: "#64748b", f: "#f6f1e6", g: "#475569" },
  amber: { a: "#1c1408", b: "#5c4030", c: "#c4a35a", d: "#f0d78c", e: "#92400e", f: "#f6f1e6", g: "#b45309" },
  sky: { a: "#0c1922", b: "#1e3a4c", c: "#c4a35a", d: "#e4cf96", e: "#0369a1", f: "#f6f1e6", g: "#0284c7" },
  forest: { a: "#122016", b: "#2d4a38", c: "#c4a35a", d: "#e4cf96", e: "#3f6212", f: "#f6f1e6", g: "#4d7c0f" },
  wine: { a: "#1a1014", b: "#4a2030", c: "#c4a35a", d: "#e4cf96", e: "#7f1d1d", f: "#f6f1e6", g: "#9f1239" },
  violet: { a: "#161022", b: "#3b2d5c", c: "#c4a35a", d: "#e4cf96", e: "#6d28d9", f: "#f6f1e6", g: "#7c3aed" }
};

const MOTIF_FN = {
  scroll: (p) => `
    <rect x="420" y="210" width="520" height="460" rx="18" fill="${p.f}" stroke="${p.c}" stroke-width="8"/>
    <rect x="460" y="250" width="440" height="18" rx="4" fill="${p.c}" opacity=".45"/>
    <rect x="460" y="290" width="380" height="12" rx="3" fill="${p.b}" opacity=".35"/>
    <rect x="460" y="320" width="400" height="12" rx="3" fill="${p.b}" opacity=".28"/>
    <rect x="460" y="350" width="300" height="12" rx="3" fill="${p.b}" opacity=".22"/>
    <path d="M380 200 q-40 240 0 500" fill="none" stroke="${p.c}" stroke-width="22"/>
    <path d="M980 200 q40 240 0 500" fill="none" stroke="${p.c}" stroke-width="22"/>
    <circle cx="380" cy="200" r="18" fill="${p.d}"/><circle cx="980" cy="200" r="18" fill="${p.d}"/>`,
  scales: (p) => `
    <path d="M800 180 v420" stroke="${p.c}" stroke-width="10"/>
    <path d="M620 280 h360" stroke="${p.c}" stroke-width="8"/>
    <path d="M620 280 L500 430 h240 Z" fill="${p.g}" opacity=".35" stroke="${p.c}" stroke-width="6"/>
    <path d="M980 280 L860 400 h240 Z" fill="${p.d}" opacity=".55" stroke="${p.c}" stroke-width="6"/>
    <circle cx="800" cy="180" r="22" fill="${p.d}"/>
    <rect x="760" y="600" width="80" height="18" rx="4" fill="${p.c}"/>`,
  flame: (p) => `
    <path d="M800 220 c80 80 140 180 140 280 0 140-120 220-140 220s-140-80-140-220c0-100 60-200 140-280z" fill="${p.g}" opacity=".35"/>
    <path d="M800 300 c50 60 90 130 90 200 0 100-80 160-90 160s-90-60-90-160c0-70 40-140 90-200z" fill="${p.c}" opacity=".7"/>
    <path d="M800 380 c28 40 48 80 48 120 0 60-48 90-48 90s-48-30-48-90c0-40 20-80 48-120z" fill="${p.d}"/>`,
  fork: (p) => `
    <path d="M800 200 v140" stroke="${p.c}" stroke-width="12" fill="none"/>
    <path d="M800 340 L520 620" stroke="${p.b}" stroke-width="12" fill="none"/>
    <path d="M800 340 L1080 620" stroke="${p.c}" stroke-width="12" fill="none"/>
    <circle cx="800" cy="200" r="20" fill="${p.d}"/>
    <circle cx="520" cy="620" r="16" fill="${p.e}"/>
    <circle cx="1080" cy="620" r="16" fill="${p.d}"/>`,
  compass: (p) => `
    <circle cx="800" cy="450" r="240" fill="none" stroke="${p.c}" stroke-width="8"/>
    <circle cx="800" cy="450" r="160" fill="none" stroke="${p.b}" stroke-width="4" opacity=".5"/>
    <path d="M800 230 L860 450 L800 670 L740 450 Z" fill="${p.d}" opacity=".7" stroke="${p.c}" stroke-width="6"/>
    <circle cx="800" cy="450" r="16" fill="${p.a}"/>`,
  rings: (p) => `
    <circle cx="700" cy="450" r="170" fill="none" stroke="${p.c}" stroke-width="22"/>
    <circle cx="900" cy="450" r="170" fill="none" stroke="${p.g}" stroke-width="22" opacity=".75"/>
    <path d="M520 300 C700 120 1100 180 1180 420" fill="none" stroke="${p.e}" stroke-width="8" opacity=".5"/>`,
  vine: (p) => `
    <path d="M400 700 C560 520 640 640 800 420 C960 200 1040 360 1200 220" fill="none" stroke="${p.e}" stroke-width="14"/>
    <ellipse cx="620" cy="500" rx="36" ry="18" fill="${p.g}" transform="rotate(-30 620 500)"/>
    <ellipse cx="780" cy="430" rx="36" ry="18" fill="${p.c}" transform="rotate(20 780 430)"/>
    <ellipse cx="980" cy="300" rx="36" ry="18" fill="${p.g}" transform="rotate(-15 980 300)"/>
    <circle cx="800" cy="420" r="10" fill="${p.d}"/>`,
  wheat: (p) => `
    <path d="M800 200 v500" stroke="${p.c}" stroke-width="8"/>
    ${[0,1,2,3,4,5,6].map((i) => {
      const y = 230 + i * 55;
      return `<ellipse cx="740" cy="${y}" rx="48" ry="16" fill="${p.d}" opacity=".8" transform="rotate(-25 740 ${y})"/>
        <ellipse cx="860" cy="${y}" rx="48" ry="16" fill="${p.c}" opacity=".7" transform="rotate(25 860 ${y})"/>`;
    }).join("")}`,
  tares: (p) => `
    <path d="M640 720 C620 500 700 360 680 200" fill="none" stroke="${p.c}" stroke-width="10"/>
    <path d="M960 720 C980 480 880 340 920 190" fill="none" stroke="${p.e}" stroke-width="10"/>
    <path d="M640 300 l-40-50 M640 360 l40-46 M960 280 l40-50 M960 340 l-36-40" stroke="${p.b}" stroke-width="6"/>
    <circle cx="800" cy="560" r="8" fill="${p.d}"/>`,
  lamp: (p) => `
    <path d="M700 520 h200 l-20 80 h-160 z" fill="${p.b}"/>
    <path d="M740 520 q60-180 120 0" fill="${p.c}" opacity=".35"/>
    <path d="M800 250 c20 40 20 70 0 90 c-20-20-20-50 0-90z" fill="${p.d}"/>
    <rect x="792" y="340" width="16" height="80" fill="${p.c}"/>
    <ellipse cx="800" cy="520" rx="70" ry="18" fill="${p.a}"/>`,
  book: (p) => `
    <path d="M800 220 L430 300 v420 L800 720 L1170 720 V300 Z" fill="${p.f}" stroke="${p.c}" stroke-width="8"/>
    <path d="M800 220 v500" stroke="${p.c}" stroke-width="8"/>
    <rect x="500" y="360" width="220" height="10" fill="${p.b}" opacity=".3"/>
    <rect x="500" y="400" width="180" height="8" fill="${p.b}" opacity=".25"/>
    <rect x="880" y="360" width="220" height="10" fill="${p.b}" opacity=".3"/>
    <rect x="880" y="400" width="180" height="8" fill="${p.b}" opacity=".25"/>`,
  path: (p) => `
    <path d="M300 680 C500 600 520 500 800 460 C1080 420 1100 300 1300 220" fill="none" stroke="${p.c}" stroke-width="28" opacity=".4"/>
    <path d="M300 680 C500 600 520 500 800 460 C1080 420 1100 300 1300 220" fill="none" stroke="${p.d}" stroke-width="10"/>
    <circle cx="300" cy="680" r="16" fill="${p.e}"/>
    <circle cx="1300" cy="220" r="18" fill="${p.d}"/>`,
  city: (p) => `
    <path d="M360 700 V420 h80 v80 h70 V360 h90 v340" fill="${p.b}"/>
    <path d="M700 700 V300 h120 l60-80 60 80 h120 v400" fill="${p.a}"/>
    <path d="M1160 700 V440 h90 v80 h70 V400 h80 v300" fill="${p.b}"/>
    <rect x="740" y="420" width="18" height="28" fill="${p.d}"/>
    <rect x="820" y="420" width="18" height="28" fill="${p.d}"/>
    <circle cx="880" cy="250" r="14" fill="${p.d}"/>`,
  lamb: (p) => `
    <ellipse cx="800" cy="480" rx="210" ry="140" fill="${p.f}" stroke="${p.c}" stroke-width="8"/>
    <circle cx="1000" cy="400" r="70" fill="${p.f}" stroke="${p.c}" stroke-width="8"/>
    <circle cx="1020" cy="388" r="8" fill="${p.a}"/>
    <path d="M620 520 q-40 80 20 140" fill="none" stroke="${p.c}" stroke-width="10"/>
    <path d="M900 220 C860 160 740 170 720 240" fill="none" stroke="${p.d}" stroke-width="8"/>`,
  dome: (p) => `
    <path d="M500 700 V480 h600 V700" fill="${p.b}"/>
    <path d="M560 480 a240 180 0 0 1 480 0" fill="${p.g}" opacity=".45" stroke="${p.c}" stroke-width="8"/>
    <rect x="760" y="560" width="80" height="140" fill="${p.d}" opacity=".35"/>
    <circle cx="800" cy="300" r="16" fill="${p.d}"/>`,
  chapel: (p) => `
    <path d="M800 180 L1180 420 H420 Z" fill="${p.c}" opacity=".55"/>
    <rect x="520" y="420" width="560" height="280" fill="${p.b}"/>
    <rect x="740" y="520" width="120" height="180" fill="${p.a}"/>
    <rect x="600" y="500" width="50" height="70" fill="${p.d}" opacity=".4"/>
    <rect x="950" y="500" width="50" height="70" fill="${p.d}" opacity=".4"/>`,
  tools: (p) => `
    <rect x="520" y="560" width="560" height="80" rx="8" fill="${p.b}"/>
    <path d="M620 300 l40 220" stroke="${p.c}" stroke-width="16"/>
    <path d="M600 300 h80" stroke="${p.d}" stroke-width="18"/>
    <circle cx="980" cy="420" r="70" fill="none" stroke="${p.c}" stroke-width="16"/>
    <path d="M980 490 v160" stroke="${p.e}" stroke-width="14"/>`,
  ear: (p) => `
    <path d="M860 220 c180 40 220 200 180 320 s-160 200-260 160" fill="none" stroke="${p.c}" stroke-width="16"/>
    <path d="M820 300 c90 30 110 120 80 190 s-90 110-150 80" fill="none" stroke="${p.d}" stroke-width="10"/>
    <rect x="420" y="300" width="260" height="320" rx="16" fill="${p.f}" stroke="${p.c}" stroke-width="8"/>
    <rect x="450" y="340" width="200" height="12" fill="${p.b}" opacity=".3"/>
    <rect x="450" y="380" width="160" height="10" fill="${p.b}" opacity=".25"/>`,
  globe: (p) => `
    <circle cx="800" cy="450" r="230" fill="${p.b}" opacity=".45" stroke="${p.c}" stroke-width="8"/>
    <ellipse cx="800" cy="450" rx="90" ry="230" fill="none" stroke="${p.d}" stroke-width="5"/>
    <ellipse cx="800" cy="450" rx="230" ry="80" fill="none" stroke="${p.d}" stroke-width="5"/>
    <path d="M580 360 C700 300 900 320 1040 380" fill="none" stroke="${p.c}" stroke-width="8"/>`,
  wing: (p) => `
    <path d="M800 500 C620 420 420 360 360 260 C520 300 680 280 800 360 C920 280 1080 300 1240 260 C1180 360 980 420 800 500 Z" fill="${p.d}" opacity=".55" stroke="${p.c}" stroke-width="8"/>
    <path d="M800 500 v160" stroke="${p.c}" stroke-width="8"/>
    <circle cx="800" cy="480" r="18" fill="${p.g}"/>`,
  seal: (p) => `
    <circle cx="620" cy="450" r="150" fill="${p.g}" opacity=".25" stroke="${p.e}" stroke-width="10" stroke-dasharray="12 10"/>
    <circle cx="980" cy="450" r="150" fill="${p.d}" opacity=".45" stroke="${p.c}" stroke-width="10"/>
    <path d="M980 360 v180 M890 450 h180" stroke="${p.a}" stroke-width="10"/>`,
  windows: (p) => `
    ${[0,1,2,3].map((i) => {
      const x = 360 + i * 240;
      const fill = [p.g, p.c, p.d, p.e][i];
      return `<path d="M${x} 700 V280 q80-80 160 0 V700 Z" fill="${fill}" opacity=".4" stroke="${p.c}" stroke-width="8"/>`;
    }).join("")}`,
  hands: (p) => `
    <path d="M420 560 C520 500 620 420 760 400" fill="none" stroke="${p.c}" stroke-width="22"/>
    <path d="M1180 560 C1080 500 980 420 840 400" fill="none" stroke="${p.d}" stroke-width="22"/>
    <circle cx="800" cy="340" r="50" fill="${p.g}" opacity=".4" stroke="${p.c}" stroke-width="8"/>
    <path d="M800 300 c10 20 10 40 0 50 c-10-10-10-30 0-50z" fill="${p.d}"/>`,
  candles: (p) => `
    ${[0,1,2,3,4].map((i) => {
      const x = 420 + i * 190;
      const h = 180 + (i % 3) * 70;
      return `<rect x="${x}" y="${700 - h}" width="36" height="${h}" fill="${p.b}"/>
        <path d="M${x + 18} ${700 - h - 40} c10 16 10 28 0 40 c-10-12-10-24 0-40z" fill="${p.d}"/>`;
    }).join("")}`,
  fountain: (p) => `
    <ellipse cx="800" cy="640" rx="260" ry="40" fill="${p.b}"/>
    <rect x="760" y="360" width="80" height="280" fill="${p.c}"/>
    <path d="M800 240 C720 320 680 360 620 400" fill="none" stroke="${p.d}" stroke-width="8"/>
    <path d="M800 240 C880 320 920 360 980 400" fill="none" stroke="${p.d}" stroke-width="8"/>
    <circle cx="800" cy="230" r="20" fill="${p.d}"/>`,
  keys: (p) => `
    <circle cx="620" cy="360" r="80" fill="none" stroke="${p.c}" stroke-width="16"/>
    <path d="M690 400 L1040 620" stroke="${p.c}" stroke-width="16"/>
    <path d="M980 580 h70 M1000 610 h50" stroke="${p.d}" stroke-width="12"/>
    <circle cx="900" cy="300" r="60" fill="none" stroke="${p.g}" stroke-width="12"/>`,
  heart: (p) => `
    <path d="M800 300 C720 180 520 220 520 380 C520 560 800 700 800 700 C800 700 1080 560 1080 380 C1080 220 880 180 800 300 Z" fill="${p.g}" opacity=".35" stroke="${p.c}" stroke-width="10"/>`,
  door: (p) => `
    <path d="M560 700 V280 q240-140 480 0 V700 Z" fill="${p.b}" stroke="${p.c}" stroke-width="10"/>
    <path d="M800 280 V700" stroke="${p.c}" stroke-width="6" opacity=".4"/>
    <circle cx="860" cy="500" r="12" fill="${p.d}"/>`,
  beams: (p) => `
    <path d="M800 180 v500" stroke="${p.c}" stroke-width="16"/>
    <path d="M560 360 h480" stroke="${p.d}" stroke-width="16"/>
    <circle cx="800" cy="360" r="36" fill="${p.g}" opacity=".4" stroke="${p.c}" stroke-width="6"/>`,
  table: (p) => `
    <rect x="420" y="420" width="760" height="28" fill="${p.c}"/>
    <rect x="480" y="448" width="28" height="200" fill="${p.b}"/>
    <rect x="1090" y="448" width="28" height="200" fill="${p.b}"/>
    <rect x="620" y="300" width="200" height="120" fill="${p.f}" stroke="${p.c}" stroke-width="6"/>
    <circle cx="980" cy="360" r="40" fill="${p.d}" opacity=".5"/>`
};

export function motifNames() {
  return Object.keys(MOTIF_FN);
}

export function renderSvg(motif, paletteName, opts = {}) {
  const p = PALETTES[paletteName] || PALETTES.indigo;
  const inner = (MOTIF_FN[motif] || MOTIF_FN.scroll)(p);
  const w = opts.width || 1600;
  const h = opts.height || 900;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.a}"/>
      <stop offset="1" stop-color="${p.b}"/>
    </linearGradient>
    <pattern id="dust" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="10" r="1.1" fill="${p.d}" opacity=".25"/>
      <circle cx="50" cy="40" r="0.9" fill="${p.f}" opacity=".18"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#wash)"/>
  <rect width="${w}" height="${h}" fill="url(#dust)"/>
  <rect x="48" y="48" width="${w - 96}" height="${h - 96}" fill="none" stroke="${p.c}" stroke-width="3" opacity=".55"/>
  <rect x="64" y="64" width="${w - 128}" height="${h - 128}" fill="none" stroke="${p.d}" stroke-width="1.5" opacity=".35"/>
  ${inner}
</svg>`;
}
