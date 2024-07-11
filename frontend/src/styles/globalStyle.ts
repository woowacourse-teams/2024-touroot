import { css } from "@emotion/react";

export const globalStyle = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    vertical-align: baseline;
    margin: 0;
    border: 0;
    padding: 0;
    font-size: 100%;
    font: inherit;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  * {
    user-select: none;
  }
  body {
    font-family: sans-serif;
  }
  ol,
  ul,
  li {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    cursor: pointer;
    outline: none;
    border: none;
    background-color: inherit;
    padding: 0;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }
  input[type="text"] {
    padding: 0;
    padding-inline: 0;
    padding-block: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: white;
    color: black;
    font-size: 1.6rem;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  #root {
    position: relative;

    margin: 0 auto;

    box-shadow: 0 0 0.315rem rgba(0, 0, 0, 0.25);

    background-color: white;
    min-width: 28rem;

    max-width: 48rem;

    min-height: 100vh;
  }
`;
