import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  FolderKanban,
} from "lucide-react";

import type { Project } from "@/types/project";

type Props = {
  project: Project;
};

const statusStyles = {
  planning: "bg-gray-100 text-gray-600",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const statusLabels = {
  planning: "Planning",
  "in-progress": "In Progress",
  completed: "Completed",
};

function formatDeadline(deadline?: string) {
  if (!deadline) return "No deadline";

  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) return "No deadline";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ProjectCard({ project }: Props) {
  const progress =
    project.totalTasks > 0
      ? Math.round((project.completedTasks / project.totalTasks) * 100)
      : 0;

  const isCompleted = project.status === "completed";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--background-secondary)] text-[var(--primary)]">
          <FolderKanban size={22} />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[project.status]
          }`}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      {/* Project information */}
      <div className="mt-5 flex-1">
        <h3 className="text-lg font-semibold text-[var(--text)]">
          {project.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[var(--text-secondary)]">
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-[var(--text-secondary)]">Task progress</span>

          <span className="font-semibold text-[var(--text)]">{progress}%</span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-[var(--background-secondary)]"
          role="progressbar"
          aria-label={`${project.name} task progress`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          {isCompleted ? (
            <CheckCircle2 size={16} className="text-emerald-600" />
          ) : (
            <Circle size={16} />
          )}

          <span>
            {project.completedTasks} of {project.totalTasks} tasks completed
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--sidebar-border)] pt-4">
        <div className="flex min-w-0 items-center gap-2 text-sm text-[var(--text-secondary)]">
          {isCompleted ? (
            <CheckCircle2 size={16} className="shrink-0" />
          ) : (
            <CalendarDays size={16} className="shrink-0" />
          )}

          <span className="truncate">{formatDeadline(project.deadline)}</span>
        </div>

        <Link
          href={`/dashboard/projects/${project._id}`}
          aria-label={`View ${project.name}`}
          className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--background-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          View
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
