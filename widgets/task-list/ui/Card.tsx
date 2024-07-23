import { ITask, TaskRow, useTaskActions } from "@/entities/task";
import { ToggleTask } from "@/features/tasks/toggle-task";
import { COLORS, ThemedView, useKeyboard } from "@/shared";
import React, { FC, useEffect } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AnimatedIcon } from "./AnimatedIcon";
import { layersSvg } from "@/assets/svg/layers";
import { trashSvg } from "@/assets/svg/trash";
import { useFastInputMode } from "@/entities/settings";
import { router } from "expo-router";

const TASK_ADDING_MENU_HEIGHT = 40;
const DELETE_THRESHOLD = -150;
const SELECT_THRESHOLD = 60;
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export const Card: FC<ITask & { scroll: (value: number) => void }> = React.memo(
  ({ scroll, ...task }) => {
    const { deleteTask, toggleTask, setIsEditing, setTaskToEdit } =
      useTaskActions();
    const keyboardHeight = useKeyboard();
    const fastInputMode = useFastInputMode();

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const opacity = useSharedValue(1);
    const isOverdraggedRight = useSharedValue(false);
    const isOverdraggedLeft = useSharedValue(false);
    const viewPageY = useSharedValue(0);
    const viewHeight = useSharedValue(styles.card.minHeight);

    const panGesture = Gesture.Pan().enabled(translationY.value !== 0)
      .minDistance(35)
      .onUpdate((event) => {
        translationX.value = event.translationX;
        if (event.translationX < SELECT_THRESHOLD && isOverdraggedRight.value) {
          isOverdraggedRight.value = false;
        }
        if (
          event.translationX >= SELECT_THRESHOLD &&
          !isOverdraggedRight.value
        ) {
          isOverdraggedRight.value = true;
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
        if (event.translationX > DELETE_THRESHOLD && isOverdraggedLeft.value) {
          isOverdraggedLeft.value = false;
        }
        if (
          event.translationX <= DELETE_THRESHOLD &&
          !isOverdraggedLeft.value
        ) {
          isOverdraggedLeft.value = true;
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      })
      .onEnd((event) => {
        if (event.translationX > DELETE_THRESHOLD) {
          translationX.value = withSpring(0);
        } else {
          translationX.value = withTiming(-WIDTH);
          opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) runOnJS(deleteTask)(task.id);
          });
        }
      });

    const cardStyleAnim = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translationX.value },
          { translateY: translationY.value },
        ],
        zIndex: translationY.value < 0 ? 100 : 1,
        opacity: opacity.value,
        shadowOpacity: withTiming(task.isEditing ? 1 : 0.55),
        shadowRadius: withTiming(task.isEditing ? 10 : 14),
      };
    }, [translationX.value, translationY.value, task.isEditing, opacity.value]);

    const toggleButtonStyleAnim = useAnimatedStyle(
      () => ({
        opacity: withTiming(task.isEditing && !task.title ? 0 : 1),
      }),
      [task.isEditing]
    );

    const taskRowStyleAnim = useAnimatedStyle(
      () => ({
        transform: [
          { translateX: withTiming(task.isEditing && !task.title ? -28 : 0) },
        ],
      }),
      [task.isEditing]
    );

    const onPress = (event: GestureResponderEvent) => {
      if (fastInputMode) {
        event.currentTarget.measure((x, y, w, h, px, py) => {
          viewPageY.value = py;
          viewHeight.value = h;
          setIsEditing({ id: task.id, value: true });
        });
      } else {
        setTaskToEdit(task.id);
        router.navigate("taskForm");
      }
    };

    const onLayout = (event: LayoutChangeEvent) => {
      const newHeight = event.nativeEvent.layout.height;
      if (
        task.isEditing &&
        translationY.value < 0 &&
        newHeight !== viewHeight.value
      ) {
        translationY.value =
          translationY.value - (newHeight - viewHeight.value);
        viewHeight.value = newHeight;
      }
    };

    useEffect(() => {
      if (
        keyboardHeight &&
        task.isEditing &&
        viewPageY.value &&
        viewHeight.value
      ) {
        const absoluteTranslateY =
          keyboardHeight + viewHeight.value + TASK_ADDING_MENU_HEIGHT + 20;
        const result = absoluteTranslateY - (HEIGHT - viewPageY.value);
        translationY.value = withTiming(result > 0 ? -result : 0);
      } else if (keyboardHeight && !task.isEditing) {
        opacity.value = withTiming(0.3);
        translationY.value = withTiming(0);
      } else {
        translationY.value = withTiming(0);
        opacity.value = withTiming(1);
      }
    }, [keyboardHeight, task.isEditing]);

    return (
      <Animated.View
        exiting={FadeOut.duration(150)}
        entering={
          task.title
            ? FadeInDown
            : FadeInRight.withInitialValues({
                transform: [{ translateX: 80 }],
              })
        }
      >
        <Pressable
          onLayout={onLayout}
          onPress={onPress}
          style={styles.container}
        >
          <AnimatedIcon
            xmlGetter={layersSvg}
            opacity={opacity}
            isOverDragged={isOverdraggedRight}
            translationX={translationX}
            colorName="accent"
            side="left"
          />
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.shadow, cardStyleAnim]}>
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
            </Animated.View>
          </GestureDetector>
          <AnimatedIcon
            xmlGetter={trashSvg}
            opacity={opacity}
            isOverDragged={isOverdraggedLeft}
            translationX={translationX}
          />
        </Pressable>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    minHeight: 50,
    borderRadius: 12,
    borderCurve: "continuous",
  },
  shadow: {
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowColor: COLORS.shadow,
  },
  taskNight: {
    shadowOpacity: 0,
  },
});
