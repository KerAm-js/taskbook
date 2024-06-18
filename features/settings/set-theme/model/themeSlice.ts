import { TTheme } from "@/shared/config/style/colors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IThemeState {
  theme: TTheme;
}

const initialState: IThemeState = {
  theme: "branded",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      state.theme = action.payload;
    },
  },
});