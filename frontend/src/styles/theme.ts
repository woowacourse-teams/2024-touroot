import { Theme } from "@emotion/react";

const theme: Theme = {
  typography: {
    mainText: `
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 1.25rem;
    `,
    mainTextBold: `
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 1.25rem;
    `,
    title: `
      font-weight: 700;
      font-size: 2.4rem;
      line-height: 2.17rem;
    `,
    detail: `
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 1.25rem;
    `,
    detailBold: `
      font-weight: 700;
      font-size: 1.2rem;
      line-height: 1.25rem;
    `,
  },
  color: {
    primary: "#0090ff",
    black: "#000000",
    darkGray: "#616161",
    borderGray: "#d9d9d9",
  },
};

export default theme;
