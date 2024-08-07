import { AnimatedCheck } from "@/shared";
import { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import {
  ITask,
  useIsTaskCompleted,
  useIsTaskEditing,
  useTaskActions,
  useTaskTitle,
} from "@/entities/task";
import { Sound } from "expo-av/build/Audio";

export const ToggleTask: FC<Pick<ITask, "id">> = ({ id }) => {
  const [sound, setSound] = useState<Sound | undefined>();
  const isCompleted = useIsTaskCompleted(id);
  const isEditing = useIsTaskEditing(id);
  const title = useTaskTitle(id);
  const { toggleTask } = useTaskActions();

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/audio/success.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const playSound = async () => {
    loadSound();
    // if (sound) {
    //   await sound.playAsync();
    // }
  };

  const onPressHanlder = () => {
    if (!isCompleted) {
      playSound();
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

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
