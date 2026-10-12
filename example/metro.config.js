const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
});

// Fix react-native-monorepo-config blockList on Windows:
// react-native-monorepo-config hardcodes forward slash (\/) which does not match Windows backslashes.
const rootNodeModules = path.resolve(root, 'node_modules');
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const blockedPackages = [
  'react',
  'react-native',
  'react-native-safe-area-context',
  'react-native-vector-icons',
  '@types/react',
];

const windowsBlockList = new RegExp(
  `^(${blockedPackages
    .map((pkg) => escapeRegex(path.join(rootNodeModules, pkg)))
    .join('|')})[\\\\/].*$`
);

const existingBlockList = config.resolver.blockList;
config.resolver.blockList = existingBlockList
  ? new RegExp(`(${existingBlockList.source}|${windowsBlockList.source})`)
  : windowsBlockList;

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  'react-native-safe-area-context': path.resolve(
    __dirname,
    'node_modules/react-native-safe-area-context'
  ),
};

const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (blockedPackages.includes(moduleName)) {
    return context.resolveRequest(
      {
        ...context,
        originModulePath: path.resolve(__dirname, 'index.js'),
      },
      moduleName,
      platform
    );
  }
  return originalResolveRequest(context, moduleName, platform);
};

module.exports = config;
