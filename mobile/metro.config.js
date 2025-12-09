/**
 * Metro config for Expo with SVG transformer support.
 *
 * This file starts from Expo's default Metro config and then:
 * - keeps the nested-folder blacklist used previously
 * - ensures `transformer.assetRegistryPath` is set
 * - configures `react-native-svg-transformer` when installed so `.svg`
 *   files can be imported as React components.
 */
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const projectRoot = __dirname;
const nestedFolder = path.resolve(projectRoot, 'my-expo-app');
const escaped = escapeRegExp(nestedFolder);
const blockRegex = new RegExp('^' + escaped + '([\\/]).*');

const config = getDefaultConfig(projectRoot);

// Preserve existing resolver and add our blacklist
config.resolver = config.resolver || {};
config.resolver.blacklistRE = blockRegex;
try {
  const exclusionList = require('metro-config/src/defaults/exclusionList');
  config.resolver.blockList = exclusionList([blockRegex]);
} catch (_) {
  // ignore if metro's helper isn't available
}

// Ensure assetRegistryPath exists (prevents missing-asset-registry-path errors)
config.transformer = config.transformer || {};
if (!config.transformer.assetRegistryPath) {
  try {
    config.transformer.assetRegistryPath = require.resolve(
      'react-native/Libraries/Image/AssetRegistry'
    );
  } catch (_) {
    // expo's default config usually sets this; swallow if not resolvable
  }
}

// Configure SVG transformer if available.
// This will make `import Icon from './icon.svg'` work as a React component.
try {
  const svgTransformer = require.resolve('react-native-svg-transformer');

  // Remove 'svg' from assetExts and add to sourceExts
  const assetExts = config.resolver.assetExts || [];
  const sourceExts = config.resolver.sourceExts || [];

  config.resolver.assetExts = assetExts.filter((ext) => ext !== 'svg');
  config.resolver.sourceExts = Array.from(new Set([...sourceExts, 'svg']));

  config.transformer.babelTransformerPath = svgTransformer;
} catch (_) {
  // If transformer isn't installed, leave config as-is; Metro will show
  // a descriptive error at runtime explaining that the transformer is missing.
}

module.exports = config;
