const path = require('path');
const directory = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const webpackConfig = path.resolve(directory, 'webpack.config');
const metaPath = path.resolve(directory, 'package.json');
const entryPoint = path.join(directory, 'src/debug.js');
const package = require(metaPath);
const config = require(webpackConfig);
const port = 8080;

config.entry.main = [
  `webpack-dev-server/client?http://0.0.0.0:${port}`,
  entryPoint,
];
config.plugins.push(
  new HtmlWebpackPlugin(),
  new VirtualModulePlugin({
    moduleName: entryPoint,
    contents: `
      import * as lib from './index';
      import { createElement } from 'react';
      import { render } from 'react-dom';
      import { App } from '../../../src/app/components/app';

      lib.name = '${package.name}';
      lib.version = '${package.version}';
      lib.author = '${package.author}';

      const container = document.body.appendChild(document.createElement('div'));
      const app = createElement(App, { libs: [lib] });
      render(app, container);
    `,
  })
);
config.output.publicPath = '/';
config.externals = [];
config.devServer = {
  port: 8080,
  historyApiFallback: true,
};

module.exports = config;
