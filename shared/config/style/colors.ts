type TColorSet = {
  text: string;
  accent: string;
  accent_opacity: string;
  background: string;
  backgroundSecond: string;
  input: string;
  grey: string;
  textGrey: string;
  lineGrey: string;
  header: string;
};

export type TTheme = "branded" | "night" | "purple" | "darkBlue";

export const COLORS = {
  blue: "rgba(0, 104, 217, 1)",
  blueOpacity: "rgba(0, 104, 217, 0.25)",
  darkBlue: "rgba(64, 72, 101, 1)",
  darkBlueOpacity: "rgba(64, 72, 101, 0.25)",
  purple: "rgba(112, 109, 229, 1)",
  purpleOpacity: "rgba(112, 109, 229, 0.25)",
  green: "rgba(52, 199, 89, 1)",
  greenOpacity: "rgba(52, 199, 89, 0.1)",
  red: "rgba(255, 34, 22, 1)",
  redOpacity: "rgba(255, 34, 22, 0.1)",
  grey: "rgba(0, 0, 0, 0.25)",
  textGrey: "rgba(0, 0, 0, 0.4)",
  lineGrey: "rgba(0, 0, 0, 0.1)",
  whiteOpacity: "rgba(250, 250, 250, 0.25)",
  white: "#fff",
  input: "#f5f5f5",
  shadow: "#DAE0EB"
};

export const THEME_COLORS: {[key in TTheme]: TColorSet} = {
  branded: {
    text: "#000",
    accent: COLORS.blue,
    accent_opacity: COLORS.blueOpacity,
    background: COLORS.white,
    backgroundSecond: COLORS.input,
    input: COLORS.input,
    grey: COLORS.grey,
    textGrey: COLORS.textGrey,
    lineGrey: COLORS.lineGrey,
    header: COLORS.blue,
  },
  night: {
    text: COLORS.white,
    accent: COLORS.white,
    accent_opacity: COLORS.whiteOpacity,
    background: "#404865",
    backgroundSecond: COLORS.grey,
    input: COLORS.lineGrey,
    grey: COLORS.whiteOpacity,
    textGrey: "rgba(250, 250, 250, 0.4)",
    lineGrey: "rgba(250, 250, 250, 0.1)",
    header: COLORS.lineGrey,
  },
  darkBlue: {
    text: "#000",
    accent: COLORS.darkBlue,
    accent_opacity: COLORS.darkBlueOpacity,
    background: COLORS.white,
    backgroundSecond: COLORS.input,
    input: COLORS.input,
    grey: COLORS.grey,
    textGrey: COLORS.textGrey,
    lineGrey: COLORS.lineGrey,
    header: COLORS.darkBlue,
  },
  purple: {
    text: "#000",
    accent: COLORS.purple,
    accent_opacity: COLORS.purpleOpacity,
    background: COLORS.white,
    backgroundSecond: COLORS.input,
    input: COLORS.input,
    grey: COLORS.grey,
    textGrey: COLORS.textGrey,
    lineGrey: COLORS.lineGrey,
    header: COLORS.purple,
  },
};

// const THEME_INDEXES: {[key in TThemes]: number} = {
//   branded: 0,
//   purple: 1,
//   darkBlue: 2,
//   night: 3,
// }
