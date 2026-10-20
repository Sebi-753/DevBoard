"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, ListTodo } from "lucide-react";
import ProjectTask from "./ProjectTask";
import FilterProjectTasks from "./FilterProjectTasks";
import { Task } from "@/types/task";

export type TaskStatus = "todo" | "in-progress" | "completed";

// export type ProjectTask = {
//   _id: string;
//   title: string;
//   description?: string;
//   status: TaskStatus;
//   priority: "low" | "medium" | "high";
//   dueDate?: string;
// };

export type Filter = "all" | TaskStatus;

type Props = {
  tasks: Task[];
  onAddTask?: () => void;
};

const filters: { label: string; value: Filter }[] = [
  { label: "All Tasks", value: "all" },
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-sky-50 text-sky-700",
  completed: "bg-emerald-50 text-emerald-700",
};

export const priorityStyles = {
  low: "text-slate-500",
  medium: "text-amber-600",
  high: "text-red-600",
};

export const formatLabel = (value: string) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function ProjectTasksContainer({ tasks, onAddTask }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredTasks =
    activeFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === activeFilter);

  const counts = {
    all: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    "in-progress": tasks.filter((task) => task.status === "in-progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  return (
    <section className="] w-full space-y-5 rounded-2xl bg-[var(--background-secondary)] p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            Project Tasks
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Manage and track your project tasks.
          </p>
        </div>

        <Link
          href={"/dashboard/addTask"}
          type="button"
          // onClick={onAddTask}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          <Plus size={18} />
          Add Task
        </Link>
      </div>

      {/* Filters */}
      <FilterProjectTasks
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        counts={counts}
      />

      {/* Task list */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <ProjectTask task={task} key={task._id} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ListTodo size={32} className="mb-3 text-[var(--text-secondary)]" />
            <p className="font-semibold text-[var(--foreground)]">
              No tasks found
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {activeFilter === "all"
                ? "Add a task to get this project started."
                : `There are no ${formatLabel(activeFilter).toLowerCase()} tasks.`}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[var(--input-border)] pt-4 text-sm text-[var(--text-secondary)]">
        <span>
          Showing {filteredTasks.length} of {tasks.length} tasks
        </span>
        <span>
          {counts.completed} / {counts.all} completed
        </span>
      </div>
    </section>
  );
}
