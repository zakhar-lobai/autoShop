module.exports = {
  testTimeout: 120000,
  reporters: ['detox/runners/jest/streamlineReporter'],
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
};
