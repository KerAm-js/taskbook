import { plusSvg } from "@/assets/svg/plus";
import { SCREEN_PADDING, useSafeAreaPadding, useThemeColors } from "@/shared";
import { Pressable, StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import { useTaskActions } from "@/entities/task";
import { useFastInputMode } from "@/entities/settings";

export const AddTask = () => {
  const { addTask } = useTaskActions();
  const fastInputMode = useFastInputMode();
  const { paddingBottom } = useSafeAreaPadding();
  const { colors } = useThemeColors();

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (fastInputMode) {
      addTask();
    } else {
      router.navigate("taskForm");
    }
  };

  return (
    <View
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors.accent,
          bottom: paddingBottom,
          right: SCREEN_PADDING,
        },
      ]}
    >
      <Pressable onPress={onPress} style={styles.button}>
        <SvgXml xml={plusSvg(colors.background)} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    width: 54,
    height: 54,
    borderRadius: 30,
    position: "absolute",
  },
  button: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
});
