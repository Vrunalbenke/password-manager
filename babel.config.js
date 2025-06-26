module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push(['react-native-reanimated/plugin']);
  plugins.push(['inline-import', { extensions: ['.sql'] }]);
  plugins.push([
    'react-native-unistyles/plugin',
    {
      root: './',
      autoProcessRoot: 'app',
      autoProcessImports: ['~/components'],
    },
  ]);

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
