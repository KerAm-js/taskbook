import { FC, PropsWithChildren } from "react";
import { TColorName, THEME_COLORS } from "../config/style/colors";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface IProps extends PropsWithChildren {
  colorName: TColorName;
  nightColorName?: TColorName;
  style?: Array<ViewStyle | false> | ViewStyle;
  nightStyle?: Array<ViewStyle | false> | ViewStyle;
}

export const ThemedView: FC<IProps> = ({
  colorName,
  nightColorName,
  style,
  nightStyle,
  children,
}) => {
  const theme = useTheme();
  const color =
    theme === "night" && nightColorName ? nightColorName : colorName;
  return (
    <View
      style={[
        { backgroundColor: THEME_COLORS[theme][color] },
        style,
        theme === "night" && nightStyle,
      ]}
    >
      {children}
    </View>
  );
};
