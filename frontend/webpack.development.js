const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isLocal = process.env.NODE_ENV === "local";

module.exports = merge(common, {
  mode: isLocal ? "development" : "production",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
