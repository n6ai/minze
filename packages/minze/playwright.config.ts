import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:5173/',
    browserName: 'chromium'
  },
  webServer: {
    command: 'vite -m testing',
    port: 5173,
    reuseExistingServer: !process.env.CI
  },
  testMatch: ['play/**/*.test.*']
}

export default config
