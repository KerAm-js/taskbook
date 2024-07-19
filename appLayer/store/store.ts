import { settingsSlice } from "@/entities/settings";
import { tasksSlice } from "@/entities/task";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
