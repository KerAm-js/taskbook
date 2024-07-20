import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "./types";

const initialState: {
  ids: Array<ITask["id"]>;
  data: { [key: ITask["id"]]: ITask };
  taskToEditId?: ITask["id"];
} = {
  ids: [],
  data: {},
  taskToEditId: undefined,
};

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
      state.data[newTask.id] = newTask;
      state.ids = [newTask.id, ...state.ids];
    },

    deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      delete state.data[action.payload];
    },

    toggleTask: (state, action: PayloadAction<ITask["id"]>) => {
      const task = state.data[action.payload];
      if (task) task.isCompleted = !task.isCompleted;
    },

    setReminder: (
      state,
      action: PayloadAction<{ id: ITask["id"]; hours: number; minutes: number }>
    ) => {
      const { id, hours, minutes } = action.payload;
      const task = state.data[id];
      if (task) task.remindTime = new Date().setHours(hours, minutes, 0, 0);
    },

    setIsEditing: (
      state,
      action: PayloadAction<{
        value: boolean;
        id: ITask["id"];
        title?: ITask["title"];
      }>
    ) => {
      const { id, title, value } = action.payload;
      const task = state.data[id];
      if (task) {
        task.isEditing = value;
        task.title = title || task.title;
      }
    },

    setTaskToEdit: (state, action: PayloadAction<ITask["id"]>) => {
      state.taskToEditId = action.payload;
    },
  },
});
