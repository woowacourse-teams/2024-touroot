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
      line-height: ${FONT_SIZES.mobile.xxxl};
    `,
    title: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.xl};
      line-height: ${FONT_SIZES.mobile.xl};
    `,
    subTitle: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.l};
      line-height: ${FONT_SIZES.mobile.l};
    `,
    body: `
      font-weight: 400;
      font-size: ${FONT_SIZES.mobile.s};
      line-height:  ${FONT_SIZES.mobile.s};
    `,
    bodyBold: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.s};
      line-height: ${FONT_SIZES.mobile.s};
    `,
    detail: `
      font-weight: 400;
      font-size: ${FONT_SIZES.mobile.xxs};
      line-height:  ${FONT_SIZES.mobile.xxs};
    `,
    detailBold: `
      font-weight: 700;
      font-size: ${FONT_SIZES.mobile.xxs};
      line-height:${FONT_SIZES.mobile.xxs};
    `,
  },
} as const;
