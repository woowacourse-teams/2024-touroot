import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";

import { Global, ThemeProvider } from "@emotion/react";

import * as Sentry from "@sentry/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ToastProvider from "@contexts/ToastProvider/ToastProvider";

import { startMocking } from "@utils/worker";

import { globalStyle } from "@styles/globalStyle";
import theme from "@styles/theme";

import App from "./App";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],

  // Performance Monitoring
  tracesSampleRate: 1.0,

  // Session Replay
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,

  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== "development",
});

if (process.env.GA4_KEY) ReactGA.initialize(process.env.GA4_KEY);

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
        <ToastProvider>
          <Global styles={globalStyle} />
          <App />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
});
