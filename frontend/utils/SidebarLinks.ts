import { NavLink } from "@/types/user";
import {
  ChartNoAxesCombined,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
  ClipboardList,
} from "lucide-react";

export const clientLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Tasks", href: "/dashboard/tasks", icon: ClipboardList },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
export const freelancerLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "My Tasks", href: "/dashboard/tasks", icon: ListTodo },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
export const adminLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Tasks", href: "/dashboard/tasks", icon: ListTodo },
  { label: "Reports", href: "/dashboard/reports", icon: ChartNoAxesCombined },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
