const path = require('path');
const webpack = require('webpack');
const ZipPlugin = require('zip-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const viewsPath = path.join(__dirname, 'views');
const sourcePath = path.join(__dirname, 'source');
const destPath = path.join(__dirname, 'extension');
const nodeEnv = process.env.NODE_ENV || 'development';
const targetBrowser = process.env.TARGET_BROWSER;

const extensionReloaderPlugin =
  nodeEnv === 'development'
    ? new ExtensionReloader({
        port: 9090,
        reloadPage: true,
        entries: {
          // TODO: reload manifest on update
          contentScript: 'contentScript',
          background: 'background',
          extensionPage: ['popup', 'options'],
        },
      })
    : () => {
        this.apply = () => {};
      };

const getExtensionFileType = (browser) => {
  if (browser === 'opera') {
    return 'crx';
  }

  if (browser === 'firefox') {
    return 'xpi';
  }

  return 'zip';
};

module.exports = {
  devtool: false, // https://github.com/webpack/webpack/issues/1194#issuecomment-560382342

  stats: {
    all: false,
    builtAt: true,
    errors: true,
    hash: true,
  },

  mode: nodeEnv,

  entry: {
    manifest: path.join(sourcePath, 'manifest.json'),
    background: path.join(sourcePath, 'Background', 'index.js'),
    contentScript: path.join(sourcePath, 'ContentScript', 'index.js'),
    popup: path.join(sourcePath, 'Popup', 'index.jsx'),
    options: path.join(sourcePath, 'Options', 'index.jsx'),
    home: path.join(sourcePath, 'Home', 'index.jsx'),
  },

  output: {
    path: path.join(destPath, targetBrowser),
    filename: 'js/[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'webextension-polyfill': path.resolve(
        path.join(__dirname, 'node_modules', 'webextension-polyfill')
      ),
    },
  },

  module: {
    rules: [
      {
        type: 'javascript/auto', // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
          loader: 'wext-manifest-loader',
          options: {
            usePackageJSONVersion: true, // set to false to not use package.json version for manifest
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // It creates a CSS file per JS file which contains CSS
          },
          {
            loader: 'css-loader', // Takes the CSS files and returns the CSS with imports and url(...) for Webpack
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', // For autoprefixer
            options: {
              ident: 'postcss',
              // eslint-disable-next-line global-require
              plugins: [require('autoprefixer')()],
            },
          },
          'resolve-url-loader', // Rewrites relative paths in url() statements
          'sass-loader', // Takes the Sass/SCSS file and compiles to the CSS
        ],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader' 
      }
    ],
  },

  plugins: [
    // Plugin to not generate js bundle for manifest entry
    new WextManifestWebpackPlugin(),
    // Generate sourcemaps
    new webpack.SourceMapDevToolPlugin({filename: false}),
    // environmental variables
    new webpack.EnvironmentPlugin(['NODE_ENV', 'TARGET_BROWSER']),
    // delete previous build files
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(process.cwd(), `extension/${targetBrowser}`),
        path.join(
          process.cwd(),
          `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`
        ),
      ],
      cleanStaleWebpackAssets: false,
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(viewsPath, 'popup.html'),
      inject: 'body',
      chunks: ['popup','home'],
      filename: 'popup.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(viewsPath, 'options.html'),
      inject: 'body',
      chunks: ['options'],
      filename: 'options.html',
    }),
    // write css file(s) to build folder
    new MiniCssExtractPlugin({filename: 'css/[name].css'}),
    // copy static assets
    new CopyWebpackPlugin([{from: 'source/assets', to: 'assets'}]),
    // plugin to enable browser reloading in development mode
    extensionReloaderPlugin,
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
      }),
      new ZipPlugin({
        path: destPath,
        extension: `${getExtensionFileType(targetBrowser)}`,
        filename: `${targetBrowser}`,
      }),
    ],
  },
};
