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

export const Card: FC<ITask> = React.memo((task) => {
  console.log(task.id)
  const { deleteTask, toggleTask, toggleIsEditing } = useTaskActions();
  const translationX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const isOverdraggedRight = useSharedValue(false);
  const isOverdraggedLeft = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .minDistance(30)
    .onUpdate((event) => {
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
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
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
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
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

  const toggleButtonStyleAnim = useAnimatedStyle(
    () => ({
      opacity: withTiming(task.isEditing && !task.title ? 0 : 1),
    }),
    [task.isEditing]
  );

  const taskRowStyleAnim = useAnimatedStyle(
    () => ({
      transform: [{ translateX: withTiming(task.isEditing && !task.title ? -28 : 0) }],
    }),
    [task.isEditing]
  );

  return (
    <Animated.View
      entering={FadeInRight.duration(300).withInitialValues({
        transform: [{ translateX: 80 }],
      })}
    >
      <Pressable
        onPress={() => toggleIsEditing({ id: task.id })}
        style={styles.container}
      >
        <AnimatedIcon
          xmlGetter={layersSvg}
          opacity={opacity}
          isOverDragged={isOverdraggedRight}
          isOppositeOverDragged={isOverdraggedLeft}
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
              <Animated.View style={toggleButtonStyleAnim}>
                <ToggleTask
                  isCompleted={task.isCompleted}
                  onPress={() => toggleTask(task.id)}
                />
              </Animated.View>
              <Animated.View style={[taskRowStyleAnim, { flex: 1 }]}>
                <TaskRow {...task} />
              </Animated.View>
            </ThemedView>
          </GestureDetector>
        </Animated.View>
        <AnimatedIcon
          xmlGetter={trashSvg}
          opacity={opacity}
          isOverDragged={isOverdraggedLeft}
          isOppositeOverDragged={isOverdraggedRight}
        />
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    minHeight: 50,
    borderRadius: 12,
    borderCurve: "continuous",
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
