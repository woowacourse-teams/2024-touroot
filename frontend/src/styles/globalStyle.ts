import { css } from "@emotion/react";

export const globalStyle = css`
  @font-face {
    font-family: Pretendard;

    font-weight: 900;
    font-display: swap;
    src: local("Pretendard") url("@assets/fonts/woff-subset/Pretendard-Black.subset.woff")
      format("woff");
  }

  @font-face {
    font-family: Pretendard;

    font-weight: 800;
    font-display: swap;
    src: local("Pretendard") url("@assets/fonts/woff-subset/Pretendard-ExtraBold.subset.woff")
      format("woff");
  }

  @font-face {
    font-family: Pretendard;

    font-weight: 700;
    font-display: swap;
    src: local("Pretendard") url("@assets/fonts/woff-subset/Pretendard-Bold.subset.woff")
      format("woff");
  }

  @font-face {
    font-family: Pretendard;

    font-weight: 600;
    font-display: swap;
    src: local("Pretendard") url("@assets/fonts/woff-subset/Pretendard-SemiBold.subset.woff")
      format("woff");
  }

  @font-face {
    font-family: Pretendard;

    font-weight: 500;
    font-display: swap;
    src: local("Pretendard") url("@assets/fonts/woff-subset/Pretendard-Medium.subset.woff")
      format("woff");
  }

  @font-face {
    font-family: Pretendard;

    font-weight: 400;
    font-display: swap;
    src: local("Pretendard") url("/@assets/fonts/woff-subset/Pretendard-Regular.subset.woff")
      format("woff");
  }

  @font-face {
    font-family: Pretendard;

    font-weight: 300;
    font-display: swap;
    src: local("Pretendard") url("@assets/fonts/woff-subset/Pretendard-Light.subset.woff")
      format("woff");
  }

  @font-face {
    font-family: Pretendard;

    font-weight: 200;
    font-display: swap;
    src: local("Pretendard") url("@assets/fonts/woff-subset/Pretendard-ExtraLight.subset.woff")
      format("woff");
  }

  @font-face {
    font-family: Pretendard;

    font-weight: 100;
    font-display: swap;
    src: local("Pretendard") url("@assets/fonts/woff-subset/Pretendard-Thin.subset.woff")
      format("woff");
  }

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
    margin: 0;
    padding: 0;
    border: 0;

    vertical-align: baseline;
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

  ol,
  ul,
  li {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    padding: 0;
    border: none;

    background-color: inherit;

    color: inherit;
    font-weight: inherit;
    font-size: inherit;
    cursor: pointer;
    outline: none;
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
    font-family: Pretendard, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  #root {
    position: relative;

    max-width: 48rem;
    min-width: 28rem;
    min-height: 100svh;
    margin: 0 auto;
    box-shadow: 0 0 0.315rem rgb(0 0 0 / 25%);

    background-color: white;
  }
`;
