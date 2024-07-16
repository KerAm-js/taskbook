import { ITask, TaskRow, useTaskActions } from "@/entities/task";
import { ToggleTask } from "@/features/tasks/toggle-task";
import { ThemedView } from "@/shared";
import React, { FC } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeInRight,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AnimatedIcon } from "./AnimatedIcon";
import { layersSvg } from "@/assets/svg/layers";
import { trashSvg } from "@/assets/svg/trash";

const TRANSLATE_THRESHOLD = 100;
const { width: WIDTH } = Dimensions.get("screen");

export const Card: FC<ITask> = (task) => {
  const { deleteTask, toggleTask } = useTaskActions();
  const translationX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const isOverdraggedRight = useSharedValue(false);
  const isOverdraggedLeft = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translationX.value = event.translationX;
      if (
        event.translationX < TRANSLATE_THRESHOLD &&
        isOverdraggedRight.value
      ) {
        isOverdraggedRight.value = false;
      }
      if (
        event.translationX >= TRANSLATE_THRESHOLD &&
        !isOverdraggedRight.value
      ) {
        isOverdraggedRight.value = true;
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Rigid);
      }
      if (
        event.translationX > -TRANSLATE_THRESHOLD &&
        isOverdraggedLeft.value
      ) {
        isOverdraggedLeft.value = false;
      }
      if (
        event.translationX <= -TRANSLATE_THRESHOLD &&
        !isOverdraggedLeft.value
      ) {
        isOverdraggedLeft.value = true;
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Rigid);
      }
    })
    .onEnd((event) => {
      if (event.translationX > -TRANSLATE_THRESHOLD) {
        translationX.value = withSpring(0);
      } else {
        translationX.value = withTiming(-WIDTH);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) runOnJS(deleteTask)(task.id);
        });
      }
    });

  const cardStyleAnim = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translationX.value }],
      opacity: opacity.value,
    }),
    [translationX.value, opacity.value]
  );

  return (
    <Animated.View
      entering={FadeInRight.duration(300).withInitialValues({
        transform: [{ translateX: 80 }],
      })}
    >
      <Pressable onPress={() => console.log(task.id)} style={styles.container}>
        <AnimatedIcon
          xmlGetter={layersSvg}
          opacity={opacity}
          isOverDragged={isOverdraggedRight}
          colorName="accent"
          side="left"
        />
        <Animated.View style={cardStyleAnim}>
          <GestureDetector gesture={panGesture}>
            <ThemedView
              style={styles.card}
              nightStyle={styles.taskNight}
              colorName="background"
              nightColorName="backgroundSecond"
            >
              <ToggleTask
                isCompleted={task.isCompleted}
                onPress={() => toggleTask(task.id)}
              />
              <TaskRow {...task} />
            </ThemedView>
          </GestureDetector>
        </Animated.View>
        <AnimatedIcon
          xmlGetter={trashSvg}
          opacity={opacity}
          isOverDragged={isOverdraggedLeft}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
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
  taskNight: {
    shadowOpacity: 0,
  },
});
