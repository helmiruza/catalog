const withSass = require("@zeit/next-sass")
const withCSS = require("@zeit/next-css")
const withOffline = require('next-offline')
const withPurgeCss = require('next-purgecss')

const sassConfig = {
  webpack: function (cssConfig) {
    cssConfig.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    return cssConfig
  },
  target: 'serverless',
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ]
  },
  env: {
    "BASE_URL": process.env.BASE_URL,
    "VERSION": process.env.VERSION,
    "S3_BUCKET_NAME": process.env.S3_BUCKET_NAME,
    "S3_ACCESS_KEY_ID": process.env.S3_ACCESS_KEY_ID,
    "S3_SECRET_ACCESS_KEY": process.env.S3_SECRET_ACCESS_KEY
  }
}

module.exports = withOffline(withCSS(withPurgeCss(withSass(sassConfig))))
