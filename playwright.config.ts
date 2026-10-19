import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', {open: 'never'}]],
  use: {baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure'},
  webServer: {
    command: 'node tests/browser/serve.mjs',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
  },
  projects: [
    {name: 'chromium-desktop', use: {...devices['Desktop Chrome']}},
    {name: 'webkit-phone', use: {...devices['iPhone 13']}},
  ],
});
