#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const BASE_URL = process.env.HUE_LOCK_BASE_URL || 'http://localhost:3000';
const TARGET_PATHS = ['/preview/brand-lock', '/preview/brand-live'];
const WAIT_TIMEOUT = 10_000;

function tryRequirePlaywright() {
  try {
    return require('playwright');
  } catch (playwrightError) {
    try {
      return require('@playwright/test');
    } catch (testError) {
      return null;
    }
  }
}

function rgbToHexComponent(value) {
  const n = Math.max(0, Math.min(255, Number(value)));
  return n.toString(16).padStart(2, '0').toUpperCase();
}

function normalizeGradient(value) {
  if (!value) return value;
  let normalized = value.trim();
  normalized = normalized.replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)/gi, (match, r, g, b, a) => {
    if (typeof a !== 'undefined' && Number(a) !== 1) {
      return match.replace(/\s+/g, ' ');
    }
    return `#${rgbToHexComponent(r)}${rgbToHexComponent(g)}${rgbToHexComponent(b)}`;
  });
  normalized = normalized.replace(/\s+/g, ' ');
  normalized = normalized.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  normalized = normalized.replace(/\s*,\s*/g, ',');
  return normalized;
}

function cleanValue(value) {
  return value ? value.trim().replace(/\s+/g, ' ') : value;
}

async function captureWithPlaywright(playwright) {
  const { chromium } = playwright;
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  let captured = null;

  for (const target of TARGET_PATHS) {
    try {
      const response = await page.goto(new URL(target, BASE_URL).toString(), { waitUntil: 'networkidle' });
      if (response && response.status() === 404) {
        continue;
      }
      await page.waitForSelector('.champagne-surface, .champagne-surface-lux', { state: 'visible', timeout: WAIT_TIMEOUT });
      const data = await page.evaluate(() => {
        const el = document.querySelector('.champagne-surface, .champagne-surface-lux');
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
          gradient: style.backgroundImage,
          bgSize: style.backgroundSize,
          bgPosition: style.backgroundPosition,
        };
      });
      if (data && data.gradient) {
        captured = { ...data, source: target };
        break;
      }
    } catch (error) {
      // Try next target
    }
  }

  await browser.close();

  if (!captured) {
    throw new Error('Unable to capture gradient from preview surface.');
  }
  return captured;
}

function captureWithPuppeteerViaNpx() {
  const tmpFile = fs.mkdtempSync(path.join(os.tmpdir(), 'hue-capture-'));
  const scriptPath = path.join(tmpFile, 'capture.cjs');
  const scriptSource = `#!/usr/bin/env node\n` +
    `const path = require('path');\n` +
    `const { createRequire } = require('module');\n` +
    `const BASE_URL = ${JSON.stringify(BASE_URL)};\n` +
    `const TARGET_PATHS = ${JSON.stringify(TARGET_PATHS)};\n` +
    `const WAIT_TIMEOUT = ${WAIT_TIMEOUT};\n` +
    `const binPath = process.env.PATH.split(path.delimiter)[0];\n` +
    `const modulePath = path.dirname(binPath);\n` +
    `const requireFromNpx = createRequire(path.join(modulePath, 'puppeteer', 'package.json'));\n` +
    `const puppeteer = requireFromNpx('puppeteer');\n` +
    `(async () => {\n` +
    `  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });\n` +
    `  const page = await browser.newPage();\n` +
    `  let captured = null;\n` +
    `  for (const target of TARGET_PATHS) {\n` +
    `    try {\n` +
    `      const response = await page.goto(new URL(target, BASE_URL).toString(), { waitUntil: 'networkidle0' });\n` +
    `      if (response && response.status() === 404) {\n` +
    `        continue;\n` +
    `      }\n` +
    `      await page.waitForSelector('.champagne-surface, .champagne-surface-lux', { visible: true, timeout: WAIT_TIMEOUT });\n` +
    `      const data = await page.evaluate(() => {\n` +
    `        const el = document.querySelector('.champagne-surface, .champagne-surface-lux');\n` +
    `        if (!el) return null;\n` +
    `        const style = window.getComputedStyle(el);\n` +
    `        return {\n` +
    `          gradient: style.backgroundImage,\n` +
    `          bgSize: style.backgroundSize,\n` +
    `          bgPosition: style.backgroundPosition\n` +
    `        };\n` +
    `      });\n` +
    `      if (data && data.gradient) {\n` +
    `        captured = { ...data, source: target };\n` +
    `        break;\n` +
    `      }\n` +
    `    } catch (error) {\n` +
    `      continue;\n` +
    `    }\n` +
    `  }\n` +
    `  await browser.close();\n` +
    `  if (!captured) {\n` +
    `    throw new Error('Unable to capture gradient via Puppeteer.');\n` +
    `  }\n` +
    `  process.stdout.write(JSON.stringify(captured));\n` +
    `})().catch(err => {\n` +
    `  console.error(err && err.stack ? err.stack : err);\n` +
    `  process.exit(1);\n` +
    `});\n`;
  fs.writeFileSync(scriptPath, scriptSource, 'utf8');

  const result = spawnSync('npx', ['--yes', '--package', 'puppeteer@22.12.1', '--', 'node', scriptPath], {
    encoding: 'utf8',
  });

  try {
    fs.rmSync(tmpFile, { recursive: true, force: true });
  } catch (_) {
    // ignore cleanup errors
  }

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(result.stderr || 'Failed to run Puppeteer via npx.');
  }
  const output = result.stdout && result.stdout.trim();
  if (!output) {
    throw new Error('No capture output received from Puppeteer process.');
  }
  try {
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`Unable to parse capture output: ${output}`);
  }
}

async function performCapture() {
  const playwright = tryRequirePlaywright();
  let captured;
  if (playwright) {
    captured = await captureWithPlaywright(playwright);
  } else {
    captured = captureWithPuppeteerViaNpx();
  }

  const normalized = {
    gradient: normalizeGradient(captured.gradient),
    bgSize: cleanValue(captured.bgSize),
    bgPosition: cleanValue(captured.bgPosition),
    source: captured.source || TARGET_PATHS[0],
  };

  const payload = {
    capturedAt: new Date().toISOString(),
    source: normalized.source,
    gradient: normalized.gradient,
    bgSize: normalized.bgSize,
    bgPosition: normalized.bgPosition,
  };

  const outDir = path.join(process.cwd(), 'brand');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'hue-lock.json');
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');

  return payload;
}

if (require.main === module) {
  performCapture()
    .then((payload) => {
      console.log(`[hue-capture] gradient=${payload.gradient}`);
      console.log(`[hue-capture] bgSize=${payload.bgSize} bgPos=${payload.bgPosition}`);
    })
    .catch((error) => {
      console.error(`[hue-capture] ${error.message}`);
      process.exit(1);
    });
} else {
  module.exports = { performCapture };
}
