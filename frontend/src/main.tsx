import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";

import { Global, ThemeProvider } from "@emotion/react";

import * as Sentry from "@sentry/react";
import { startMocking } from "@utils/worker";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { globalStyle } from "@styles/globalStyle";
import theme from "@styles/theme";

import App from "./App";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],

  // Performance Monitoring
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^http:\/\/(dev\.)?touroot\.com$/],

  // Session Replay
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

startMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <App />
      </ThemeProvider>
    </QueryClientProvider>,
  );
});
