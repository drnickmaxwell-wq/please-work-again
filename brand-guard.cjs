#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = process.cwd();
const SELF = path.join(ROOT, 'brand-guard.cjs');
const REPORT_SCRIPT = path.join(ROOT, 'scripts', 'brand-report.cjs');
const CHECKSUM_SCRIPT = path.join(ROOT, 'scripts', 'brand-checksum.cjs');
const HUE_LOCK = path.join(ROOT, 'brand', 'hue-lock.json');
const { CANON_HEX_WHITELIST } = require('./scripts/brand-report.cjs');
const CANON_HEX_SET = new Set(CANON_HEX_WHITELIST.map((hex) => hex.toUpperCase()));
const LEGACY_TWO_STOP = ['#D94BC6', '#00C2C7'];
const LEGACY_BLOCKED = LEGACY_TWO_STOP.filter((hex) => CANON_HEX_SET.has(hex.toUpperCase()));
if (LEGACY_BLOCKED.length === 0) {
  LEGACY_BLOCKED.push(...LEGACY_TWO_STOP);
}
const TOKENS_ALLOWLIST_DIRS = ['styles/tokens'];
const SCAN_EXTENSIONS = /\.(c|m)?(t|j)sx?$|\.css|\.mdx?$|\.json$/i;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.turbo', '.vercel', 'dist', 'build', 'coverage', 'public'].includes(entry.name)) continue;
      walk(p, files);
    } else {
      if (!SCAN_EXTENSIONS.test(entry.name)) continue;
      files.push(p);
    }
  }
  return files;
}

function normalizePath(file) {
  return file.replace(/\\/g, '/');
}

function isInAllowlistedTokens(file) {
  const normalized = normalizePath(file);
  return TOKENS_ALLOWLIST_DIRS.some((dir) => normalized.includes(`${dir}/`));
}

function checkLegacyHexes(file, contents, failures) {
  const upper = contents.toUpperCase();
  for (const hex of LEGACY_BLOCKED) {
    if (upper.includes(hex.toUpperCase()) && !isInAllowlistedTokens(file)) {
      failures.push(`${normalizePath(path.relative(ROOT, file))}: legacy hex ${hex}`);
    }
  }
}

function checkGradients(file, contents, failures) {
  const relativePath = normalizePath(path.relative(ROOT, file));
  if (
    isInAllowlistedTokens(file) ||
    path.resolve(file) === HUE_LOCK ||
    relativePath.startsWith('tests/')
  ) {
    return;
  }

  const gradientRegex = /linear-gradient\s*\(\s*135deg[^)]*\)/gi;
  const matches = contents.matchAll(gradientRegex);

  for (const match of matches) {
    const gradient = match[0];
    const hasHex = /#[0-9A-F]{3,8}/i.test(gradient);
    const usesTokens = /var\(/i.test(gradient);
    if (hasHex && !usesTokens) {
      failures.push(`${relativePath}: hard-coded 135deg gradient detected`);
    }
  }
}

const failures = [];
for (const file of walk(ROOT)) {
  if (file === SELF) continue;
  if (file === REPORT_SCRIPT) continue;
  if (file === CHECKSUM_SCRIPT) continue;

  const contents = fs.readFileSync(file, 'utf8');
  checkLegacyHexes(file, contents, failures);
  checkGradients(file, contents, failures);
}

if (failures.length) {
  console.error('Brand Guard failed:');
  for (const failure of failures) {
    console.error(` - ${failure}`);
  }
  process.exit(1);
}

try {
  execFileSync('node', [CHECKSUM_SCRIPT], { stdio: 'inherit' });
} catch (error) {
  process.exit(error.status || 1);
}

console.log('Brand Guard passed.');
