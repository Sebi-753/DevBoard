import { LucideIcon } from "lucide-react";

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

export type CreatedUser = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
export type NavLink = { label: string; href: string; icon: LucideIcon };
