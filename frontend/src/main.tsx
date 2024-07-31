import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";

import { Global, ThemeProvider } from "@emotion/react";

import * as Sentry from "@sentry/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { globalStyle } from "@styles/globalStyle";
import theme from "@styles/theme";

import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],

  // Performance Monitoring
  tracesSampleRate: 1.0,
  // tracePropagationTargets: ["localhost", /^\//], // 이거 지우니 cors 에러 해결됨.

  // Session Replay
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <App />
    </ThemeProvider>
  </QueryClientProvider>,
);
