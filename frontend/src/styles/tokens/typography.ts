export const FONT_SIZES = {
  mobile: {
    xxxl: "3.2rem",
    xxl: "2.8rem",
    xl: "2.4rem",
    l: "2rem",
    m: "1.8rem",
    s: "1.6rem",
    xs: "1.4rem",
    xxs: "1.2rem",
  },
} as const;

export const TYPOGRAPHY = {
  mobile: {
    heading: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.xxxl};
      line-height: 1.5rem;
    `,
    title: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.xl};
      line-height: 1.5rem;
    `,
    subTitle: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.l};
      line-height: 1.5rem;
    `,
    body: `
      font-weight: 400;
      font-size: ${FONT_SIZES.mobile.s};
      line-height: 1.5rem;
    `,
    bodyBold: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.s};
      line-height: 1.5rem;
    `,
    detail: `
      font-weight: 400;
      font-size: ${FONT_SIZES.mobile.xxs};
      line-height: 1.5rem;
    `,
    detailBold: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.xxs};
      line-height: 1.5rem;
    `,
  },
} as const;
