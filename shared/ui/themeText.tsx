import { FC } from "react";
import { Text, TextStyle } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { THEME_COLORS } from "../config/style/colors";

export interface IThemeTextProps {
  isTextGrey?: boolean;
  children: string;
  theme?: keyof typeof THEME_COLORS;
  style?: TextStyle | Array<TextStyle>;
}

export const ThemeText: FC<IThemeTextProps> = ({
  children,
  isTextGrey,
  theme,
  style,
}) => {
  const color = useThemeColor({
    colorName: isTextGrey ? "textGrey" : "text",
    theme,
  });

  return <Text style={[{ color }, style]}>{children}</Text>;
};
