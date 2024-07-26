import { RootState } from "@/appLayer/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectTaskById = createSelector(
  [(state: RootState) => state.tasks.entities, (_, taskId: number) => taskId],
  (entities, taskId) => entities[taskId]
);