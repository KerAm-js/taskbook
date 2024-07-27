import { AnimatedCheck } from "@/shared";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { ITask, useTaskActions, useTaskData } from "@/entities/task";

export const ToggleTask: FC<Pick<ITask, "id">> = ({ id }) => {
  const { isCompleted, title, isEditing } = useTaskData(id);
  const { toggleTask } = useTaskActions();

  const onPressHanlder = () => {
    if (!isCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
    toggleTask(id);
  };

  const toggleButtonStyleAnim = useAnimatedStyle(
    () => ({
      opacity: withTiming(isEditing && !title ? 0 : 1),
    }),
    [isEditing]
  );

  return (
    <Animated.View style={toggleButtonStyleAnim}>
      <Pressable style={styles.container} onPress={onPressHanlder}>
        <AnimatedCheck isChecked={isCompleted} borderRadius={6} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 15,
    height: 50,
    justifyContent: "center",
  },
});
