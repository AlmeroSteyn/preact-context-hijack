/* eslint-disable */
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const path = require('path')
const url = require('url')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// Paths
const ROOT = path.resolve(__dirname)
const BUILD_ROOT = path.join(ROOT, 'build')
const SRC_ROOT = path.join(ROOT, 'src')
const PUBLIC_ROOT = path.join(ROOT, 'public')

// Other constants
const BROWSERS = 'last 1 version, > 1%, not dead'

module.exports = async function(env = {}, argv = {}) {
  const PRODUCTION = argv.mode === 'production'
  let publicPath = '/dist/'

  const output = {
    filename: '[name].js',
    path: path.join(PUBLIC_ROOT, '/dist/'),
    publicPath,
    library: 'cvcoUi',
    libraryTarget: PRODUCTION ? 'umd' : 'global',
  }

  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[hash].css',
    }),
  ]

  if (PRODUCTION) {
    output.path = path.join(BUILD_ROOT, '/dist/')

    plugins.push(
      new CopyWebpackPlugin([
        {
          context: PUBLIC_ROOT,
          from: '**/*.html',
          to: BUILD_ROOT + '/',
          transform(content, path) {
            if (path.endsWith('public/index.html')) {
              let contentStr = content.toString()
              contentStr = contentStr.replace(
                ".src = '/dist/index.js",
                `.src = \'${publicPath}/test.js`,
              )
              contentStr = contentStr.replace(
                ".src = '/dist/styles.css",
                `.src = \'${publicPath}/styles.css`,
              )
              return contentStr
            }

            return content
          },
        },
      ]),
    )

    // Activate to run a bundle analysis
    // plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    entry: {
      styles: path.join(SRC_ROOT, '/stylesheets/styles.scss'),
      index: path.join(SRC_ROOT, '/javascripts/index.js'),
      test: path.join(SRC_ROOT, '/javascripts/test.js'),
    },
    output,
    plugins,
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      contentBase: PUBLIC_ROOT,
      publicPath,
      disableHostCheck: true,
    },
    resolve: {
      alias: {
        lib: path.resolve(SRC_ROOT, 'javascripts/lib/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: ['html-loader?interpolate'],
        },
        {
          test: /\.js$/,
          include: /node_modules[\\\/]+(debug|superagent)/,
          loader: 'babel-loader',
          query: {
            presets: [
              [
                '@babel/env',
                {
                  targets: BROWSERS,
                  modules: 'commonjs',
                },
              ],
            ],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              [
                '@babel/plugin-transform-runtime',
                {
                  absoluteRuntime: false,
                  helpers: true,
                  corejs: 3,
                  regenerator: true,
                  useESModules: true,
                },
              ],
            ],
          },
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: [
              [
                '@babel/env',
                {
                  targets: BROWSERS,
                },
              ],
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-object-rest-spread',
              [
                '@babel/plugin-transform-runtime',
                {
                  absoluteRuntime: false,
                  helpers: true,
                  corejs: 3,
                  regenerator: true,
                  useESModules: true,
                },
              ],
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'h',
                  pragmaFrag: 'Fragment',
                },
              ],
              ['babel-plugin-jsx-pragmatic', {
                module: 'preact',
                export: 'h',
                import: 'h'
              }]
            ],
          },
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 1000, // Inline everything below 1000 bytes
            name: '[path][name].[ext]',
            publicPath,
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV !== 'production',
              },
            },
            {
              loader: 'css-loader',
              options: {
                minimize: false,
                import: false,
                sourceMap: false,
                modules: false,
                url: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssPresetEnv({
                    browsers: BROWSERS,
                  }),
                  cssnano(),
                ],
                sourceMap: process.env.NODE_ENV !== 'production',
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [],
                precision: 10,
              },
            },
          ],
        },
      ],
    },
  }
}
