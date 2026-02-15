const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// --- SVG TRANSFORMER (MANDATORY) ---
config.transformer.babelTransformerPath =
  require.resolve('react-native-svg-transformer/expo');

config.resolver.assetExts = config.resolver.assetExts.filter(
  ext => ext !== 'svg'
);

config.resolver.sourceExts.push('svg');

// --- NATIVEWIND WRAP ---
module.exports = withNativeWind(config, {
  input: './global.css',
});
