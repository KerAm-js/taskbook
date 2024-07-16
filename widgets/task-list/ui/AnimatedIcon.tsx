import { COLORS, THEME_COLORS, useThemeColors } from "@/shared";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

export const AnimatedIcon: FC<{
  opacity: SharedValue<number>;
  isOverDragged: SharedValue<boolean>;
  xmlGetter: (color: string) => string;
  colorName?: keyof typeof THEME_COLORS.branded;
  color?: keyof typeof COLORS;
  side?: "left" | "right";
}> = ({
  opacity,
  isOverDragged,
  xmlGetter,
  colorName,
  color = "red",
  side = "right",
}) => {
  const colors = useThemeColors();

  const redIconStyleAnim = useAnimatedStyle(
    () => ({
      opacity: withTiming(isOverDragged.value ? 1 : 0),
    }),
    [isOverDragged.value]
  );

  const greyIconStyleAnim = useAnimatedStyle(
    () => ({
      opacity: withTiming(isOverDragged.value ? 0 : 1),
    }),
    [isOverDragged.value]
  );

  const containerStyleAnim = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    [opacity.value]
  );

  return (
    <Animated.View
      style={[styles.container, { [side]: 0 }, containerStyleAnim]}
    >
      <Animated.View style={[styles.iconContainer, { [side]: 20 }, redIconStyleAnim]}>
        <SvgXml
          width={26}
          height={26}
          xml={xmlGetter(colorName ? colors[colorName] : COLORS[color])}
        />
      </Animated.View>
      <Animated.View style={[styles.iconContainer, { [side]: 20 }, greyIconStyleAnim]}>
        <SvgXml width={26} height={26} xml={xmlGetter(colors.grey)} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: 100,
    zIndex: -1,
  },
  iconContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
  },
});
