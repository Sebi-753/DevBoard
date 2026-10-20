import { User } from "./user";

export type ProjectStatus = "planning" | "in-progress" | "completed";

export type Project = {
  _id: string;
  name: string;
  buget: string;
  description: string;
  status: ProjectStatus;
  completedTasks: number;
  totalTasks: number;
  deadline: string;
  owner: { name: string };
  client?: {
    name: string;
  };
};
