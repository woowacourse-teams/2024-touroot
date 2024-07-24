const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const DotenvWebpack = require("dotenv-webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/main.tsx",
  output: {
    filename: "touroot.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@apis": path.resolve(__dirname, "src/apis/"),
      "@mocks": path.resolve(__dirname, "src/mocks/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
      "@type": path.resolve(__dirname, "src/types/"),
      "@queries": path.resolve(__dirname, "src/queries/"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DotenvWebpack({
      path: path.resolve(__dirname, ".env.development"),
    }),
  ],
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
};
