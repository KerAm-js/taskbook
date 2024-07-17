import { widgetSvg } from "@/assets/svg/widget";
import { IconButton, useThemeColors } from "@/shared";

export const OpenTaskForm = () => {
  const { colors } = useThemeColors();
  return (
    <IconButton
      xml={widgetSvg(colors.accent)}
      onPress={() => console.log("ok")}
      width={24}
      height={24}
    />
  );
};
