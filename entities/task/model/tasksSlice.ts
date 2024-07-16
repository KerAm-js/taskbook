import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "./type";

const initialState: ITask[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      return [action.payload, ...state];
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
    },
    setReminder: (
      state,
      action: PayloadAction<{ id: number; hours: number; minutes: number }>
    ) => {
      const { id, hours, minutes } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) task.remindTime = new Date().setHours(hours, minutes, 0, 0);
    },
    toggleIsEditing: (
      state,
      action: PayloadAction<{ id: number; title?: string }>
    ) => {
      const { id, title } = action.payload;
      const task = state.find((task) => task.id === id);
      console.log(id, title);
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
