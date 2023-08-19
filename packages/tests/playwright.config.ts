import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:5173/',
    browserName: 'chromium'
  },
  webServer: {
    command: 'vite',
    port: 5173,
    reuseExistingServer: !process.env.CI
  },
  testMatch: ['e2e/**/*.spec.*']
}

export default config
