const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const appid = process.env.WEATHER_APPID || '';
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
    main: [path.join(src, 'index.js')],
  },

  externals: getExternals(),

  output: {
    path: dist,
    filename: 'widget.js',
    library: pkg.name,
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
      'process.env.WEATHER_APPID': JSON.stringify(appid),
    }),
  ]),
};
