import { createSlice, PayloadAction, Update } from "@reduxjs/toolkit";
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
      const id = new Date().valueOf();
      const newTask: ITask = {
        id,
        title: "",
        isCompleted: false,
        date: state.selectedDate,
        isEditing: true,
      };
      state.entities[id] = newTask;
      state.ids = [id, ...state.ids];
      state.filteredIds = [id, ...state.filteredIds];
      state.taskToEditId = id;
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

    setTaskTitle: (
      state,
      action: PayloadAction<Pick<ITask, "id" | "title">>
    ) => {
      const { id, title } = action.payload;
      state.entities[id].title = title;
    },

    startTaskEdition: (state, action: PayloadAction<ITask["id"]>) => {
      const id = action.payload;
      const { taskToEditId } = state;
      state.entities[id].isEditing = true;
      if (taskToEditId) {
        state.entities[taskToEditId].isEditing = false;
      }
      state.taskToEditId = id;
    },

    endTaskEdition: (
      state,
      action: PayloadAction<Pick<ITask, "id"> & Partial<ITask>>
    ) => {
      const { id, ...newData } = action.payload;
      const task = state.entities[id];
      state.entities[id] = { ...task, ...newData };

      const { taskToEditId } = state;
      if (taskToEditId) {
        state.entities[taskToEditId].isEditing = false;
      }
      state.taskToEditId = undefined;
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
