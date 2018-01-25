const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const env = process.env.NODE_ENV || 'development';
const production = env === 'production';
const develop = !production;
const augment = require(`./webpack.config.${develop ? 'dev' : 'prod'}.js`);

const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');

function getPlugins(plugins = []) {
  if (production) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
        },
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
    );
  }

  return plugins;
}

function getExternals() {
  return Object.keys(pkg.peerDependencies || {});
}

module.exports = augment({
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
});
