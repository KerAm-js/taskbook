import { plusCircleSvg } from "@/assets/svg/plusCircle";
import { useTaskActions } from "@/entities/task";
import { IconButton, useThemeColors } from "@/shared";

export const AddNextTask = () => {
  const { addTask } = useTaskActions();
  const { colors } = useThemeColors();

  const onPress = () => {
    addTask();
  };

  return <IconButton onPress={onPress} xml={plusCircleSvg(colors.accent)} />;
};
