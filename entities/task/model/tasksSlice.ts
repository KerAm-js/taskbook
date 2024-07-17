import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, TAddNextTaskPayload } from "./type";
import { i18n } from "@/shared";

const initialState: ITask[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state) => {
      const newTask = {
        id: new Date().valueOf(),
        title: "",
        isEditing: true,
        isCompleted: false,
        date: new Date().setHours(0, 0, 0, 0),
      };
      return [newTask, ...state];
    },

    addNextTask: (
      state,
      action: PayloadAction<TAddNextTaskPayload>
    ) => {
      const { prevTaskId, prevTaskTitle } = action.payload;
      const nextTask = {
        id: new Date().valueOf(),
        title: "",
        isEditing: true,
        isCompleted: false,
        date: new Date().setHours(0, 0, 0, 0),
      };
      const prevTask = state.find((task) => task.id === prevTaskId);
      if (prevTask) {
        prevTask.isEditing = false;
        prevTask.title = prevTaskTitle || i18n.t("newTask");
      }
      return [nextTask, ...state];
    },

    deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
      return state.filter((task) => task.id !== action.payload);
    },

    toggleTask: (state, action: PayloadAction<ITask["id"]>) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
    },

    setReminder: (
      state,
      action: PayloadAction<{ id: ITask["id"]; hours: number; minutes: number }>
    ) => {
      const { id, hours, minutes } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) task.remindTime = new Date().setHours(hours, minutes, 0, 0);
    },

    toggleIsEditing: (
      state,
      action: PayloadAction<{ id: ITask["id"]; title?: ITask["title"] }>
    ) => {
      const { id, title } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        if (title) {
          task.title = title;
          task.isEditing = false;
        } else {
          task.isEditing = true;
        }
      }
    },
  },
});
