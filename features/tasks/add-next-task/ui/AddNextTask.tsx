import { plusCircleSvg } from "@/assets/svg/plusCircle";
import { useTaskActions } from "@/entities/task";
import { IconButton } from "@/shared";

export const AddNextTask = () => {
  const { addTask } = useTaskActions();

  const onPress = () => {
    addTask();
  };

  return (
    <IconButton
      onPress={onPress}
      xmlGetter={plusCircleSvg}
      colorName="accent"
    />
  );
};
