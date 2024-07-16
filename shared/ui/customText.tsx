import { FC } from "react";
import { Text, TextStyle } from "react-native";
import { i18n } from "../config/i18n/i18n";
import { IThemeTextProps, ThemedText } from "./ThemedText";
import { THEME_COLORS } from "../config/style/colors";

export const CustomText: FC<
  {
    themed?: boolean;
    translate?: boolean;
    colorName?: keyof typeof THEME_COLORS.branded;
  } & IThemeTextProps
> = ({
  translate = true,
  children,
  defaultTheme,
  colorName,
  themed,
  ...props
}) => {
  const string = translate ? i18n.t(children.toString()) : children;

  if (themed) {
    return (
      <ThemedText {...props} defaultTheme={defaultTheme}>
        {string}
      </ThemedText>
    );
  }

  const color =
    defaultTheme && colorName
      ? THEME_COLORS[defaultTheme][colorName]
      : undefined;

  return (
    <Text
      style={[
        {
          color,
        },
        props.style,
      ]}
    >
      {string}
    </Text>
  );
};
