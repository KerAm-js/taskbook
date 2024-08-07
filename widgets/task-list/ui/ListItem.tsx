import React, { FC } from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeOut,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AnimatedIcon } from "./AnimatedIcon";
import { layersSvg } from "@/assets/svg/layers";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { Dimensions, StyleSheet } from "react-native";
import {
  ITask,
  useIsTaskEditing,
  useTaskActions,
  useTaskTitle,
} from "@/entities/task";
import { trashSvg } from "@/assets/svg/trash";
import { Card } from "./Card";
import { useKeyboard } from "@/shared";
import { DELETE_THRESHOLD, SELECT_THRESHOLD } from "../config/consts";
import { SelectionBackdrop } from "./SelectionBackdrop";

type TPropTypes = Pick<ITask, "id"> & {
  index: { value: number };
  isInitialRender: SharedValue;
};

const { width: WIDTH } = Dimensions.get("screen");

export const ListItem: FC<TPropTypes> = React.memo(
  ({ id, index, isInitialRender }) => {
    const isEditing = useIsTaskEditing(id);
    const title = useTaskTitle(id);
    const isOverdraggedRight = useSharedValue(false);
    const isOverdraggedLeft = useSharedValue(false);
    const translationX = useSharedValue(0);
    const opacity = useSharedValue(1);
    const keyboardHeight = useKeyboard();
    const { deleteTask, toggleTaskSelected } = useTaskActions();

    console.log("item", title);

    const panGesture = Gesture.Pan()
      .enabled(!isEditing)
      .minDistance(35)
      .onUpdate((event) => {
        if (!keyboardHeight.value) { 
          // can't swipe to select during this or other task edition
          translationX.value = event.translationX;
        }
        const x = translationX.value;
        if (x < SELECT_THRESHOLD && isOverdraggedRight.value) {
          isOverdraggedRight.value = false;
        }
        if (x >= SELECT_THRESHOLD && !isOverdraggedRight.value) {
          isOverdraggedRight.value = true;
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
        if (x > DELETE_THRESHOLD && isOverdraggedLeft.value) {
          isOverdraggedLeft.value = false;
        }
        if (x <= DELETE_THRESHOLD && !isOverdraggedLeft.value) {
          isOverdraggedLeft.value = true;
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      })
      .onEnd(() => {
        if (isOverdraggedLeft.value) {
          opacity.value = withTiming(0);
          translationX.value = withTiming(-WIDTH, undefined, (isFinished) => {
            if (isFinished) runOnJS(deleteTask)(id);
          });
        } else if (isOverdraggedRight.value) {
          translationX.value = withTiming(0);
          runOnJS(toggleTaskSelected)(id);
        } else {
          translationX.value = withTiming(0);
        }
      });

    const getIsSwiped = () => {
      return translationX.value !== 0;
    };

    const itemStyleAnim = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translationX.value }],
        opacity: opacity.value,
      };
    }, [translationX.value, opacity.value]);

    const entering = title
      ? isInitialRender.value
        ? FadeInDown.delay(60 * index.value)
        : FadeIn
      : FadeInRight.withInitialValues({
          transform: [{ translateX: 80 }],
        });

    return (
      <Animated.View
        style={styles.container}
        exiting={FadeOut.duration(150)}
        entering={entering}
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
          <Animated.View style={itemStyleAnim}>
            <Card id={id} getIsSwiped={getIsSwiped} />
            <SelectionBackdrop id={id} getIsSwiped={getIsSwiped} />
          </Animated.View>
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
