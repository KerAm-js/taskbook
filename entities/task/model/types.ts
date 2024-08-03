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
  idCounter: number;
  ids: { [key: number]: Array<ITask["id"]> };
  entities: { [key: ITask["id"]]: ITask };
  selectedDate: number;
  isSelection: boolean;
  cache: {
    actionType?: TTaskActionType;
    ids: Array<ITask["id"]>;
    entities: { [key: ITask["id"]]: ITask };
  };
  taskToEditId?: ITask["id"];
}
