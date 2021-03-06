/**
 * @type {import('ts-jest').InitialOptionsTsJest}
 */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: ['<rootDir>/unit/*.spec.*'],
  transform: {},
  globals: {
    'ts-jest': {
      useESM: true
    }
  }
}

export default config
