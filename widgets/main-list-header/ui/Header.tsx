import { StatusBar } from "expo-status-bar";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ProgressBar from "./ProgressBar";
import * as Haptics from "expo-haptics";
import NavBar from "./NavBar";
import { SCREEN_PADDING } from "@/shared/config/style/views";
import { CustomText, THEME_COLORS, useSafeAreaPadding } from "@/shared";
import Calendar from "./Calendar";

const CONTENT_HEIGHTS = {
  min: 0,
  mid: 89,
  max: 165,
};

const Header: FC<{
  scrollClamp: { value: number };
}> = ({ scrollClamp }) => {
  const [isCalendarOpened, setCalendarOpened] = useState<boolean>(false);
  const { paddingTop } = useSafeAreaPadding();

  const MIN_H = CONTENT_HEIGHTS.min;
  const MAX_H = isCalendarOpened ? CONTENT_HEIGHTS.max : CONTENT_HEIGHTS.mid;
  const TRANSLATE = CONTENT_HEIGHTS.max - CONTENT_HEIGHTS.mid;

  const height = useSharedValue(MAX_H);
  const opacity = useSharedValue(1);
  const calendarTranslate = useSharedValue(isCalendarOpened ? 0 : -TRANSLATE);

  const openCalendarAnim = (isOpened: boolean) => {
    height.value = withSpring(
      isOpened ? CONTENT_HEIGHTS.max : CONTENT_HEIGHTS.mid,
      {
        duration: 1000,
        dampingRatio: 0.48,
      }
    );
    calendarTranslate.value = withSpring(isOpened ? 0 : -TRANSLATE, {
      duration: 1000,
      dampingRatio: 0.48,
    });
  };

  const toggleHeaderVisibleAnim = (clamp: number) => {
    'worklet'
    opacity.value =
      clamp > 0
        ? withTiming(0, { duration: 100 })
        : withDelay(150, withTiming(1, { duration: 150 }));
    height.value = withTiming(clamp > 0 ? MIN_H : MAX_H);
  };

  const toggleCalendarOpened = () => {
    setCalendarOpened(!isCalendarOpened);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    openCalendarAnim(!isCalendarOpened);
  };

  const contentStyleAnim = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
      display: height.value === MIN_H ? "none" : "flex",
    };
  }, [height.value, opacity.value, isCalendarOpened]);

  const titleStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: isCalendarOpened
        ? withTiming(0, { duration: 80 })
        : withTiming(1, { duration: 80 }),
      position: "absolute",
      bottom: 10,
    };
  });

  const calendarStyleAnim = useAnimatedStyle(() => {
    return {
      zIndex: -1,
      transform: [{ translateY: calendarTranslate.value }],
      display: calendarTranslate.value === -TRANSLATE ? "none" : "flex",
      opacity: withTiming(isCalendarOpened ? 1 : 0, {
        duration: isCalendarOpened ? 150 : 80,
      }),
    };
  }, [isCalendarOpened]);

  useAnimatedReaction(
    () => scrollClamp.value,
    (curr, prev) => {
      if (prev === curr || (curr < 1 && curr > -1)) return;
      toggleHeaderVisibleAnim(scrollClamp.value);
    },
    [scrollClamp.value, isCalendarOpened]
  );

  return (
    <View style={[styles.container, { paddingTop }]}>
      <StatusBar style="light" />
      <Animated.View style={[contentStyleAnim]}>
        <NavBar
          isCalendarOpened={isCalendarOpened}
          toggleCalendarOpened={toggleCalendarOpened}
        />
        <Animated.View style={titleStyleAnim}>
          <CustomText style={styles.title} type="title-big" theme="night">
            today
          </CustomText>
        </Animated.View>
        <Animated.View style={calendarStyleAnim}>
          <Calendar isCalendarOpened={isCalendarOpened} />
        </Animated.View>
      </Animated.View>
      <ProgressBar progress={50} />
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.branded.accent,
    width: "100%",
  },
  title: {
    marginLeft: SCREEN_PADDING,
    color: THEME_COLORS.night.text,
  },
});
