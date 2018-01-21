const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const env = process.env.NODE_ENV || 'development';
const develop = env === 'development';
const production = env === 'production';

const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');

function getPlugins(plugins = []) {
  if (production) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          keep_fnames: true
        },
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

module.exports = {
  devtool: develop && 'source-map',

  entry: {
    main: [
      path.join(src, 'polyfills.ts'),
      path.join(src, 'vendor.ts'),
      path.join(src, 'main.ts')
    ],
  },

  externals: getExternals(),

  output: {
    path: dist,
    filename: 'widget.js',
    library: pkg.name,
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { 
              configFileName: path.resolve(__dirname, 'tsconfig.json')
            }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: src,
        loader: ExtractTextPlugin.extract({ 
          fallbackLoader: 'style-loader',
          loader: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.css$/,
        include: src,
        loader: 'raw-loader'
      }
    ],
  },

  plugins: getPlugins([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      src,
      {} // map of routes
    ),
  ]),
};
