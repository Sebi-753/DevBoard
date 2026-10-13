export type TaskStatus = "todo" | "in-progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  _id: string;
  title: string;
  projectName: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
};
