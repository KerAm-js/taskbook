export interface ITask {
  id: number;
  title: string;
  description?: string;
  remindTime?: number;
  date: number;
  isCompleted: boolean;
  isRegular?: boolean;
  isEditing?: boolean;
  isSelected?: boolean;
}

export type TTaskActionType =
  | "deleteOne"
  | "deleteMany"
  | "copyOne"
  | "copyMany"
  | "changeDate";

export interface ITasksState {
  ids: Array<ITask["id"]>;
  entities: { [key: ITask["id"]]: ITask };
  filteredIds: Array<ITask["id"]>;
  selectedDate: number;
  isSelection: boolean;
  cache: {
    actionType?: TTaskActionType;
    ids: Array<ITask["id"]>;
    entities: { [key: ITask["id"]]: ITask };
    filteredIds: Array<ITask["id"]>;
    copiedIds: Array<ITask["id"]>;
  };
  taskToEditId?: ITask["id"];
}
