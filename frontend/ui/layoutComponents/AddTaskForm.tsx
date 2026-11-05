"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CalendarDays, Flag, FileText, Loader2 } from "lucide-react";

import { createTask } from "@/lib/data-services-tasks";
import { User } from "@/types/user";

export type TaskFormData = {
  title: string;
  description: string;
  assignedTo: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
};

type Props = {
  projectId?: string;
  user: User;
};

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10";

const labelClass = "mb-2 block text-sm font-semibold";

export default function AddTaskForm({ projectId, user }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: user._id,
      status: "todo",
      priority: "medium",
      dueDate: "",
    },
  });

  async function onSubmit(data: TaskFormData) {
    setError("");

    if (!projectId) {
      setError("Please select a project before creating a task.");
      return;
    }

    try {
      const taskData = {
        ...data,
        project: projectId,
      };

      await createTask(taskData, projectId);

      router.push(`/dashboard/projects/${projectId}`);
    } catch (err) {
      setFormError("root", {
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card border-border mt-10 rounded-2xl border shadow-sm"
    >
      <div className="flex flex-col gap-7 p-5 sm:p-8">
        {/* Basic information */}
        <div>
          <div className="mb-5 flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            <h2 className="font-semibold">Task information</h2>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="title" className={labelClass}>
                Task title <span className="text-destructive">*</span>
              </label>

              <input
                id="title"
                {...register("title", {
                  required: "Task title is required",
                  maxLength: {
                    value: 120,
                    message: "Title cannot exceed 120 characters",
                  },
                })}
                placeholder="e.g. Design the landing page"
                className={inputClass}
                maxLength={120}
              />

              {errors.title && (
                <p className="text-destructive mt-1 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                Description
              </label>

              <textarea
                id="description"
                {...register("description", {
                  maxLength: {
                    value: 2000,
                    message: "Description cannot exceed 2000 characters",
                  },
                })}
                placeholder="Describe what needs to be done..."
                rows={4}
                maxLength={2000}
                className={`${inputClass} resize-y`}
              />

              <p className="text-muted-foreground mt-1.5 text-xs">
                Provide additional details about this task.
              </p>

              {errors.description && (
                <p className="text-destructive mt-1 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-border border-t" />

        {/* Assignment */}
        {/* <div>
          <div className="mb-5 flex items-center gap-2">
            <UserRound size={18} className="text-primary" />
            <h2 className="font-semibold">Assignment</h2>
          </div>

          <div>
            <label htmlFor="assignedTo" className={labelClass}>
              Assign to
            </label>

            <select
              id="assignedTo"
              {...register("assignedTo")}
              className={inputClass}
            >
              <option value="">Unassigned</option>

              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* <div className="border-border border-t" /> */}

        {/* Task settings */}
        <div>
          <div className="mb-5 flex items-center gap-2">
            <Flag size={18} className="text-primary" />
            <h2 className="font-semibold">Task settings</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>

              <select
                id="status"
                {...register("status")}
                className={inputClass}
              >
                <option value="todo">To do</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className={labelClass}>
                Priority
              </label>

              <select
                id="priority"
                {...register("priority")}
                className={inputClass}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="dueDate" className={labelClass}>
                Due date
                <span className="text-muted-foreground ml-2 text-xs font-normal">
                  Optional
                </span>
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
                />

                <input
                  id="dueDate"
                  type="date"
                  {...register("dueDate")}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>
        </div>

        {(error || errors.root) && (
          <p className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">
            {error || errors.root?.message}
          </p>
        )}
      </div>

      {/* Form actions */}
      <div className="border-border flex flex-col-reverse gap-3 border-t p-5 sm:flex-row sm:justify-end sm:px-8">
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
          className="border-border hover:bg-secondary rounded-xl border px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting || !projectId}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Creating task...
            </>
          ) : (
            "Create task"
          )}
        </button>
      </div>
    </form>
  );
}
