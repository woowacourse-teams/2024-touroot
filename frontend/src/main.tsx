import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Global, ThemeProvider } from "@emotion/react";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>,
);
