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
import { getUserProjects } from "@/lib/data-services-projects";
import { getUserTasks } from "@/lib/data-services-tasks";

type Props = { user: User };

export default async function FreelancerDashboard({ user }: Props) {
  let projects: Project[] = await getUserProjects();
  let tasks: Task[] = await getUserTasks();

  //first 3 by deadline
  projects = projects
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    )
    .slice(0, 3);

  tasks = tasks
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 3);

  //deadline/due date (this week)
  const now = new Date();

  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();

  startOfWeek.setDate(startOfWeek.getDate() - (day === 0 ? 6 : day - 1));
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  //counts for the stats
  const tasksDueThisWeek = tasks.filter((task) => {
    if (!task.dueDate || task.status === "completed") return false;

    const dueDate = new Date(task.dueDate);

    return dueDate >= startOfWeek && dueDate < endOfWeek;
  }).length;

  const projectsDueThisWeek = projects.filter((project) => {
    if (!project.deadline || project.status === "completed") return false;

    const deadline = new Date(project.deadline);

    return deadline >= startOfWeek && deadline < endOfWeek;
  }).length;

  const dueThisWeek = tasksDueThisWeek + projectsDueThisWeek;
  const activeProjectsCount = projects.filter(
    (project) => project.status === "in-progress",
  ).length;
  const pendingTasksCount = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;

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
          value={activeProjectsCount}
          icon={FolderKanban}
          description="Projects in progress"
          iconColor="text-indigo-500"
        />

        <StatCard
          title="Pending tasks"
          value={pendingTasksCount}
          icon={ListTodo}
          description="Tasks not completed"
          iconColor="text-sky-500"
        />

        <StatCard
          title="Due this week"
          value={dueThisWeek}
          icon={Clock}
          description="Upcoming deadlines"
          iconColor="text-amber-500"
        />

        <StatCard
          title="Completed tasks"
          value={completedTasksCount}
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
