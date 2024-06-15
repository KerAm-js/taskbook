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
import { useSageAreaPadding } from "@/shared/hooks/useSafeAreaPadding";
import { SCREEN_PADDING } from "@/shared/config/style/views";
import { CustomText, THEME_COLORS } from "@/shared";
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
  const { paddingTop } = useSageAreaPadding();

  const MIN_HEIGHT = CONTENT_HEIGHTS.min;
  const MAX_HEIGHT = isCalendarOpened
    ? CONTENT_HEIGHTS.max
    : CONTENT_HEIGHTS.mid;
  const TRANSLATE = CONTENT_HEIGHTS.max - CONTENT_HEIGHTS.mid;

  const height = useSharedValue(MAX_HEIGHT);
  const opacity = useSharedValue(1);
  const calendarTranslate = useSharedValue(isCalendarOpened ? 0 : -TRANSLATE);

  const toggleCalendarOpened = () => {
    const isOpened = !isCalendarOpened;
    setCalendarOpened(isOpened);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
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

  const contentStyleAnim = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
      display: height.value === MIN_HEIGHT ? "none" : "flex",
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
      opacity: isCalendarOpened
        ? withTiming(1, { duration: 150 })
        : withTiming(0, { duration: 80 }),
    };
  }, [isCalendarOpened]);

  useAnimatedReaction(
    () => scrollClamp.value,
    (curr, prev) => {
      if (prev === curr) return;
      if (curr < 1 && curr > -1) {
        return;
      }
      opacity.value =
        curr > 0
          ? withTiming(0, { duration: 100 })
          : withDelay(150, withTiming(1, {duration: 150}));
      height.value = withTiming(curr > 0 ? MIN_HEIGHT : MAX_HEIGHT);
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
