import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "./types";
import { endOfDay } from "@/shared";

interface ITasksState {
  taskToEditId?: ITask["id"];
  selectedDate: number;
  filteredIds: Array<ITask["id"]>;
  ids: Array<ITask["id"]>;
  entities: { [key: ITask["id"]]: ITask };
}

const initialState: ITasksState = {
  ids: [],
  filteredIds: [],
  entities: {},
  taskToEditId: undefined,
  selectedDate: endOfDay(),
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
        date: state.selectedDate,
      };
      state.entities[newTask.id] = newTask;
      state.ids = [newTask.id, ...state.ids];
      state.filteredIds = [newTask.id, ...state.filteredIds];
    },

    deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      state.filteredIds = state.filteredIds.filter(
        (id) => id !== action.payload
      );
      delete state.entities[action.payload];
    },

    toggleTask: (state, action: PayloadAction<ITask["id"]>) => {
      const task = state.entities[action.payload];
      if (task) task.isCompleted = !task.isCompleted;
    },

    setReminder: (
      state,
      action: PayloadAction<{ id: ITask["id"]; hours: number; minutes: number }>
    ) => {
      const { id, hours, minutes } = action.payload;
      const task = state.entities[id];
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
      const task = state.entities[id];
      if (task) {
        task.isEditing = value;
        task.title = title || task.title;
      }
    },

    setTaskToEdit: (state, action: PayloadAction<ITask["id"]>) => {
      state.taskToEditId = action.payload;
    },

    selectDate: (
      state,
      action: PayloadAction<ITasksState["selectedDate"] | undefined>
    ) => {
      const selectedDate = action.payload || endOfDay();
      state.filteredIds = state.ids.filter(
        (id) => state.entities[id].date === selectedDate
      );
      state.selectedDate = selectedDate;
    },
  },
});
