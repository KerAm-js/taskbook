import React, { FC } from "react";
import { TTheme } from "../config/style/colors";
import { useThemeColors } from "../hooks/useTheme";
import { TextInput, TextInputProps } from "react-native";

export interface IThemedInputProps extends TextInputProps {
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
