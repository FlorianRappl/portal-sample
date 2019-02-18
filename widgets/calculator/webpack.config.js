const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const env = process.env.NODE_ENV || 'development';
const develop = env === 'development';

const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');

function getPlugins(plugins = []) {
  return plugins;
}

function getExternals() {
  return Object.keys(pkg.peerDependencies || {});
}

module.exports = {
  devtool: develop && 'source-map',

  entry: {
    main: [path.join(src, 'index.ts')],
  },

  externals: getExternals(),

  output: {
    path: dist,
    filename: 'widget.js',
    library: pkg.name,
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  plugins: getPlugins([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ]),
};
