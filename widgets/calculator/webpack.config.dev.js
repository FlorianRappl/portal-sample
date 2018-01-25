const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(config) {
  config.entry.main = [
    `webpack-dev-server/client?http://0.0.0.0:${8080}`,
    path.join(__dirname, 'src/debug.tsx'),
  ];
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../../src/app/index.html'),
      title: `My cool website`,
    })
  );
  config.externals = [];
  return config;
};
