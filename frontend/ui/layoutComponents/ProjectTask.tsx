"use client";

import { Task } from "@/types/task";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";
import {
  formatLabel,
  priorityStyles,
  statusStyles,
} from "./ProjectTasksContainer";
import { useState } from "react";

type Props = { task: Task };

export default function ProjectTask({ task }: Props) {
  function handleChangeStatus(): void {}

  return (
    <article
      key={task._id}
      className="flex flex-col gap-3 rounded-xl border border-[var(--input-border)] bg-[var(--background)] p-4 transition-colors hover:border-sky-300 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 shrink-0 text-[var(--text-secondary)]">
          {task.status === "completed" ? (
            <CheckCircle2 size={20} />
          ) : task.status === "in-progress" ? (
            <Clock size={20} />
          ) : (
            <ListTodo size={20} />
          )}
        </div>
        <div className="min-w-0">
          <h4
            className={`font-semibold text-[var(--foreground)] ${
              task.status === "completed" ? "line-through opacity-60" : ""
            }`}
          >
            {task.title}
          </h4>
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
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 pl-8 sm:pl-0">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status]}`}
        >
          {formatLabel(task.status)}
        </span>
        <span
          className={`text-xs font-semibold ${priorityStyles[task.priority]}`}
        >
          {formatLabel(task.priority)}
        </span>
      </div>
      <select
        value={task.status}
        onChange={(e) =>
          // onStatusChange(task._id, e.target.value as Task["status"])
          handleChangeStatus()
        }
        className="cursor-pointer rounded-lg border border-[var(--input-border)] bg-[var(--background)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors outline-none hover:border-sky-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        aria-label="Change task status"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </article>
  );
}
