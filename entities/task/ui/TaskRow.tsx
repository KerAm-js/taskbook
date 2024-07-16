import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ITask } from "../model/type";
import { ThemedText } from "@/shared";
import { TaskInfo } from "./TaskInfo";
import { bellOutlineSvg } from "@/assets/svg/bellOutline";
import { repeatSvg } from "@/assets/svg/repeat";
import { noteSvg } from "@/assets/svg/note";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { TEXT_STYLES } from "@/shared/config/style/texts";

export const TaskRow: FC<ITask> = ({
  remindTime,
  title,
  isRegular,
  isCompleted,
  description,
}) => {
  const remindDate = remindTime ? new Date(remindTime) : null;
  const remindString = remindDate
    ? remindDate.getHours() + ":" + remindDate.getMinutes()
    : null;

  const colorProgress = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const easing = Easing.out(Easing.quad);

  const styleAnim = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  }, [isCompleted]);

  useEffect(() => {
    colorProgress.value = withTiming(isCompleted ? 1 : 0);
    if (isCompleted) {
      translateX.value = withSequence(
        withTiming(5, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );
    }
    opacity.value = withDelay(
      isCompleted ? 700 : 0,
      withTiming(isCompleted ? 0.4 : 1)
    );
  }, [isCompleted]);

  return (
    <Animated.View style={[styles.container, styleAnim]}>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.title}>{title}</ThemedText>
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
    </Animated.View>
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
    ...TEXT_STYLES.standart,
  },
  titleContainer: {
    marginTop: 15,
    height: TEXT_STYLES.standart.lineHeight,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
