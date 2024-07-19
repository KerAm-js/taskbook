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

const textOpacity = 0.45;
const opacity = 0.2;
const ultraOpacity = 0.08;

export type TTheme = "branded" | "night" | "purple" | "darkBlue";

export const COLORS = {
  black: '#000',
  blue: `rgba(0, 104, 217, 1)`,
  blueOpacity: `rgba(0, 104, 217, ${opacity})`,
  darkBlue: `rgba(64, 72, 101, 1)`,
  darkBlueOpacity: `rgba(64, 72, 101, ${opacity})`,
  purple: `rgba(112, 109, 229, 1)`,
  purpleOpacity: `rgba(112, 109, 229, ${opacity})`,
  green: `rgba(52, 199, 89, 1)`,
  greenOpacity: `rgba(52, 199, 89, ${ultraOpacity})`,
  red: `rgba(255, 34, 22, 1)`,
  redOpacity: `rgba(255, 34, 22, ${ultraOpacity})`,
  grey: `rgba(0, 0, 0, ${opacity})`,
  textGrey: `rgba(0, 0, 0, ${textOpacity})`,
  lineGrey: `rgba(0, 0, 0, ${ultraOpacity})`,
  whiteOpacity: `rgba(250, 250, 250, ${opacity})`,
  white: `#fff`,
  input: `#f2f3f4`,
  shadow: `#DAE0EB`,
};

export const THEME_GRADIENTS: { [key in TTheme]: Array<string> } = {
  branded: [`#004FA6`, `#007AFF`],
  night: [`#535D82`, `#363C55`],
  darkBlue: [`#363C55`, `#5F6B95`],
  purple: [`#464490`, `#7C78FF`],
};

export type TColorName = keyof typeof THEME_COLORS.branded;

export const THEME_COLORS: { [key in TTheme]: TColorSet } = {
  branded: {
    text: COLORS.black,
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
    background: `#404865`,
    backgroundSecond: "#363C55",
    input: COLORS.lineGrey,
    grey: COLORS.whiteOpacity,
    textGrey: `rgba(250, 250, 250, ${textOpacity})`,
    lineGrey: `rgba(250, 250, 250, ${ultraOpacity})`,
    header: "#363C55",
  },
  darkBlue: {
    text: COLORS.black,
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
    text: COLORS.black,
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
