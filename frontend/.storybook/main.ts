import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import webpack from "webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-addon-remix-react-router",
  ],
  framework: "@storybook/react-webpack5",
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@assets": path.resolve(__dirname, "../src/assets"),
        "@styles": path.resolve(__dirname, "../src/styles"),
        "@apis": path.resolve(__dirname, "../src/apis"),
        "@mocks": path.resolve(__dirname, "../src/mocks"),
        "@constants": path.resolve(__dirname, "../src/constants"),
        "@type": path.resolve(__dirname, "../src/types"),
        "@queries": path.resolve(__dirname, "../src/queries"),
        "@hooks": path.resolve(__dirname, "../src/hooks"),
        "@contexts": path.resolve(__dirname, "../src/contexts"),
        "@utils": path.resolve(__dirname, "../src/utils"),
      };
    }
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    const imageRule = config.module.rules.find((rule) => rule?.["test"]?.test(".svg"));
    if (imageRule) {
      imageRule["exclude"] = /\.svg$/;
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    );

    return config;
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      },
    },
  }),
  staticDirs: ["../public"],
};
export default config;
