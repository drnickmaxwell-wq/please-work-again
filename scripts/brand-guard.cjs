/**
 * Blocks stray brand hex usage outside tokens and enforces gradient string.
 */
const { readFileSync, readdirSync, statSync } = require("fs");
const { join, extname, sep } = require("path");

const ROOT = process.cwd();
const TOKENS_FILE = join(ROOT, "styles/tokens/smh-champagne-tokens.css");
const HEX_CODES = Object.freeze({
  PRIMARY_MAGENTA: "#C2185B",
  PRIMARY_TEAL: "#40C4B4",
  GOLD: "#D4AF37",
  KEYLINE: "#F9E8C3",
  GRADIENT_MAGENTA: "#C2185B",
  GRADIENT_TEAL: "#40C4B4",
  GRADIENT_GOLD: "#D4AF37",
  INK: "#0B0D0F",
});
const CANONICAL_DISPLAY = 'linear-gradient(var(--smh-grad-angle), var(--smh-grad-stop1) 0%, var(--smh-grad-stop2) 60%, var(--smh-grad-stop3) 100%)';
const CANONICAL_GRAD = 'linear-gradient(var(--smh-grad-angle),var(--smh-grad-stop1)0%,var(--smh-grad-stop2)60%,var(--smh-grad-stop3)100%)';
const HEXES = Object.values(HEX_CODES).map(hex=>new RegExp(hex.slice(1),"i"));

const normalize = (value) => value.replace(/\s+/g, "").toLowerCase();

const IGNORED_DIRS = new Set(["node_modules", ".next", "dist"]);

const HERO_JOURNEY_FILES = new Set([
  join(ROOT, "components/hero/4k-hero-video.tsx"),
  join(ROOT, "components/sections/SmileJourney.tsx"),
]);

function walk(dir){
  return readdirSync(dir).flatMap(f=>{
    if(IGNORED_DIRS.has(f)) return [];
    const p=join(dir,f);
    const s=statSync(p);
    if(s.isDirectory()) return walk(p);
    return [p];
  });
}

const files = walk(ROOT).filter(p=>{
  if (p.includes(`${sep}tests${sep}`)) return false;
  const e = extname(p).toLowerCase();
  // limit to code & styles
  return [".js",".ts",".jsx",".tsx",".css",".scss",".mdx"].includes(e);
});

let violations = [];

const NEXT_SEGMENT = `${sep}.next${sep}`;

for(const file of files){
  if(
    file.includes("node_modules") ||
    file.includes(NEXT_SEGMENT) ||
    file.includes("/.next/") ||
    file.includes(`${sep}dist${sep}`) ||
    file.includes(".min.")
  ) continue;
  if(file === __filename) continue;
  if(file === TOKENS_FILE) continue;

  const txt = readFileSync(file,"utf8");
  const normalized = normalize(txt);
  const isHeroJourneyFile = HERO_JOURNEY_FILES.has(file);
  for(const h of HEXES){
    if(h.test(txt)) violations.push({file, hex: h});
  }
  if(
    file !== TOKENS_FILE &&
    /background\s*:\s*linear-gradient[^;]*#c2185b[^;]*#40c4b4[^;]*#d4af37/i.test(txt)
  ){
    violations.push({ file, hex: 'background-linear-gradient-outside-tokens' });
  }
  const glassBlocks = txt.match(/\.champagne-glass\s*\{[^}]*\}/gs) || [];
  for(const block of glassBlocks){
    if(/color-mix[^}]*var\(\s*--smh-ink\s*\)/i.test(block)){
      violations.push({ file, hex: 'champagne-glass-ink-mix' });
      break;
    }
    if(/mix-blend-mode/i.test(block)){
      violations.push({ file, hex: 'champagne-glass-mix-blend' });
      break;
    }
    const bgMatch = block.match(/background-color\s*:\s*([^;]+);/i);
    if(bgMatch && !/transparent/i.test(bgMatch[1])){
      violations.push({ file, hex: 'champagne-glass-tinted' });
      break;
    }
  }
  const surfaceBlocks = txt.match(/\.champagne-surface(?:-lux)?\s*\{[^}]*\}/g) || [];
  for(const block of surfaceBlocks){
    const inlineGradientMatch = block.match(/background(?:-image)?\s*:\s*[^;]*(linear-gradient|radial-gradient)/i);
    if(inlineGradientMatch){
      violations.push({ file, hex: 'champagne-surface-inline-gradient' });
      break;
    }
  }
  if(isHeroJourneyFile){
    if(/bg-(?:white|black|ink)\//i.test(txt)){
      violations.push({ file, hex: 'hero-journey-bg-tint' });
    }
    if(/background\s*:\s*(?:radial-gradient|linear-gradient)\(/i.test(txt)){
      violations.push({ file, hex: 'hero-journey-background-gradient' });
    }
    if(/opacity\s*:\s*0\.\d+/i.test(txt)){
      violations.push({ file, hex: 'hero-journey-opacity' });
    }
  }
  if(file.includes("brand") && normalized.includes("linear-gradient(") && !normalized.includes(CANONICAL_GRAD)){
    const gradientMatch = txt.match(/linear-gradient\([^)]*\)/i);
    const raw = gradientMatch ? gradientMatch[0].trim() : "";
    violations.push({
      file,
      hex: "non-canonical-gradient",
      expected: CANONICAL_DISPLAY,
      found: raw,
      normalizedExpected: CANONICAL_GRAD,
      normalizedFound: raw ? normalize(raw) : "",
    });
  }
}

const tokensBody = readFileSync(TOKENS_FILE, "utf8");
const gradientMatch = tokensBody.match(/--smh-gradient:\s*([^;]+);/i);
if(!gradientMatch){
  violations.push({file: TOKENS_FILE, hex: "gradient-string-missing"});
} else {
  const gradientRaw = gradientMatch[1].trim();
  const gradientNormalized = normalize(gradientRaw);
  if(gradientNormalized !== CANONICAL_GRAD){
    violations.push({
      file: TOKENS_FILE,
      hex: "gradient-string-mismatch",
      expected: CANONICAL_DISPLAY,
      found: gradientRaw,
      normalizedExpected: CANONICAL_GRAD,
      normalizedFound: gradientNormalized,
    });
  }
}

if(violations.length){
  console.error("❌ Brand guard failed. Move brand hexes/gradient into tokens only.");
  for(const v of violations){
    if(v.expected){
      console.error(`- ${v.file} ${String(v.hex)} → expected "${v.expected}" but found "${v.found || 'unknown'}"`);
      if(v.normalizedExpected || v.normalizedFound){
        console.error(`  normalized expected: "${v.normalizedExpected ?? ''}" vs found: "${v.normalizedFound ?? ''}"`);
      }
    } else {
      console.error("-", v.file, String(v.hex));
    }
  }
  process.exit(1);
}
console.log("Brand lock OK");
