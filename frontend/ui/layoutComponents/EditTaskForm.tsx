"use client";

import { updateTask } from "@/lib/data-services-tasks";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

type Props = {
  task: Task;
};

export type EditTaskData = {
  title: string;
  description: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
};

export default function EditTaskForm({ task }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTaskData>({
    defaultValues: {
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
      status: task.status,
      priority: task.priority,
    },
  });

  async function onSubmit(data: EditTaskData) {
    try {
      setIsSubmitting(true);
      setError("");

      await updateTask(data, task._id);

      router.push(`/dashboard/tasks/${task._id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyles =
    "w-full rounded-xl border border-[var(--sidebar-border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--primary)]";

  const labelStyles = "mb-2 block text-sm font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* General information */}
      <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Task information</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Update the title and description of your task.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className={labelStyles}>
              Task title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              className={inputStyles}
              {...register("title", {
                required: "Task title is required",
                minLength: {
                  value: 3,
                  message: "Title must have at least 3 characters",
                },
              })}
            />

            {errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelStyles}>
              Description
            </label>

            <textarea
              id="description"
              rows={5}
              placeholder="Describe what needs to be done..."
              className={`${inputStyles} resize-y`}
              {...register("description")}
            />
          </div>
        </div>
      </section>

      {/* Status and priority */}
      <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Task progress</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Manage the current status and priority.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Status */}
          <div>
            <label htmlFor="status" className={labelStyles}>
              Status
            </label>

            <select
              id="status"
              className={`${inputStyles} py-2 text-sm`}
              {...register("status", { required: true })}
            >
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className={labelStyles}>
              Priority
            </label>

            <select
              id="priority"
              className={inputStyles}
              {...register("priority", { required: true })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </section>

      {/* Due date */}
      <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Deadline</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Set or change the task deadline.
          </p>
        </div>

        <div>
          <label htmlFor="dueDate" className={labelStyles}>
            Due date
          </label>

          <input
            id="dueDate"
            type="date"
            className={inputStyles}
            {...register("dueDate", {
              required: "Please select a due date",
            })}
          />

          {errors.dueDate && (
            <p className="mt-1 text-xs text-red-500">
              {errors.dueDate.message}
            </p>
          )}
        </div>
      </section>

      {/* Error */}
      {error && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <Link
          href={`/dashboard/tasks/${task._id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--sidebar-border)] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[var(--background-secondary)]"
        >
          <ArrowLeft size={16} />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />
          {isSubmitting ? "Saving changes..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
