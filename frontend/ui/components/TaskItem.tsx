import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Flag,
} from "lucide-react";

import type { Task } from "@/types/task";

type Props = {
  task: Task;
};

const priorityStyles = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};

const statusStyles = {
  todo: "bg-gray-100 text-gray-600",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
};

function formatDate(dateString?: string) {
  if (!dateString) return "No due date";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "No due date";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function TaskItem({ task }: Props) {
  const isCompleted = task.status === "completed";

  const isOverdue =
    !!task.dueDate &&
    task.status !== "completed" &&
    new Date(task.dueDate).getTime() <
      new Date(new Date().setHours(0, 0, 0, 0)).getTime();

  return (
    <article className="flex items-start gap-3 rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background)] p-4 transition-shadow duration-200 hover:shadow-md sm:items-center sm:gap-4 sm:p-5">
      {/* Status icon */}
      <div className="mt-1 shrink-0 sm:mt-0">
        {isCompleted ? (
          <CheckCircle2 size={22} className="text-emerald-600" />
        ) : task.status === "in-progress" ? (
          <Clock3 size={22} className="text-blue-600" />
        ) : (
          <Circle size={22} className="text-[var(--text-muted)]" />
        )}
      </div>

      {/* Task information */}
      <div className="min-w-0 flex-1">
        {/* <h3
          className={`truncate text-sm font-semibold sm:text-base ${
            isCompleted
              ? "text-[var(--text-muted)] line-through"
              : "text-[var(--text)]"
          }`}
        >
          {task.title}
        </h3> */}

        <h3
          className={`line-clamp-2 text-sm leading-5 font-semibold sm:text-base sm:leading-6 ${
            isCompleted
              ? "text-[var(--text-muted)] line-through"
              : "text-[var(--text)]"
          }`}
        >
          {task.title}
        </h3>

        <p className="mt-1 truncate text-xs text-[var(--text-secondary)] sm:text-sm">
          {task.projectName}
        </p>

        {/* Labels */}
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
              priorityStyles[task.priority]
            }`}
          >
            <Flag size={12} />
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>

          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${
              statusStyles[task.status]
            }`}
          >
            {statusLabels[task.status]}
          </span>
        </div>
      </div>

      {/* Due date and details link */}
      <div className="flex shrink-0 flex-col items-end gap-3 self-stretch sm:flex-row sm:items-center">
        <div
          className={`flex items-center gap-1.5 text-xs sm:text-sm ${
            isOverdue
              ? "font-medium text-red-600"
              : "text-[var(--text-secondary)]"
          }`}
        >
          <CalendarDays size={15} />
          <span className="hidden sm:inline">
            {isOverdue ? "Overdue · " : ""}
            {formatDate(task.dueDate)}
          </span>
          <span className="sm:hidden">
            {isOverdue ? "Overdue" : formatDate(task.dueDate)}
          </span>
        </div>

        <Link
          href={`/dashboard/tasks/${task._id}`}
          aria-label={`View task: ${task.title}`}
          className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--background-secondary)] hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
