"use client";

import Link from "next/link";
import { Task } from "@/types/task";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";
import {
  formatLabel,
  priorityStyles,
  statusStyles,
} from "./ProjectTasksContainer";
import { updateTask } from "@/lib/data-services-tasks";
import { useState, useTransition } from "react";

type Props = { task: Task };

export default function ProjectTask({ task }: Props) {
  const [status, setStatus] = useState(task.status);
  const [isPending, startTransition] = useTransition();

  function handleChangeStatus(newStatus: Task["status"]) {
    const previousStatus = status;

    // Update the UI immediately
    setStatus(newStatus);

    startTransition(async () => {
      try {
        await updateTask({ status: newStatus }, task._id);
      } catch (err) {
        // Restore the previous status if the request fails
        setStatus(previousStatus);
        console.error("Failed to update task status:", err);
      }
    });
  }

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-[var(--input-border)] bg-[var(--background)] p-4 transition-colors hover:border-sky-300 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 shrink-0 text-[var(--text-secondary)]">
          {status === "completed" ? (
            <CheckCircle2 size={20} />
          ) : status === "in-progress" ? (
            <Clock size={20} />
          ) : (
            <ListTodo size={20} />
          )}
        </div>

        <div className="min-w-0">
          <Link
            href={`/dashboard/tasks/${task._id}`}
            className={`font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--primary)] ${
              status === "completed" ? "line-through opacity-60" : ""
            }`}
          >
            {task.title}
          </Link>

          {task.description && (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {task.description}
            </p>
          )}

          {task.dueDate && (
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Due {task.dueDate}
            </p>
          )}

          <Link
            href={`/dashboard/tasks/${task._id}`}
            className="mt-2 inline-block text-xs font-medium text-[var(--primary)] hover:underline"
          >
            View task →
          </Link>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 pl-8 sm:pl-0">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
          {formatLabel(status)}
        </span>

        <span
          className={`text-xs font-semibold ${priorityStyles[task.priority]}`}
        >
          {formatLabel(task.priority)}
        </span>
      </div>

      <select
        value={status}
        onChange={(e) => handleChangeStatus(e.target.value as Task["status"])}
        disabled={isPending}
        className="cursor-pointer rounded-lg border border-[var(--input-border)] bg-[var(--background)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors outline-none hover:border-sky-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-wait disabled:opacity-60"
        aria-label="Change task status"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </article>
  );
}
