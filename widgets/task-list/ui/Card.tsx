import {
  ITask,
  TaskRow,
  useIsSelection,
  useTaskActions,
  useTaskData,
} from "@/entities/task";
import { ToggleTask } from "@/features/tasks/toggle-task";
import { ThemedView, useKeyboard, VIEW_SHADOW } from "@/shared";
import React, { FC } from "react";
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
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
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

export const Card: FC<Pick<ITask, "id"> & { index: { value: number } }> =
  React.memo(
    ({ id, index }) => {
      const task = useTaskData(id);
      const isSelection = useIsSelection();
      const { isEditing, isSelected, title, isCompleted } = task;
      const { deleteTask, toggleTask, startTaskEdition, toggleTaskSelected } =
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

      const panGesture = Gesture.Pan()
        .enabled(!isEditing)
        .minDistance(35)
        .onUpdate((event) => {
          translationX.value = event.translationX;
          if (
            event.translationX < SELECT_THRESHOLD &&
            isOverdraggedRight.value
          ) {
            isOverdraggedRight.value = false;
          }
          if (
            event.translationX >= SELECT_THRESHOLD &&
            !isOverdraggedRight.value
          ) {
            isOverdraggedRight.value = true;
            runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
          }
          if (
            event.translationX > DELETE_THRESHOLD &&
            isOverdraggedLeft.value
          ) {
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
          const x = event.translationX;
          if (x <= DELETE_THRESHOLD) {
            opacity.value = withTiming(0);
            translationX.value = withTiming(-WIDTH, undefined, (isFinished) => {
              if (isFinished) runOnJS(deleteTask)(id);
            });
          } else if (x >= SELECT_THRESHOLD) {
            translationX.value = withTiming(0);
            runOnJS(toggleTaskSelected)(id);
          } else {
            translationX.value = withTiming(0);
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
          shadowOpacity: withTiming(isEditing ? 1 : 0.7),
        };
      }, [translationX.value, translationY.value, isEditing, opacity.value]);

      const toggleButtonStyleAnim = useAnimatedStyle(
        () => ({
          opacity: withTiming(isEditing && !title ? 0 : 1),
        }),
        [isEditing]
      );

      const taskRowStyleAnim = useAnimatedStyle(
        () => ({
          transform: [
            { translateX: withTiming(isEditing && !title ? -28 : 0) },
          ],
        }),
        [isEditing]
      );

      const onPress = (event: GestureResponderEvent) => {
        if (translationX.value !== 0) return;
        startTaskEdition(id);
        if (fastInputMode) {
          event.target.measure((x, y, w, h, px, py) => {
            viewPageY.value = py;
          });
        } else {
          router.navigate("taskForm");
        }
      };

      const onSelect = () => {
        if (translationX.value === 0) toggleTaskSelected(id);
      };

      const onLayout = (event: LayoutChangeEvent) => {
        const newHeight = event.nativeEvent.layout.height;
        if (
          isEditing &&
          translationY.value < 0 &&
          newHeight !== viewHeight.value
        ) {
          translationY.value =
            translationY.value - (newHeight - viewHeight.value);
          viewHeight.value = newHeight;
        }
      };

      useAnimatedReaction(
        () => keyboardHeight.value,
        (curr) => {
          if (curr && isEditing && viewPageY.value && viewHeight.value) {
            const absoluteTranslateY =
              curr + viewHeight.value + TASK_ADDING_MENU_HEIGHT + 20;
            const result = absoluteTranslateY - (HEIGHT - viewPageY.value);
            translationY.value = withTiming(result > 0 ? -result : 0);
          } else if (curr && !isEditing) {
            opacity.value = withTiming(0.3);
            translationY.value = withTiming(0);
          } else {
            translationY.value = withTiming(0);
            opacity.value = withTiming(1);
          }
        }
      );

      return (
        <Animated.View
          exiting={FadeOut.duration(150)}
          style={styles.container}
          entering={
            title
              ? FadeInDown.delay(60 * index.value)
              : FadeInRight.withInitialValues({
                  transform: [{ translateX: 80 }],
                })
          }
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
            <ThemedView
              animated
              style={[styles.card, VIEW_SHADOW, cardStyleAnim]}
              nightStyle={styles.taskNight}
              colorName="background"
              nightColorName="backgroundSecond"
            >
              {isSelection && (
                <Pressable onPress={onSelect} style={styles.selectionPressable}>
                  {isSelected && (
                    <Animated.View
                      entering={FadeIn}
                      exiting={FadeOut}
                      style={styles.selectionBackdrop}
                    >
                      <ThemedView
                        style={styles.selectionBackdrop}
                        colorName="accent_opacity"
                      />
                    </Animated.View>
                  )}
                </Pressable>
              )}
              <Animated.View style={toggleButtonStyleAnim}>
                <ToggleTask
                  isCompleted={isCompleted}
                  onPress={() => toggleTask(id)}
                />
              </Animated.View>
              <Animated.View style={[taskRowStyleAnim, { flex: 1 }]}>
                <TaskRow {...task} />
                <Pressable
                  style={[styles.pressable, { zIndex: isEditing ? 0 : 100 }]}
                  onLayout={onLayout}
                  onPress={onPress}
                />
              </Animated.View>
            </ThemedView>
          </GestureDetector>
          <AnimatedIcon
            xmlGetter={trashSvg}
            opacity={opacity}
            isOverDragged={isOverdraggedLeft}
            translationX={translationX}
          />
        </Animated.View>
      );
    },
    () => true
  );

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    minHeight: 50,
    borderRadius: 10,
    borderCurve: "continuous",
  },
  taskNight: {
    shadowColor: "rgba(0, 0, 0, 0)",
  },
  pressable: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  selectionPressable: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  selectionBackdrop: {
    flex: 1,
    borderRadius: 10,
    borderCurve: "continuous",
  },
});
