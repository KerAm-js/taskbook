import { FC, PropsWithChildren } from "react";
import { TColorName, THEME_COLORS } from "../config/style/colors";
import { View, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";
import Animated from "react-native-reanimated";

interface IProps extends ViewProps {
  colorName: TColorName;
  borderColorName?: TColorName;
  nightColorName?: TColorName;
  style?: Array<ViewStyle | false> | ViewStyle;
  nightStyle?: Array<ViewStyle | false> | ViewStyle;
  animated?: boolean;
}

export const ThemedView: FC<IProps> = ({
  colorName,
  borderColorName,
  nightColorName,
  style,
  nightStyle,
  children,
  animated,
  ...props
}) => {
  const theme = useTheme();
  const color =
    theme === "night" && nightColorName ? nightColorName : colorName;

  const styles = [
    style,
    {
      backgroundColor: THEME_COLORS[theme][color],
    },
    borderColorName && {
      borderColor: THEME_COLORS[theme][borderColorName],
    },
    theme === "night" && nightStyle,
  ];

  if (animated) {
    return (
      <Animated.View style={styles} {...props}>
        {children}
      </Animated.View>
    );
  }
  return (
    <View style={styles} {...props}>
      {children}
    </View>
  );
};
