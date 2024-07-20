import { AddNextTask } from "@/features/tasks/add-next-task";
import { COLORS, useThemeColors } from "@/shared";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { DoneBtn } from "./DoneBtn";
import { OpenTaskForm } from "@/features/tasks/open-task-form";

export const TaskAddingMenu = () => {
  const { colors, theme } = useThemeColors();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => setVisible(true));
    Keyboard.addListener("keyboardWillHide", () => setVisible(false));
    return () => {
      Keyboard.removeAllListeners("keyboardWillShow");
      Keyboard.removeAllListeners("keyboardWillHide");
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={"position"}>
      {visible && (
        <View
          style={[
            styles.container,
            theme === "night" && styles.containerNight,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.lineGrey,
            },
          ]}
        >
          <OpenTaskForm />
          <View style={styles.leftSide}>
            <AddNextTask />
            <DoneBtn />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 9,
    shadowOffset: {
      height: -4,
      width: 0,
    },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    shadowColor: COLORS.shadow,
  },
  containerNight: {
    shadowOpacity: 0,
    borderTopWidth: 1,
  },
  leftSide: {
    flexDirection: "row",
  },
});
