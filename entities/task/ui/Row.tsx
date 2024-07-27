import React, { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ITask } from "../model/types";
import { TaskInfo } from "./Info";
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
import { TaskTitle } from "./Title";
import { getTimeString } from "@/shared";
import { useTaskData } from "../model/hooks";

export const TaskRow: FC<Pick<ITask, "id">> = ({ id }) => {
  const task = useTaskData(id);
  const { remindTime, isRegular, isCompleted, description, isEditing, title } =
    task;

  const remindString = remindTime
    ? getTimeString({ dateNumber: remindTime })
    : null;

  const translateX = useSharedValue(isEditing && !title ? -28 : 0);
  const opacity = useSharedValue(isCompleted ? 0.4 : 1);

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  }, [isCompleted]);

  useEffect(() => {
    translateX.value = withTiming(isEditing && !title ? -28 : 0);
  }, [isEditing]);

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    if (isCompleted && opacity.value === 1) {
      translateX.value = withSequence(
        withTiming(7, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );
    }
    opacity.value = withDelay(
      isCompleted ? 700 : 0,
      withTiming(isCompleted ? 0.4 : 1)
    );
  }, [isCompleted]);

  return (
    <Animated.View style={[styles.container, containerStyleAnim]}>
      <TaskTitle {...task} />
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
    paddingTop: 10,
    paddingBottom: 8,
  },
  containerNight: {
    shadowOpacity: 0,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
