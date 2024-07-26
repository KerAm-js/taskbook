import { bindActionCreators, createSelector } from "@reduxjs/toolkit";
import { useCallback, useMemo } from "react";
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
  const ids = useSelector((state: RootState) => state.tasks.ids);
  return ids;
};

const selectTaskById = createSelector(
  [(state: RootState) => state.tasks.entities, (_, taskId: number) => taskId],
  (entities, taskId) => entities[taskId]
);

export const useTaskData = (id: number) => {
  const data = useSelector((state: RootState) => selectTaskById(state, id));
  return data || {};
};

export const useTaskToEdit = () => {
  const id = useSelector((state: RootState) => state.tasks.taskToEditId);
  return id;
};

export const useSelectedDate = () => {
  const date = useSelector((state: RootState) => state.tasks.selectedDate);
  return date;
};

export const useTasksForSelectedDate = () => {
  const tasks = useSelector((state: RootState) => state.tasks.filteredIds);
  return tasks;
};
