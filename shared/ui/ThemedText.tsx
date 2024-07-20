import { FC } from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { TTheme } from "../config/style/colors";
import { useThemeColors } from "../hooks/useTheme";

export interface IThemeTextProps extends TextProps {
  isTextGrey?: boolean;
  defaultTheme?: TTheme;
  style?: TextStyle | Array<TextStyle | false>;
}

export const ThemedText: FC<IThemeTextProps> = ({
  children,
  isTextGrey,
  defaultTheme,
  style,
}) => {
  const {
    colors: { text, textGrey },
  } = useThemeColors(defaultTheme);
  if (children) {
    return (
      <Text style={[{ color: isTextGrey ? textGrey : text }, style]}>
        {children}
      </Text>
    );
  }
};
