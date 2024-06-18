import { FC, PropsWithChildren } from "react";
import { THEME_COLORS } from "../config/style/colors";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface IProps extends PropsWithChildren {
  colorName: keyof typeof THEME_COLORS.branded;
  style?: Array<ViewStyle | false> | ViewStyle;
  nightStyle?: Array<ViewStyle | false> | ViewStyle;
}

export const ThemedView: FC<IProps> = ({
  colorName,
  style,
  nightStyle,
  children,
}) => {
  const theme = useTheme();
  return (
    <View style={[{ backgroundColor: THEME_COLORS[theme][colorName]}, style, theme === 'night' && nightStyle]}>
      {children}
    </View>
  );
};
