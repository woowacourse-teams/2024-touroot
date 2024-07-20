import React from "react";

import { Global, ThemeProvider } from "@emotion/react";

import type { Preview } from "@storybook/react";
import { withRouter } from "storybook-addon-remix-react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { globalStyle } from "../src/styles/globalStyle";
import theme from "../src/styles/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Global styles={globalStyle} />
            <Story />
          </ThemeProvider>
        </QueryClientProvider>
      );
    },
    withRouter,
  ],
};

export default preview;
