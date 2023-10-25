module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  collectCoverage: true,
  coverageProvider: 'v8',
  testMatch: [ "**/?(*.)+(spec|test).[jt]s?(x)" ],
  watch: false
};