import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    typography: {
      mainText: string;
      mainTextBold: string;
      title: string;
      detail: string;
      detailBold: string;
    };
    color: {
      primary: string;
      black: string;
      darkGray: string;
      borderGray: string;
      white: string;
      yellow: string;
    };
  }
}
