import { THEME_COLORS, SCREEN_PADDING } from "@/shared";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const ProgressBar: FC<{ progress: number }> = ({ progress }) => {
  const progressStyleAnim = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress}%`),
    };
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, progressStyleAnim]} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME_COLORS.night.accent_opacity,
    marginBottom: 15,
    marginHorizontal: SCREEN_PADDING
  },
  progress: {
    height: 4,
    backgroundColor: THEME_COLORS.night.accent,
    borderRadius: 2,
    shadowColor: THEME_COLORS.night.accent,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.8,
  },
});
