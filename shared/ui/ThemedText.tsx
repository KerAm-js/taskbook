import { FC, PropsWithChildren } from "react";
import { Text, TextStyle } from "react-native";
import { TTheme } from "../config/style/colors";
import { useThemeColors } from "../hooks/useTheme";
import { TRANSLATIONS } from "../config/i18n/translations";

export interface IThemeTextProps extends PropsWithChildren {
  isTextGrey?: boolean;
  children: keyof typeof TRANSLATIONS.ru;
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
