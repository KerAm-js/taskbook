import { AddNextTask } from "@/features/tasks/add-next-task";
import { COLORS, useKeyboard, useThemeColors } from "@/shared";
import { Keyboard, StyleSheet, View } from "react-native";
import { DoneBtn } from "./DoneBtn";
import { OpenTaskForm } from "@/features/tasks/open-task-form";
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export const TaskAddingMenu = () => {
  const { colors, theme } = useThemeColors();
  const keyboardHeight = useKeyboard();
  const opacity = useSharedValue(0);
  const translationY = useSharedValue(0);

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationY.value }],
      opacity: opacity.value,
      display: opacity.value === 0 ? "none" : "flex",
    };
  }, [translationY.value, opacity.value]);

  const toggleMenu = (mode: "up" | "down") => {
    'worklet';
    const easing = Easing.out(Easing.quad);
    const animationConfig = {
      duration: 350,
      easing,
    };
    if (mode === "up") {
      const delay = 50
      opacity.value = withDelay(delay, withTiming(1, animationConfig));
      translationY.value = withDelay(delay,withTiming(-keyboardHeight.value, animationConfig));
    } else {
      animationConfig.duration = 200;
      opacity.value = withTiming(0, animationConfig);
      translationY.value = withTiming(0, animationConfig);
    }
  };

  const pressDone = () => {
    Keyboard.dismiss();
  };

  useAnimatedReaction(
    () => keyboardHeight.value,
    (curr) => {
      if (curr) {
        toggleMenu("up");
      } else {
        toggleMenu("down");
      }
    }
  );

  return (
    <Animated.View
      style={[
        styles.container,
        theme === "night" && styles.containerNight,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.lineGrey,
        },
        containerStyleAnim,
      ]}
    >
      <OpenTaskForm />
      <View style={styles.leftSide}>
        <AddNextTask />
        <DoneBtn onPress={pressDone} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 9,
    shadowOffset: {
      height: -4,
      width: 0,
    },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    shadowColor: COLORS.shadow,
  },
  containerNight: {
    shadowOpacity: 0,
    borderTopWidth: 1,
  },
  leftSide: {
    flexDirection: "row",
  },
});
