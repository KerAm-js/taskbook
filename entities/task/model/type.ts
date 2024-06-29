export interface ITask {
  id: string;
  title: string;
  description?: string;
  remindTime?: number;
  date: number;
  isRegular?: boolean;
  isCompleted: boolean;
  isEditing?: boolean;
}