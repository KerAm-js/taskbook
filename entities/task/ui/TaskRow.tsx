import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ITask } from "../model/type";
import { useThemeColors } from "@/shared";
import { TaskInfo } from "./TaskInfo";
import { bellOutlineSvg } from "@/assets/svg/bellOutline";
import { repeatSvg } from "@/assets/svg/repeat";
import { noteSvg } from "@/assets/svg/note";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { TEXT_STYLE } from "@/shared/config/style/texts";

export const TaskRow: FC<ITask> = ({
  remindTime,
  title,
  isRegular,
  isCompleted,
  description,
}) => {
  const { text, textGrey } = useThemeColors();
  const remindDate = remindTime ? new Date(remindTime) : null;
  const remindString = remindDate
    ? remindDate.getHours() + ":" + remindDate.getMinutes()
    : null;

  const colorProgress = useSharedValue(0);
  const translateX = useSharedValue(0);

  const titleStyleAnim = useAnimatedStyle(() => {
    const color = interpolateColor(
      colorProgress.value,
      [0, 1],
      [text, textGrey]
    );
    return {
      color,
      transform: [{ translateX: translateX.value }],
    };
  }, [isCompleted]);

  useEffect(() => {
    const easing = Easing.out(Easing.quad)
    colorProgress.value = withTiming(isCompleted ? 1 : 0);
    if (isCompleted) {
      translateX.value = withSequence(
        withTiming(5, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );
    }
  }, [isCompleted]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Animated.Text style={[styles.title, titleStyleAnim]}>
          {title}
        </Animated.Text>
      </View>
      <View style={styles.infoContainer}>
        {remindString && (
          <TaskInfo xmlGetter={bellOutlineSvg} title={remindString} />
        )}
        {isRegular && (
          <TaskInfo translateTitle xmlGetter={repeatSvg} title="daily" />
        )}
        {description && (
          <TaskInfo translateTitle xmlGetter={noteSvg} title="note" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerNight: {
    shadowOpacity: 0,
  },
  title: {
    ...TEXT_STYLE,
  },
  titleContainer: {
    marginTop: 15,
    height: TEXT_STYLE.lineHeight,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
