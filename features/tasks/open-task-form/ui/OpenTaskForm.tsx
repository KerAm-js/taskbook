import { widgetSvg } from "@/assets/svg/widget";
import { IconButton } from "@/shared";
import { router } from "expo-router";

export const OpenTaskForm = () => {
  const onPress = () => router.navigate("taskForm");
  return (
    <IconButton
      xmlGetter={widgetSvg}
      colorName="accent"
      onPress={onPress}
      width={24}
      height={24}
    />
  );
};
