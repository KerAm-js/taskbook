import { themeSlice } from "@/features/settings/set-theme";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;