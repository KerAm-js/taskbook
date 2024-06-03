export interface ITask {
  id: string;
  title: string;
  description: string;
  reminderHour: number;
  reminderMinute: number;
  date: number;
  isRegular: boolean;
}