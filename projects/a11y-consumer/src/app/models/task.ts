export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  priority: number;
  dueDate: Date;
}

export interface Category {
  id: number;
  name: string;
  tasks: Task[];
}
