import { widgetSvg } from "@/assets/svg/widget";
import { IconButton, useThemeColors } from "@/shared";
import { router } from "expo-router";

export const OpenTaskForm = () => {
  const { colors } = useThemeColors();
  const onPress = () => router.navigate("taskForm");
  return (
    <IconButton
      xml={widgetSvg(colors.accent)}
      onPress={onPress}
      width={24}
      height={24}
    />
  );
};
