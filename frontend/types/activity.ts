export type ActivityType = "comment" | "completed" | "project";

export type Activity = {
  _id: string;
  userName: string;
  action: string;
  target: string;
  createdAt: string;
  type: ActivityType;
};
