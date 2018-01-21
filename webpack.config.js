const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const env = process.env.NODE_ENV || 'development';
const develop = env === 'development';
const production = env === 'production';
const port = process.env.PORT || 8080;

const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src', 'app');

function getEntrySources(sources = []) {
  if (develop) {
    sources.push(`webpack-dev-server/client?http://0.0.0.0:${port}`);
  }

  return sources;
}

function getPlugins(plugins = []) {
  plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(src, 'index.html'),
      title: `${pkg.name}, version ${pkg.version}-${env}`,
    })
  );

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

module.exports = {
  devtool: develop && 'source-map',

  entry: {
    main: getEntrySources([path.join(src, 'index.tsx')]),
  },

  output: {
    path: dist,
    filename: 'app.js',
  },

  devServer: {
    port,
    historyApiFallback: true,
    contentBase: dist,
    hot: true,
    inline: true,
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
