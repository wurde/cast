'use strict'

// See https://webpack.js.org/configuration for more about Webpack configuration.
// For `webpack-dev-server` see https://webpack.js.org/configuration/dev-server

/**
 * Dependencies
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Constants
 */

const env = process.env.NODE_ENV || 'development'
const is_production = env === 'production'

/**
 * Export configuration
 */

module.exports = {
  mode: env,
  // Entry module(s) used to build the dependency graph.
  entry: [
    path.resolve(__dirname, './client/src/index.js')
  ],
  // Where outputs should be created.
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'main.js'
  },
  module: {
    // Loaders are evaluated/executed from right to left (or from bottom to top).
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react', '@babel/env']
              }
            }
          },
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // Support for SASS (using .scss extensions).
          {
            test: /\.(scss|css)$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'sass-loader' }
            ]
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, './client/public/index.html')
        },
        is_production
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined
      )
    )
  ]
}
