import { THEME_COLORS } from "../config/style/colors";


export function useThemeColor(props: {
  colorName: keyof typeof THEME_COLORS.branded;
  theme?: keyof typeof THEME_COLORS;
}) {
  const currentTheme: keyof typeof THEME_COLORS = props.theme || "branded"
  return THEME_COLORS[currentTheme][props.colorName];
}
