import { AnimatedCheck } from "@/shared";
import { FC, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

export const ToggleTask: FC<{ isCompleted: boolean; onPress: () => void }> = ({
  isCompleted,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Animated.View>
        <AnimatedCheck isChecked={isCompleted} borderRadius={6} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 15,
    paddingTop: 15,
  },
});
