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
  const tasks = useSelector((state: RootState) => state.tasks.data);
  return tasks;
};

export const useTaskToEdit = () => {
  const {data, taskToEditId} = useSelector((state: RootState) => state.tasks);
  const task = data.find(task => task.id === taskToEditId);
  return task;
};
