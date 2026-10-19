import { AlertCircle, CheckCircle2, Clock3, ListTodo } from "lucide-react";

import { Task } from "@/types/task";

import StatCard from "@/ui/components/StatCard";
import TasksList from "@/ui/layoutComponents/TasksList";
import H3 from "@/ui/components/H3";
import H2 from "@/ui/components/H2";
import { getUserTasks } from "@/lib/data-services-tasks";

export default async function page() {
  const tasks: Task[] = await getUserTasks();

  const toDoCount = tasks.filter((task) => task.status === "todo").length;

  const inProgressCount = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const overdueCount = tasks.filter(
    (task) =>
      task.status !== "completed" && new Date(task.dueDate) < new Date(),
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  return (
    <section className="px-6 py-10">
      <header className="pb-6 text-center">
        <H2 className="text-xl font-semibold text-[--text]">My Tasks</H2>
        <H3>Manage your tasks across all projects.</H3>
      </header>
      <main>
        <article className="grid grid-cols-1 gap-3">
          <StatCard
            title="To Do"
            value={toDoCount}
            icon={ListTodo}
            description="Waiting to be started"
            iconColor="text-[var(--primary)]"
          />

          <StatCard
            title="In Progress"
            value={inProgressCount}
            icon={Clock3}
            description="Currently being worked on"
            iconColor="text-blue-600"
          />

          <StatCard
            title="Overdue"
            value={overdueCount}
            icon={AlertCircle}
            description="Past their due date"
            iconColor="text-red-600"
          />

          <StatCard
            title="Completed"
            value={completedCount}
            icon={CheckCircle2}
            description="Successfully finished"
            iconColor="text-emerald-600"
          />
        </article>
        <TasksList tasks={tasks} />
      </main>
    </section>
  );
}
