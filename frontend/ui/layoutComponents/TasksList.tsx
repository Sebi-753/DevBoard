"use client";

import { useState } from "react";

import { Task } from "@/types/task";
import TaskItem from "../components/TaskItem";

type Props = { tasks: Task[] };

export default function TasksList({ tasks }: Props) {
  const [filter, setFilter] = useState<string>("");

  if (filter) tasks = tasks.filter((task) => task.status === filter);

  return (
    <div className="py-10">
      <p className="text-lg font-semibold text-[--text]">Your tasks</p>
      <div className="my-6 grid w-full grid-cols-2 gap-3 overflow-x-auto rounded-xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-1 sm:w-fit">
        <button
          onClick={() => setFilter("")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm transition-colors sm:flex-none ${
            filter === ""
              ? "bg-[var(--background)] font-semibold text-[var(--primary)] shadow-sm"
              : "font-medium text-[var(--text-secondary)] hover:bg-[var(--background-hover)] hover:text-[var(--text)]"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("todo")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm transition-colors sm:flex-none ${
            filter === "todo"
              ? "bg-[var(--background)] font-semibold text-[var(--primary)] shadow-sm"
              : "font-medium text-[var(--text-secondary)] hover:bg-[var(--background-hover)] hover:text-[var(--text)]"
          }`}
        >
          To do
        </button>

        <button
          onClick={() => setFilter("in-progress")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm transition-colors sm:flex-none ${
            filter === "in-progress"
              ? "bg-[var(--background)] font-semibold text-[var(--primary)] shadow-sm"
              : "font-medium text-[var(--text-secondary)] hover:bg-[var(--background-hover)] hover:text-[var(--text)]"
          }`}
        >
          In progress
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm transition-colors sm:flex-none ${
            filter === "completed"
              ? "bg-[var(--background)] font-semibold text-[var(--primary)] shadow-sm"
              : "font-medium text-[var(--text-secondary)] hover:bg-[var(--background-hover)] hover:text-[var(--text)]"
          }`}
        >
          Completed
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-3">
        {tasks.map((task) => (
          <TaskItem task={task} key={task._id} />
        ))}
      </ul>
    </div>
  );
}
