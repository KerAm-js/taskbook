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
  const selectedDate = useSelector(
    (state: RootState) => state.tasks.selectedDate
  );

  const filteredIds = ids.filter((id) => data[id].date === selectedDate);

  return { data, ids: filteredIds };
};

export const useTaskToEdit = () => {
  const id = useSelector((state: RootState) => state.tasks.taskToEditId);
  return id;
};

export const useSelectedDate = () => {
  const date = useSelector((state: RootState) => state.tasks.selectedDate);
  return date;
};
