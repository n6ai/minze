import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:3000/',
    browserName: 'chromium'
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI
  },
  testMatch: ['{e2e,integration}/**/*.spec.*']
}

export default config
