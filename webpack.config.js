const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Customize the config before returning it.
  // Ignore "Failed to parse source map" warning
  config.ignoreWarnings = [
    {
      module: /parse5/,
      message: /Failed to parse source map/
    }, {
      module: /react-diff-view/,
      message: /Failed to parse source map/
    }
  ];

  config.module.rules.push({
    test: /web-views.*\.html$/,
    type: 'asset/source',
  });

  return config;
};
