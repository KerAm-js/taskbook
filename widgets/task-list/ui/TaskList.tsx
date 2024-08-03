import {
  LayoutAnimation,
  ListRenderItemInfo,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { PADDING_TOP, SCREEN_PADDING } from "@/shared";
import { Card } from "./Card";
import { EmptyListImage } from "./EmptyListImage";
import { useSelectedDate, useTaskEntities, useTaskIds } from "@/entities/task";
import { useSharedValue } from "react-native-reanimated";
import {
  updateDailyNotification,
  useReminderSettings,
} from "@/entities/settings";
import { useTranslation } from "react-i18next";

const keyExtractor = (item: number) => item.toString();

export const TaskList = () => {
  const taskIds = useTaskIds();
  const entities = useTaskEntities();
  const { t } = useTranslation();
  const {
    dailyReminder: { end, beginning },
  } = useReminderSettings();
  const selectedDate = useSelectedDate();
  const isInitialRender = useSharedValue(true);

  const completedTasksCount = useMemo(() => {
    return taskIds[selectedDate].reduce(
      (count, item) => (entities[item].isCompleted ? count + 1 : count),
      0
    );
  }, [entities]);

  useEffect(() => {
    isInitialRender.value = false;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [taskIds]);

  useEffect(() => {
    isInitialRender.value = true;
  }, [selectedDate]);

  useEffect(() => {
    const { hour, minute } = end;
    if (hour !== undefined && minute !== undefined) {
      for (let date in taskIds) {
        updateDailyNotification({
          type: "end",
          title: t("reviewOfTheDay"),
          body: t("tasksCompleted", {
            count: taskIds[date].length,
            completed: completedTasksCount,
          }),
          date: Number(date),
          hour,
          minute,
        });
      }
    }
  }, [end]);

  useEffect(() => {
    const { hour, minute } = beginning;
    if (hour !== undefined && minute !== undefined) {
      for (let date in taskIds) {
        updateDailyNotification({
          type: "beginning",
          title: t("plansForToday"),
          body: t("tasksToDo", { count: taskIds[date].length }),
          date: Number(date),
          hour,
          minute,
        });
      }
    }
  }, [beginning]);

  useEffect(() => {
    const { hour, minute } = beginning;
    if (hour !== undefined && minute !== undefined) {
      updateDailyNotification({
        type: "beginning",
        title: t("plansForToday"),
        body: t("tasksToDo", { count: taskIds[selectedDate].length }),
        date: selectedDate,
        hour,
        minute,
      });
    }
  }, [taskIds[selectedDate].length]);

  useEffect(() => {
    const { hour, minute } = end;
    if (hour !== undefined && minute !== undefined) {
      updateDailyNotification({
        type: "end",
        title: t("reviewOfTheDay"),
        body: t("tasksCompleted", {
          count: taskIds[selectedDate].length,
          completed: completedTasksCount,
        }),
        date: selectedDate,
        hour,
        minute,
      });
    }
  }, [completedTasksCount]);

  return (
    <FlatList
      scrollEventThrottle={16}
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={taskIds[selectedDate]}
      renderItem={({ item, index }: ListRenderItemInfo<number>) => {
        const i = { value: index };
        return <Card isInitialRender={isInitialRender} index={i} id={item} />;
      }}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyListImage}
    />
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingBottom: 200,
    paddingHorizontal: SCREEN_PADDING,
  },
  scroll: {
    flex: 1,
  },
});
