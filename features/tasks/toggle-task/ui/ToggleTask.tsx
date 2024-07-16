import { AnimatedCheck } from "@/shared";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export const ToggleTask: FC<{ isCompleted: boolean; onPress: () => void }> = ({
  isCompleted,
  onPress,
}) => {
  const onPressHanlder = () => {
    onPress();
    if (!isCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
  };
  return (
    <Pressable style={styles.container} onPress={onPressHanlder}>
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
    height: 50,
    justifyContent: 'center',
  },
});
