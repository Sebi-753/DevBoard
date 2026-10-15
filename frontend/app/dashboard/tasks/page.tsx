import { AlertCircle, CheckCircle2, Clock3, ListTodo } from "lucide-react";

import { Task } from "@/types/task";

import StatCard from "@/ui/components/StatCard";
import TasksList from "@/ui/layoutComponents/TasksList";
import H3 from "@/ui/components/H3";
import H2 from "@/ui/components/H2";

export const tasks: Task[] = [
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
export default function page() {
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
            value={8}
            icon={ListTodo}
            description="Waiting to be started"
            iconColor="text-[var(--primary)]"
          />

          <StatCard
            title="In Progress"
            value={5}
            icon={Clock3}
            description="Currently being worked on"
            iconColor="text-blue-600"
          />

          <StatCard
            title="Overdue"
            value={3}
            icon={AlertCircle}
            description="Past their due date"
            iconColor="text-red-600"
          />

          <StatCard
            title="Completed"
            value={12}
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
