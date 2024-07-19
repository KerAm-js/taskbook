export interface ITask {
  id: number;
  title: string;
  description?: string;
  remindTime?: number;
  date: number;
  isRegular?: boolean;
  isCompleted: boolean;
  isEditing?: boolean;
}
