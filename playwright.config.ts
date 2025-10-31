import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
const HOST = process.env.PLAYWRIGHT_HOST ?? '127.0.0.1';
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://${HOST}:${PORT}`;
const WEB_COMMAND = process.env.PLAYWRIGHT_WEB_SERVER_COMMAND ?? `pnpm dev --hostname ${HOST} --port ${PORT}`;

export default defineConfig({
  testDir: '.',
  timeout: 60_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: BASE_URL,
    trace: 'off',
  },
  webServer: {
    command: WEB_COMMAND,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
