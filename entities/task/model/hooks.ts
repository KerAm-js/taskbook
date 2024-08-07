import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksSlice } from "./tasksSlice";
import { RootState } from "@/appLayer/store";
import { selectTaskById } from "./selectors";

export const useTaskActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(tasksSlice.actions, dispatch),
    [dispatch]
  );
};

export const useTaskData = (id: number) => {
  const data = useSelector((state: RootState) => selectTaskById(state, id));
  return data;
};

export const useTaskTitle = (id: number) => {
  const title = useSelector(
    (state: RootState) => state.tasks.entities[id]?.title
  );
  return title;
};

export const useIsTaskEditing = (id: number) => {
  const isEditing = useSelector(
    (state: RootState) => state.tasks.entities[id]?.isEditing
  );
  return isEditing;
};

export const useIsTaskCompleted = (id: number) => {
  const isCompleted = useSelector(
    (state: RootState) => state.tasks.entities[id]?.isCompleted
  );
  return isCompleted;
};

export const useTaskEntities = () => {
  const data = useSelector((state: RootState) => state.tasks.entities);
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

export const useTaskIds = () => {
  const tasks = useSelector((state: RootState) => state.tasks.ids);
  return tasks;
};

export const useIsSelection = () => {
  const value = useSelector((state: RootState) => state.tasks.isSelection);
  return value;
};

export const useCache = () => {
  const value = useSelector((state: RootState) => state.tasks.cache);
  return value;
};
