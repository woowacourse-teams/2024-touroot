import React from "react";

import { Global, ThemeProvider } from "@emotion/react";

import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { handlers } from "../src/mocks/handlers";
import { globalStyle } from "../src/styles/globalStyle";
import theme from "../src/styles/theme";

initialize(
  {
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  },
  handlers,
);

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
  ],
  loaders: [mswLoader],
};

export default preview;
