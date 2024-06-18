import { plusSvg } from "@/assets/svg/plus";
import {
  SCREEN_PADDING,
  useSafeAreaPadding,
  useThemeColors,
} from "@/shared";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { SvgXml } from "react-native-svg";

export const OpenTaskFormBtn = () => {
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
  };

  return (
    <View style={[styles.container, { paddingBottom }]}>
      <Animated.View
        style={[
          styles.buttonContainer,
          { shadowColor: colors.accent },
          buttonStyleAnim,
        ]}
      >
        <Pressable onPress={onPress} style={styles.button}>
          <SvgXml xml={plusSvg(colors.background)} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    alignItems: "flex-end",
    paddingHorizontal: SCREEN_PADDING,
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
  },
  button: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
});
