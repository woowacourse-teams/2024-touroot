import React from "react";

import { Global, ThemeProvider } from "@emotion/react";

import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { withRouter } from "storybook-addon-remix-react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { handlers } from "../src/mocks/handlers/index";
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

const getRootStyle = (storyId: string) => ({
  width: "48rem",
  padding: storyId.startsWith("common-header--") ? 0 : "1.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

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
    (Story, context) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Global styles={globalStyle} />
            <div id="root">
              <div style={getRootStyle(context.id)}>
                <Story />
              </div>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      );
    },
    withRouter,
  ],
  loaders: [mswLoader],
};

export default preview;
