import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['line'],
    ['junit', { outputFile: 'test-results/api-junit-results.xml' }],
    [
      'allure-playwright',
      {
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          E2E_NODE_VERSION: process.version,
          E2E_OS: process.platform,
        },
      },
    ],
    ['json', { outputFile: 'test-results/playwright-results.json' }],
  ],
  testDir: './tests/api',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 8,
  timeout: 3000000,
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
    },
  ],
});
