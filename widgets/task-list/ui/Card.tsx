import { ITask, TaskRow, useIsTaskEditing, useTaskActions, useTaskData, useTaskTitle } from "@/entities/task";
import { ToggleTask } from "@/features/tasks/toggle-task";
import { ThemedView, useKeyboard, VIEW_SHADOW } from "@/shared";
import React, { FC } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFastInputMode } from "@/entities/settings";
import { router } from "expo-router";
import { TASK_ADDING_MENU_HEIGHT } from "../config/consts";

const { height: HEIGHT } = Dimensions.get("screen");

type TPropTypes = Pick<ITask, "id"> & { getIsSwiped: () => boolean };

export const Card: FC<TPropTypes> = React.memo(
  ({ id, getIsSwiped }) => {
    const isEditing = useIsTaskEditing(id);
    const title = useTaskTitle(id);
    const { startTaskEdition } = useTaskActions();
    const keyboardHeight = useKeyboard();
    const fastInputMode = useFastInputMode();
    const translationY = useSharedValue(0);
    const opacity = useSharedValue(1);
    const viewPageY = useSharedValue(0);
    const viewHeight = useSharedValue(styles.card.minHeight);

    console.log("card", title);

    const cardStyleAnim = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translationY.value }],
        zIndex: isEditing ? 100 : 1,
        opacity: opacity.value,
        shadowOpacity: withTiming(isEditing ? 1 : 0.7),
      };
    }, [translationY.value, isEditing, opacity.value]);

    const onPress = (event: GestureResponderEvent) => {
      if (getIsSwiped()) return;
      startTaskEdition(id);
      if (fastInputMode) {
        event.target.measure((x, y, w, h, px, py) => {
          viewPageY.value = py;
        });
      } else {
        router.navigate("taskForm");
      }
    };

    const onLayout = (event: LayoutChangeEvent) => {
      const newHeight = event.nativeEvent.layout.height;
      viewHeight.value = newHeight;
      if (
        isEditing &&
        translationY.value < 0 &&
        newHeight !== viewHeight.value
      ) {
        translationY.value =
          translationY.value - (newHeight - viewHeight.value);
      }
    };

    const moveOverKeyboard = (keyboardHeight: number) => {
      "worklet";
      const finalPosition =
        keyboardHeight + viewHeight.value + TASK_ADDING_MENU_HEIGHT + 30;
      const translation = finalPosition - (HEIGHT - viewPageY.value);
      translationY.value = withTiming(translation > 0 ? -translation : 0);
    };

    const toBackground = () => {
      "worklet";
      opacity.value = withTiming(0.3);
      translationY.value = withTiming(0);
    };

    const toForeground = () => {
      "worklet";
      translationY.value = withTiming(0);
      opacity.value = withTiming(1);
    };

    useAnimatedReaction(
      () => keyboardHeight.value,
      (curr) => {
        if (!fastInputMode) return;
        if (curr && isEditing) {
          moveOverKeyboard(curr);
        } else if (curr && !isEditing) {
          toBackground();
        } else {
          toForeground();
        }
      }
    );

    return (
      <ThemedView
        animated
        style={[styles.card, VIEW_SHADOW, cardStyleAnim]}
        nightStyle={styles.taskNight}
        colorName="background"
        nightColorName="backgroundSecond"
      >
        <ToggleTask id={id} />
        {/* use container and absolute position to handle onPress when user taps on TaskRow input */}
        <View style={styles.taskRowContainer}>
          <TaskRow id={id} />
          <Pressable
            style={[styles.pressable, { zIndex: isEditing ? 0 : 10 }]}
            onLayout={onLayout}
            onPress={onPress}
          />
        </View>
      </ThemedView>
    );
  },
  () => true
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    minHeight: 50,
    borderRadius: 10,
    borderCurve: "continuous",
  },
  taskNight: {
    shadowColor: "rgba(0, 0, 0, 0)",
  },
  taskRowContainer: {
    flex: 1,
  },
  pressable: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
