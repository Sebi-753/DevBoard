import { CalendarDays, Circle, CircleCheck } from "lucide-react";

export type Task = {
  _id: string;
  title: string;
  projectName: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
};

type Props = {
  task: Task;
};

const priorityStyles: Record<Task["priority"], string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

const priorityLabels: Record<Task["priority"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function TaskItem({ task }: Props) {
  const isCompleted = task.status === "completed";

  return (
    <article className="flex items-start gap-3 py-4">
      <div className="mt-0.5 shrink-0 text-[var(--text-muted)]">
        {isCompleted ? (
          <CircleCheck
            size={21}
            className="text-emerald-600"
            aria-label="Completed"
          />
        ) : (
          <Circle size={21} aria-label="Not completed" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            isCompleted
              ? "text-[var(--text-muted)] line-through"
              : "text-[var(--text)]"
          }`}
        >
          {task.title}
        </p>

        <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
          {task.projectName}
        </p>

        {task.dueDate && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <CalendarDays size={14} />
            <time dateTime={task.dueDate}>
              {new Date(task.dueDate).toLocaleDateString()}
            </time>
          </div>
        )}
      </div>

      <span
        className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
      >
        {priorityLabels[task.priority]}
      </span>
    </article>
  );
}
