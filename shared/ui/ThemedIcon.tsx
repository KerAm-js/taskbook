import { FC } from "react";
import { SvgProps, SvgXml } from "react-native-svg";
import { useThemeColors } from "../hooks/useTheme";
import { THEME_COLORS } from "../config/style/colors";

export const ThemedIcon: FC<
  SvgProps & {
    xmlGetter: (color: string) => string;
    colorName?: keyof typeof THEME_COLORS.branded;
  }
> = ({ xmlGetter, colorName = "accent", ...props }) => {
  const { colors } = useThemeColors();
  return <SvgXml xml={xmlGetter(colors[colorName])} {...props} />;
};
