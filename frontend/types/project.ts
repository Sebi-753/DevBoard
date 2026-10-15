export type ProjectStatus = "planning" | "in-progress" | "completed";

export type Project = {
  _id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  completedTasks: number;
  totalTasks: number;
  deadline: string;
};
