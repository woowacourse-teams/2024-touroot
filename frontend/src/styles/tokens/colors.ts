export const PRIMITIVE_COLORS = {
  blue: {
    50: "#f3faff",
    100: "#badcff",
    200: "#8cc7ff",
    300: "#5cb1ff",
    400: "#35a1ff",
    500: "#0090ff",
    600: "#0e82f0",
    700: "#1370dd",
    800: "#145fca",
    900: "#153fab",
  },
  gray: {
    100: "#fafafa",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#222222",
  },
  black: "#000000",
  white: "#ffffff",
  green: "#2F8559",
} as const;

export const SEMANTIC_COLORS = {
  text: {
    primary: PRIMITIVE_COLORS.black,
    secondary: PRIMITIVE_COLORS.gray[700],
    tertiary: PRIMITIVE_COLORS.gray[500],
    detail: PRIMITIVE_COLORS.gray[400],
  },
  background: {
    cta: PRIMITIVE_COLORS.blue[900],
    disabled: PRIMITIVE_COLORS.gray[100],
  },
  border: PRIMITIVE_COLORS.gray[300],
  primary: PRIMITIVE_COLORS.blue[500],
  danger: "#ea0000",
  kakao: "#f9e007",
  dimmed: "#0000004d",
  skeleton: {
    base: PRIMITIVE_COLORS.gray[200],
    highlight: PRIMITIVE_COLORS.gray[100],
  },
} as const;
