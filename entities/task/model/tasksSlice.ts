import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, ITasksState } from "./types";
import { endOfDay } from "@/shared";

const initialState: ITasksState = {
  ids: [],
  entities: {},
  filteredIds: [],
  selectedDate: endOfDay(),
  isSelection: false,
  cache: {
    actionType: undefined,
    ids: [],
    entities: {},
    filteredIds: [],
    copiedIds: [],
  },
  taskToEditId: undefined,
};

const onClearCache = (state: ITasksState) => {
  if (state.cache.actionType) {
    state.cache = {
      actionType: undefined,
      ids: [],
      entities: {},
      filteredIds: [],
      copiedIds: [],
    };
  }
};

const updateCache = (
  state: ITasksState,
  actionType: ITasksState["cache"]["actionType"],
  copyTaskIds?: boolean
) => {
  const cache: ITasksState["cache"] = {
    actionType,
    ids: copyTaskIds ? [...state.ids] : [],
    filteredIds: copyTaskIds ? [...state.filteredIds] : [],
    entities: {},
    copiedIds: [],
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

const onUndoDelete = (state: ITasksState) => {
  state.ids = state.cache.ids;
  state.filteredIds = [];
  state.cache.filteredIds.forEach((id) => {
    state.filteredIds.push(id);
    if (!state.entities[id]) {
      state.entities[id] = state.cache.entities[id];
      state.entities[id].isSelected = false;
    }
  });
  onClearCache(state);
};

const onUndoCopy = (state: ITasksState) => {
  state.ids = state.cache.ids;
  state.filteredIds = state.cache.filteredIds;
  state.cache.copiedIds.forEach((id) => delete state.entities[id]);
  onClearCache(state);
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    onAppLoad: () => {},
    addTask: (state) => {
      onClearCache(state);
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
      const id = action.payload;
      if (!!state.entities[id].title) {
        updateCache(state, "deleteOne", true);
        state.cache.entities[id] = state.entities[id];
      }
      state.ids = state.ids.filter((item) => item !== id);
      state.filteredIds = state.filteredIds.filter((item) => {
        if (item === id) {
          delete state.entities[id];
          return false;
        }
        return true;
      });
      if (state.taskToEditId === action.payload) state.taskToEditId = undefined;
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
      state.entities[id] = { ...task, ...newData, isEditing: false };
      if (state.taskToEditId !== id) return; //it should happen only during add next task action;
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
      onClearCache(state);
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
      } else {
        const noSelectedTasks = !state.filteredIds.find(
          (id) => state.entities[id].isSelected
        ); //selected tasks should be only in filteredIds
        if (noSelectedTasks) {
          state.isSelection = false;
          onClearCache(state);
        }
      }
    },

    deleteSelectedTasks: (state) => {
      updateCache(state, "deleteOne", true);
      state.ids = state.ids.filter((id) => !state.entities[id].isSelected);
      let count = 0;
      state.filteredIds = state.filteredIds.filter((id) => {
        const { isSelected } = state.entities[id];
        if (isSelected) {
          state.cache.entities[id] = state.entities[id];
          delete state.entities[id];
          count++;
          return false;
        }
        return true;
      });
      if (count > 1) state.cache.actionType = "deleteMany";
      onEndSelection(state);
    },

    changeSelectedTasksDate: (state, action: PayloadAction<ITask["date"]>) => {
      updateCache(state, "changeDate", true);
      onEndSelection(state);
    },

    copySelectedTasks: (state) => {
      state.filteredIds.reduceRight((_, id, i) => {
        //use reduceRight to add tasks in the same order
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
        return 0;
      }, 0);
      onEndSelection(state);
    },

    undo: (state) => {
      const { actionType } = state.cache;
      if (actionType === "deleteOne" || actionType === "deleteMany") {
        onUndoDelete(state);
      } else if (actionType === "copyOne" || actionType === "copyMany") {
        onUndoCopy(state);
      }
    },

    clearCache: (state) => {
      onClearCache(state);
    },
  },
});
