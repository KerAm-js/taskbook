import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ITask } from "../model/types";
import { ThemedInput, ThemedText } from "@/shared";
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
import { useTaskActions } from "../model/hooks";
import { findAndDeleteTime } from "../lib/findAndDeleteTime";
import { useTranslation } from "react-i18next";
import { useFastInputMode } from "@/entities/settings";

export const TaskRow: FC<ITask> = ({
  id,
  remindTime,
  title,
  isRegular,
  isEditing,
  isCompleted,
  description,
}) => {
  const [text, setText] = useState(title);
  const { t } = useTranslation();
  const { setIsEditing, setReminder } = useTaskActions();
  const fastInputMode = useFastInputMode();
  const remindDate = remindTime ? new Date(remindTime) : null;
  const remindString = remindDate
    ? remindDate.toTimeString().slice(0, 5)
    : null;

  const colorProgress = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const onBlur = () => {
    if (isEditing) {
      setIsEditing({ id, title: text.trim() || t("newTask"), value: false });
      if (!text.trim()) setText(t("newTask"));
    }
  };

  const onChangeText = (value: string) => {
    setText(value);
    const { newText, minutes, hours } = findAndDeleteTime(value);
    if (hours && minutes) {
      setReminder({
        id,
        hours: Number(hours),
        minutes: Number(minutes),
      });
      setText(newText);
    }
  };

  const styleAnim = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  }, [isCompleted]);

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    colorProgress.value = withTiming(isCompleted ? 1 : 0);
    if (isCompleted) {
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

  useEffect(() => {
    if (fastInputMode && text !== title) {
      setText(title);
    }
  }, [fastInputMode]);

  return (
    <Animated.View style={[styles.container, styleAnim]}>
      <View style={styles.titleContainer}>
        {fastInputMode ? (
          <ThemedInput
            style={styles.input}
            placeholder="Введите текст"
            onBlur={onBlur}
            autoFocus={isEditing}
            multiline
            value={text}
            onChangeText={onChangeText}
            maxLength={100}
            scrollEnabled={false}
          />
        ) : (
          <ThemedText style={styles.title}>{title}</ThemedText>
        )}
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
    paddingTop: 8,
    paddingBottom: 10,
  },
  containerNight: {
    shadowOpacity: 0,
  },
  title: {
    ...TEXT_STYLES.standart,
    lineHeight: 23,
    paddingVertical: 3,
  },
  input: {
    ...TEXT_STYLES.standart,
    textAlignVertical: "center",
  },
  titleContainer: {
    paddingRight: 15,
    flex: 1,
    justifyContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
