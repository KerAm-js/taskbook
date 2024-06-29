import { ITask, TaskRow, useTaskActions } from "@/entities/task";
import { ToggleTask } from "@/features/tasks/toggle-task";
import { ThemedView } from "@/shared";
import React, { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInRight, FadeOut } from "react-native-reanimated";

export const Card: FC<ITask> = (task) => {
  const { deleteTask, toggleTask } = useTaskActions();
  return (
    <Animated.View
      entering={FadeInRight.duration(300).withInitialValues({
        transform: [{ translateX: 80 }],
      })}
      exiting={FadeOut.duration(300)}
    >
      <ThemedView
        style={styles.container}
        nightStyle={styles.containerNight}
        colorName="background"
        nightColorName="header"
      >
        <ToggleTask
          isCompleted={task.isCompleted}
          onPress={() => toggleTask(task.id)}
        />
        <TaskRow {...task} />
      </ThemedView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    minHeight: 50,
    borderRadius: 12,
    borderCurve: "continuous",
    paddingBottom: 8,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    shadowColor: "#DAE0EB",
  },
  containerNight: {
    shadowOpacity: 0,
  },
});
