export type UserRole = "freelancer" | "client" | "admin";

export type User = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
