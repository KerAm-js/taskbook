import { FC } from "react";
import { Text } from "react-native";
import { IThemeTextProps, ThemedText } from "./ThemedText";
import { THEME_COLORS } from "../config/style/colors";
import { useTranslation } from "react-i18next";

export const CustomText: FC<
  {
    themed?: boolean;
    translate?: boolean;
  } & IThemeTextProps
> = ({
  translate = true,
  children,
  defaultTheme,
  colorName,
  themed,
  ...props
}) => {
  const { t } = useTranslation();
  const string = translate ? t(children?.toString() || "") : children;

  if (themed) {
    return (
      <ThemedText {...props} colorName={colorName} defaultTheme={defaultTheme}>
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
