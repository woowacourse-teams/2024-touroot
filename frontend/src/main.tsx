import ReactDOM from "react-dom/client";

import { Global } from "@emotion/react";

import { globalStyle } from "@styles/globalStyle";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Global styles={globalStyle} />
    <App />
  </>,
);
