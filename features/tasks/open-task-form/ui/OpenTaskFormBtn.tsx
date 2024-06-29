import { plusSvg } from "@/assets/svg/plus";
import { SCREEN_PADDING, useSafeAreaPadding, useThemeColors } from "@/shared";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { SvgXml } from "react-native-svg";
import { useTaskActions } from "@/entities/task";

export const OpenTaskFormBtn = () => {
  const { addTask } = useTaskActions();
  const { paddingBottom } = useSafeAreaPadding();
  const scale = useSharedValue(1);
  const colors = useThemeColors();

  const buttonStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: colors.accent,
    };
  });

  const onPress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addTask({
      id: new Date().valueOf().toString(),
      title: "Task",
      isCompleted: false,
      date: new Date().setHours(0, 0, 0, 0),
      remindTime: new Date().setHours(23, 30, 0, 0),
    });
  };

  return (
      <Animated.View
        style={[
          styles.buttonContainer,
          { shadowColor: colors.accent, bottom: paddingBottom, right: SCREEN_PADDING },
          buttonStyleAnim,
        ]}
      >
        <Pressable onPress={onPress} style={styles.button}>
          <SvgXml xml={plusSvg(colors.background)} />
        </Pressable>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  buttonContainer: {
    width: 54,
    height: 54,
    borderRadius: 30,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    position: "absolute",
  },
  button: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
});
