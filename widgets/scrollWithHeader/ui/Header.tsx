import { StatusBar } from "expo-status-bar";
import { FC, useState } from "react";
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
import { THEME_COLORS } from "@/shared/constants/colors";
import ThemeText from "@/shared/ui/themeText";
import { SCREEN_PADDING } from "@/shared/constants/views";
import { useSageAreaPadding } from "@/shared/hooks/useSafeAreaPadding";

const CONTENT_HEIGHTS = {
  min: 0,
  mid: 84,
  max: 145,
};

const Header: FC<{
  scrollsToBottom: { value: boolean };
}> = ({ scrollsToBottom }) => {
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

  useAnimatedReaction(
    () => scrollsToBottom.value,
    (curr, prev) => {
      if (prev === curr) return;
      opacity.value = scrollsToBottom.value
        ? withTiming(0, { duration: 100 })
        : withDelay(200, withTiming(1));
      height.value = withTiming(
        scrollsToBottom.value ? MIN_HEIGHT : MAX_HEIGHT
      );
    },
    [scrollsToBottom.value, isCalendarOpened]
  );

  const contentStyleAnim = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
    };
  }, [height.value, opacity.value]);

  const titleStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: isCalendarOpened
        ? withTiming(0, { duration: 80 })
        : withTiming(1, { duration: 80 }),
      position: "absolute",
      bottom: 9,
    };
  });

  const calendarStyleAnim = useAnimatedStyle(() => {
    return {
      zIndex: -1,
      transform: [{ translateY: calendarTranslate.value }],
      opacity: isCalendarOpened
        ? withTiming(1, { duration: 80 })
        : withTiming(0, { duration: 80 }),
    };
  }, [isCalendarOpened]);

  return (
    <View style={[styles.container, { paddingTop }]}>
      <StatusBar style="light" />
      <Animated.View style={[contentStyleAnim]}>
        <NavBar
          isCalendarOpened={isCalendarOpened}
          toggleCalendarOpened={toggleCalendarOpened}
        />
        <Animated.View style={titleStyleAnim}>
          <ThemeText style={styles.title} type="title-big" theme="night">
            today
          </ThemeText>
        </Animated.View>
        <Animated.View
          style={[
            {
              backgroundColor: THEME_COLORS.standart.accent,
              height: 91,
            },
            calendarStyleAnim,
          ]}
        >
          <ThemeText style={styles.title} type="title-big" theme="night">
            may
          </ThemeText>
        </Animated.View>
      </Animated.View>
      <ProgressBar progress={50} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.standart.accent,
    width: "100%",
  },
  title: {
    marginLeft: SCREEN_PADDING,
  },
});
