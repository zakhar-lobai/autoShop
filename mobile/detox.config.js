/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    type: 'jest',
    runnerConfig: 'e2e/jest.config.js',
  },
  apps: {
    'ios.sim.debug': {
      type: 'ios.app',
      build: 'expo run:ios --configuration Debug --no-install',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/mobile.app',
    },
    'android.emu.debug': {
      type: 'android.apk',
      build: 'expo run:android --variant Debug',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_6_API_35',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.sim.debug',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.emu.debug',
    },
  },
};
