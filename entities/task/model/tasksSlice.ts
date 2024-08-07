import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, ITasksState, TTaskActionType } from "./types";
import { deleteNotification, endOfDay } from "@/shared";
import { setTaskNotification } from "../lib/setTaskNotification";

const initialState: ITasksState = {
  idCounter: 0,
  ids: {
    [endOfDay()]: [],
  },
  entities: {},
  selectedDate: endOfDay(),
  isSelection: false,
  cache: {
    actionType: undefined,
    ids: [],
    entities: {},
  },
  taskToEditId: undefined,
};

const getTaskId = (state: ITasksState) => {
  const result = state.idCounter;
  state.idCounter++;
  return result;
};

const onClearCache = (state: ITasksState) => {
  if (state.cache.ids.length) {
    state.cache = {
      ids: [],
      entities: {},
      actionType: undefined,
    };
  }
};

const updateCache = (state: ITasksState, actionType: TTaskActionType) => {
  const cache: ITasksState["cache"] = {
    ids: [...state.ids[state.selectedDate]],
    entities: {},
    actionType,
  };
  state.cache = cache;
};

const stopTaskEditing = (state: ITasksState) => {
  const { taskToEditId } = state;
  if (taskToEditId) {
    state.entities[taskToEditId].isEditing = false;
    state.taskToEditId = undefined;
  }
  return taskToEditId;
};

const onEndSelection = (state: ITasksState) => {
  state.isSelection = false;
  state.ids[state.selectedDate].forEach((id) => {
    state.entities[id].isSelected = false;
  });
};

const onAddTask = (state: ITasksState, newTask: ITask) => {
  const { id } = newTask;
  state.entities[id] = newTask;
  state.ids[state.selectedDate] = [id, ...state.ids[state.selectedDate]];
};

const onUndoDelete = (state: ITasksState) => {
  state.ids[state.selectedDate] = state.cache.ids;
  state.cache.ids.forEach((id) => {
    if (!state.entities[id]) {
      state.entities[id] = state.cache.entities[id];
      state.entities[id].isSelected = false;
      setTaskNotification(state.entities[id]);
    }
  });
  onClearCache(state);
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    onAppLoad: () => {},
    addTask: (state) => {
      onClearCache(state);
      const id = getTaskId(state);
      const newTask: ITask = {
        id,
        title: "",
        isCompleted: false,
        date: state.selectedDate,
        isEditing: true,
      };
      onAddTask(state, newTask);
      state.taskToEditId = id;
    },

    deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
      const id = action.payload;
      if (!!state.entities[id].title) {
        updateCache(state, "deleteOne");
        state.cache.entities[id] = state.entities[id];
      }
      state.ids[state.selectedDate] = state.ids[state.selectedDate].filter(
        (item) => {
          if (item === id) {
            deleteNotification(id);
            delete state.entities[id];
          }
          return item !== id;
        }
      );
      if (state.taskToEditId === action.payload) state.taskToEditId = undefined;
    },

    toggleTask: (state, action: PayloadAction<ITask["id"]>) => {
      const task = state.entities[action.payload];
      if (task) {
        task.isCompleted = !task.isCompleted;
        if (task.isCompleted) deleteNotification(task.id);
      }
    },

    setReminder: (
      state,
      action: PayloadAction<{ id: ITask["id"]; hour: number; minute: number }>
    ) => {
      const { id, hour, minute } = action.payload;
      const task = state.entities[id];
      if (task) {
        const remindTime = new Date().setHours(hour, minute, 0, 0);
        task.remindTime = remindTime;
      }
    },

    setTaskTitle: (
      state,
      action: PayloadAction<Pick<ITask, "id" | "title">>
    ) => {
      const { id, title } = action.payload;
      state.entities[id].title = title;
    },

    startTaskEdition: (state, action: PayloadAction<ITask["id"]>) => {
      onClearCache(state);
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
      const newTask = { ...task, ...newData, isEditing: false };
      state.entities[id] = newTask;
      setTaskNotification(newTask);
      if (state.taskToEditId !== id) return; //it should happen only during add next task action;
      stopTaskEditing(state);
    },

    endSelection: (state) => {
      onEndSelection(state);
    },

    selectDate: (state, action: PayloadAction<number | undefined>) => {
      onClearCache(state);
      const date = action.payload || endOfDay();
      state.isSelection = false;
      state.selectedDate = date;
      if (!state.ids[date]) {
        state.ids[date] = [];
      }
    },

    toggleTaskSelected: (state, action: PayloadAction<ITask["id"]>) => {
      const id = action.payload;
      const task = state.entities[id];
      task.isSelected = !task.isSelected;
      if (task.isSelected && !state.isSelection) {
        state.isSelection = true;
      } else {
        const noSelectedTasks = !state.ids[state.selectedDate].find(
          (id) => state.entities[id].isSelected
        );
        if (noSelectedTasks) {
          state.isSelection = false;
          onClearCache(state);
        }
      }
    },

    deleteSelectedTasks: (state) => {
      updateCache(state, "deleteOne");
      let count = 0;
      state.ids[state.selectedDate] = state.ids[state.selectedDate].filter(
        (id) => {
          const { isSelected } = state.entities[id];
          if (isSelected) {
            state.cache.entities[id] = state.entities[id];
            deleteNotification(id);
            delete state.entities[id];
            count++;
          }
          return !isSelected;
        }
      );
      if (count > 1) state.cache.actionType = "deleteMany";
      onEndSelection(state);
    },

    changeSelectedTasksDate: (state, action: PayloadAction<ITask["date"]>) => {
      updateCache(state, "changeDate");
      onEndSelection(state);
    },

    copySelectedTasks: (state) => {
      state.ids[state.selectedDate].reduceRight((_, id) => {
        //use reduceRight to add tasks in the same order
        const task = state.entities[id];
        if (task.isSelected) {
          const newId = getTaskId(state);
          const newTask: ITask = {
            ...task,
            id: newId,
            isCompleted: false,
            isEditing: false,
            isSelected: false,
          };
          onAddTask(state, newTask);
        }
        return 0;
      }, 0);
      onEndSelection(state);
    },

    undo: (state) => {
      const { actionType } = state.cache;
      if (actionType === "deleteOne" || actionType === "deleteMany") {
        onUndoDelete(state);
      }
    },

    clearCache: (state) => {
      onClearCache(state);
    },
  },
});
