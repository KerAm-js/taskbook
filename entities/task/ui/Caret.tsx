import { useThemeColors } from "@/shared";
import { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const Caret: FC<{ translateY?: number }> = ({ translateY = 0 }) => {
  const { colors } = useThemeColors();
  const opacity = useSharedValue(0);

  const caretStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor: colors.accent,
      transform: [{ translateY }],
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(withTiming(3, { duration: 500 }), -1, true);
  }, []);

  return <Animated.View style={[styles.caret, caretStyleAnim]} />;
};

const styles = StyleSheet.create({
  caret: {
    height: 21,
    width: 2,
    borderRadius: 1,
  },
});
