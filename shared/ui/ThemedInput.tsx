import React, { ComponentPropsWithRef, FC } from "react";
import { TTheme } from "../config/style/colors";
import { TextInput } from "react-native-gesture-handler";
import { useThemeColors } from "../hooks/useTheme";

export interface IThemedInputProps extends ComponentPropsWithRef<TextInput> {
  defaultTheme?: TTheme;
}

export const ThemedInput: FC<IThemedInputProps> = ({
  defaultTheme,
  style,
  ...props
}) => {
  const {
    colors: { text, textGrey, accent },
    theme,
  } = useThemeColors(defaultTheme);

  return (
    <TextInput
      style={[{ color: text }, style]}
      placeholderTextColor={textGrey}
      selectionColor={accent}
      cursorColor={accent}
      keyboardAppearance={theme === "night" ? "dark" : "light"}
      {...props}
    />
  );
};
