import { AddTask } from "@/features/tasks/add-task";
import { Undo } from "@/features/tasks/undo";
import { SCREEN_PADDING, useSafeAreaPadding } from "@/shared";
import { StyleSheet, View } from "react-native";

export const MainFooter = () => {
  const { paddingBottom } = useSafeAreaPadding();
  return (
    <View style={[styles.container, { bottom: paddingBottom }]}>
      <Undo />
      <AddTask />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingHorizontal: SCREEN_PADDING,
    height: 54,
    width: "100%",
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end",
  },
});
