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
