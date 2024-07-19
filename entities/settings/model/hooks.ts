import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsSlice } from "./settingsSlice";
import { RootState } from "@/appLayer/store";

export const useSettingsActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(settingsSlice.actions, dispatch),
    [dispatch]
  );
};
