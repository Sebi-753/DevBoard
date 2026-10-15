import Link from "next/link";

import { Project } from "@/types/project";
import { CheckCircle2, Clock, FolderKanban, ListTodo } from "lucide-react";

import { Task } from "@/types/task";
import { User } from "@/types/user";

import ProjectCard from "@/ui/components/ProjectCard";
import StatCard from "@/ui/components/StatCard";
import TaskItem from "@/ui/components/TaskItem";
import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";

type Props = { user: User };

const projects: Project[] = [
  {
    _id: "project-1",
    name: "Portfolio redesign",
    description: "Build a responsive portfolio with a modern design.",
    status: "in-progress",
    completedTasks: 8,
    totalTasks: 12,
    deadline: "2026-10-20",
  },
  {
    _id: "project-2",
    name: "E-commerce website",
    description: "Develop a storefront and product catalog.",
    status: "planning",
    completedTasks: 0,
    totalTasks: 10,
    deadline: "2026-11-05",
  },
];

const tasks: Task[] = [
  {
    _id: "task-1",
    title: "Finish responsive navbar",
    projectName: "Portfolio redesign",
    dueDate: "2026-10-15",
    priority: "high",
    status: "todo",
  },
  {
    _id: "task-2",
    title: "Review client feedback",
    projectName: "E-commerce website",
    dueDate: "2026-10-17",
    priority: "medium",
    status: "in-progress",
  },
];

export default function FreelancerDashboard({ user }: Props) {
  return (
    <div className="flex flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-3 text-center">
        <H2 className="text-center font-bold">Welcome back!</H2>
        <H3 className="text-sm">
          Here&apos;s what&apos;s happening with your projects.
        </H3>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard
          title="Active projects"
          value={8}
          icon={FolderKanban}
          description="Projects in progress"
          iconColor="text-indigo-500"
        />

        <StatCard
          title="Pending tasks"
          value={12}
          icon={ListTodo}
          description="Tasks not completed"
          iconColor="text-sky-500"
        />

        <StatCard
          title="Due this week"
          value={3}
          icon={Clock}
          description="Upcoming deadlines"
          iconColor="text-amber-500"
        />

        <StatCard
          title="Completed tasks"
          value={24}
          icon={CheckCircle2}
          description="Tasks finished"
          iconColor="text-emerald-500"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard/projects"
          className="text-end text-[--text] transition duration-300 hover:text-blue-400"
        >
          View all projects {"-->"}
        </Link>

        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard/tasks"
          className="text-end text-[--text] transition duration-300 hover:text-blue-400"
        >
          View all tasks {"-->"}
        </Link>

        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
