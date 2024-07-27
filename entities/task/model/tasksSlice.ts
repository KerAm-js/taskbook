import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "./types";
import { endOfDay } from "@/shared";

interface ITasksState {
  taskToEditId?: ITask["id"];
  selectedDate: number;
  filteredIds: Array<ITask["id"]>;
  isSelection: boolean;
  ids: Array<ITask["id"]>;
  entities: { [key: ITask["id"]]: ITask };
}

const initialState: ITasksState = {
  ids: [],
  filteredIds: [],
  isSelection: false,
  entities: {},
  taskToEditId: undefined,
  selectedDate: endOfDay(),
};

const stopTaskEditing = (state: ITasksState) => {
  const taskToEditId = state.taskToEditId;
  if (taskToEditId) {
    state.entities[taskToEditId].isEditing = false;
    state.taskToEditId = undefined;
  }
  return taskToEditId;
};

const onEndSelection = (state: ITasksState) => {
  state.isSelection = false;
  state.filteredIds.forEach((id) => {
    state.entities[id].isSelected = false;
  });
};

const onAddTasks = (state: ITasksState, newTask: ITask) => {
  const { id } = newTask;
  state.entities[id] = newTask;
  state.ids = [id, ...state.ids];
  state.filteredIds = [id, ...state.filteredIds];
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
      onAddTasks(state, newTask);
      state.taskToEditId = id;
    },

    deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      state.filteredIds = state.filteredIds.filter(
        (id) => id !== action.payload
      );
      if (state.taskToEditId === action.payload) state.taskToEditId = undefined;
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
      stopTaskEditing(state);
      state.taskToEditId = id;
      state.entities[id].isEditing = true;
    },

    endTaskEdition: (
      state,
      action: PayloadAction<Pick<ITask, "id"> & Partial<ITask>>
    ) => {
      const { id, ...newData } = action.payload;
      const task = state.entities[id];
      state.entities[id] = { ...task, ...newData, isEditing: false };
      if (state.taskToEditId !== id) return; //it may happen only during add next task action;
      stopTaskEditing(state);
    },

    endSelection: (state) => {
      onEndSelection(state);
    },

    selectDate: (
      state,
      action: PayloadAction<ITasksState["selectedDate"] | undefined>
    ) => {
      // state.ids = [];
      // state.filteredIds = [];
      // state.entities = {};
      const selectedDate = action.payload || endOfDay();
      state.filteredIds = state.ids.filter((id) => {
        state.entities[id].isSelected = false;
        return state.entities[id].date === selectedDate;
      });
      state.isSelection = false;
      state.selectedDate = selectedDate;
    },

    toggleTaskSelected: (state, action: PayloadAction<ITask["id"]>) => {
      const id = action.payload;
      const task = state.entities[id];
      task.isSelected = !task.isSelected;
      if (task.isSelected && !state.isSelection) {
        state.isSelection = true;
      }
    },

    deleteSelectedTasks: (state) => {
      state.ids = state.ids.filter((id) => !state.entities[id].isSelected);
      state.filteredIds = state.filteredIds.filter((id) => {
        const { isSelected } = state.entities[id];
        if (isSelected) delete state.entities[id];
        return !isSelected;
      });
      onEndSelection(state);
    },

    changeSelectedTasksDate: (state, action: PayloadAction<ITask["date"]>) => {
      onEndSelection(state);
    },

    copySelectedTasks: (state) => {
      state.filteredIds.forEach((id, i) => {
        const task = state.entities[id];
        if (task.isSelected) {
          const newId = new Date().valueOf() + i * 10;
          const newTask: ITask = {
            ...task,
            id: newId,
            isCompleted: false,
            isEditing: false,
            isSelected: false,
          };
          onAddTasks(state, newTask);
        }
      });
      onEndSelection(state);
    },
  },
});
