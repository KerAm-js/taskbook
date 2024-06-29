import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ITask } from "./type";

const initialState: ITask[] = [
  {
    id: "0",
    title: "Задача",
    date: new Date().setHours(0, 0, 0, 0),
    isCompleted: false,
    remindTime: new Date().setHours(20, 30, 0, 0),
  },
  {
    id: "1",
    title: "Задача 2",
    date: new Date().setHours(0, 0, 0, 0),
    isCompleted: false,
    isRegular: true,
  },
  {
    id: "2",
    title: "Задача 3",
    date: new Date().setHours(0, 0, 0, 0),
    isCompleted: false,
    description: "Это описание к задаче",
  },
  {
    id: "3",
    title: "Задача 4",
    date: new Date().setHours(0, 0, 0, 0),
    isCompleted: false,
  },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.unshift(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
    },
  },
});
