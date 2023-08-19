import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'vite -m testing',
    port: 5173,
    reuseExistingServer: !process.env.CI
  },
  testMatch: ['test/**/*.test.*']
}

export default config
