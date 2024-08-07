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
import { ListItem } from "./ListItem";

const keyExtractor = (item: number) => item.toString();

export const TaskList = () => {
  const taskIds = useTaskIds();
  const entities = useTaskEntities();
  const { t } = useTranslation();
  const selectedDate = useSelectedDate();
  const {
    dailyReminder: { end, beginning },
  } = useReminderSettings();
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
    if (!end.turnedOff) {
      for (let date in taskIds) {
        updateDailyNotification({
          type: "end",
          title: t("reviewOfTheDay"),
          body: t("tasksCompleted", {
            count: taskIds[date].length,
            completed: completedTasksCount,
          }),
          date: Number(date),
          ...end,
        });
      }
    }
  }, [end]);

  useEffect(() => {
    if (!beginning.turnedOff) {
      for (let date in taskIds) {
        updateDailyNotification({
          type: "beginning",
          title: t("plansForToday"),
          body: t("tasksToDo", { count: taskIds[date].length }),
          date: Number(date),
          ...beginning,
        });
      }
    }
  }, [beginning]);

  useEffect(() => {
    if (!beginning.turnedOff) {
      updateDailyNotification({
        type: "beginning",
        title: t("plansForToday"),
        body: t("tasksToDo", { count: taskIds[selectedDate].length }),
        date: selectedDate,
        ...beginning,
      });
    }
  }, [taskIds[selectedDate].length]);

  useEffect(() => {
    if (!end.turnedOff) {
      updateDailyNotification({
        type: "end",
        title: t("reviewOfTheDay"),
        body: t("tasksCompleted", {
          count: taskIds[selectedDate].length,
          completed: completedTasksCount,
        }),
        date: selectedDate,
        ...end,
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
        return (
          <ListItem isInitialRender={isInitialRender} index={i} id={item} />
        );
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
