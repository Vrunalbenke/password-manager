module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push([
    'react-native-unistyles/plugin',
    {
      autoProcessRoot: 'app',
      autoProcessImports: ['~/components'],
    },
    'react-native-reanimated/plugin',
  ]);

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
