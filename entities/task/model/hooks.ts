import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksSlice } from "./tasksSlice";
import { RootState } from "@/appLayer/store";

export const useTaskActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(tasksSlice.actions, dispatch),
    [dispatch]
  );
};

export const useTasks = () => {
  const data = useSelector((state: RootState) => state.tasks.data);
  const ids = useSelector((state: RootState) => state.tasks.ids);
  return { data, ids };
};

export const useTaskToEdit = () => {
  const id = useSelector((state: RootState) => state.tasks.taskToEditId);
  return id;
};
