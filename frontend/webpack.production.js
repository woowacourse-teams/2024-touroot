const { merge } = require("webpack-merge");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

const env = dotenv.config({ path: ".env.production" }).parsed;

module.exports = merge(common, {
  mode: "production",
  output: {
    publicPath: "/",
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "hidden-source-map",
  cache: {
    type: "filesystem",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    sentryWebpackPlugin({
      org: env.SENTRY_ORG,
      project: env.SENTRY_ORG,
      authToken: env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        filesToDeleteAfterUpload: "**/*.js.map",
      },
    }),
    /** TODO: 필요할 때 주석 해제해서 번들 사이즈 확인하기!  */
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: true,
    // }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
});
