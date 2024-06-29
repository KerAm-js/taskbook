import { tasksSlice } from "@/entities/task";
import { themeSlice } from "@/features/settings/set-theme";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
