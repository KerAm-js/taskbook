import { setNotification } from "@/shared";
import { ITask } from "../model/types";

export const setTaskNotification = (task: ITask) => {
  const { title, id, remindTime } = task;
  if (remindTime && remindTime > Date.now()) {
    setNotification({
      id,
      title: 'Taskbook',
      body: title,
      date: remindTime,
    });
  }
};
