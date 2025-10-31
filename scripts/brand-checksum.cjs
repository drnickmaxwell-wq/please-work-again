#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = process.cwd();
const LOCK_PATH = path.join(ROOT, '.brand-lock.json');
const FILES = {
  tokens: path.join(ROOT, 'styles', 'tokens', 'smh-champagne-tokens.css'),
  hueLock: path.join(ROOT, 'brand', 'hue-lock.json'),
};

function hashFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required file missing: ${path.relative(ROOT, filePath)}`);
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  const normalized = raw.replace(/\r\n/g, '\n');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

function computeHashes() {
  return Object.fromEntries(
    Object.entries(FILES).map(([key, filePath]) => [key, hashFile(filePath)])
  );
}

function readLockFile() {
  if (!fs.existsSync(LOCK_PATH)) {
    throw new Error('Missing .brand-lock.json. Run `node scripts/brand-checksum.cjs --write` to seal.');
  }
  const contents = fs.readFileSync(LOCK_PATH, 'utf8');
  try {
    return JSON.parse(contents);
  } catch (error) {
    throw new Error('.brand-lock.json is not valid JSON.');
  }
}

function writeLockFile(hashes) {
  const payload = {
    tokens: hashes.tokens,
    hueLock: hashes.hueLock,
  };
  fs.writeFileSync(LOCK_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

function verify() {
  const hashes = computeHashes();
  const recorded = readLockFile();
  const mismatches = [];

  for (const [key, hash] of Object.entries(hashes)) {
    if (recorded[key] !== hash) {
      mismatches.push(`${key} mismatch (expected ${recorded[key] || 'missing'}, actual ${hash})`);
    }
  }

  if (mismatches.length) {
    console.error('Brand checksum mismatch detected:');
    for (const mismatch of mismatches) {
      console.error(` - ${mismatch}`);
    }
    console.error('Run `node scripts/brand-checksum.cjs --write` to re-seal if the changes are intentional.');
    process.exit(1);
  }

  console.log('Brand checksum verified.');
}

function main() {
  if (process.argv.includes('--write')) {
    writeLockFile(computeHashes());
    console.log('Brand checksum lock updated.');
    return;
  }
  verify();
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
