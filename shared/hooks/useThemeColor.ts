import { THEME_COLORS } from "@/shared/constants/colors";

export function useThemeColor(props: {
  colorName: keyof typeof THEME_COLORS.standart;
  theme?: keyof typeof THEME_COLORS;
}) {
  const currentTheme: keyof typeof THEME_COLORS = props.theme || "standart"
  return THEME_COLORS[currentTheme][props.colorName];
}
