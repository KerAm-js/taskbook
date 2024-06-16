import { plusSvg } from "@/assets/svg/plus";
import { SCREEN_PADDING, THEME_COLORS, useSafeAreaPadding } from "@/shared";
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
  const buttonStyleAnim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={[styles.container, { paddingBottom }]}>
      <Animated.View style={buttonStyleAnim}>
        <Pressable onPress={onPress} style={styles.button}>
          <SvgXml xml={plusSvg(THEME_COLORS.night.accent)} />
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
  button: {
    width: 54,
    height: 54,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME_COLORS.branded.accent,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
