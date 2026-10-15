import Link from "next/link";
import { CalendarDays, FolderKanban } from "lucide-react";
import { Project } from "@/types/project";

type Props = {
  project: Project;
};

const statusStyles: Record<Project["status"], string> = {
  planning: "bg-gray-100 text-gray-700",
  "in-progress": "bg-indigo-50 text-indigo-700",
  completed: "bg-emerald-50 text-emerald-700",
};

const statusLabels: Record<Project["status"], string> = {
  planning: "Planning",
  "in-progress": "In progress",
  completed: "Completed",
};

export default function ProjectCard({ project }: Props) {
  const progress =
    project.totalTasks > 0
      ? Math.round((project.completedTasks / project.totalTasks) * 100)
      : 0;

  function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <article className="rounded-2xl border border-[var(--sidebar-border)] bg-[--background] p-4 transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[--sidebar-active] text-[--sidebar-text-active]">
          <FolderKanban size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-[--text]">
            {project.name}
          </h3>

          <span
            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-[--text-secondary]">
        {project.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-[--text-secondary]">Progress</span>
          <span className="font-semibold text-[--text]">{progress}%</span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-[--background-secondary]"
          role="progressbar"
          aria-label={`${project.name} progress`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-[--primary] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-[--text-muted]">
          {project.completedTasks} of {project.totalTasks} tasks completed
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[--sidebar-border] pt-4">
        <div className="flex min-w-0 items-center gap-2 text-xs text-[--text-secondary]">
          <CalendarDays size={16} className="shrink-0" />
          <span>
            {project.deadline ? formatDate(project.deadline) : "No deadline"}
          </span>
        </div>

        <Link
          href={`/dashboard/projects/${project._id}`}
          className="text-[--primary)] shrink-0 text-sm font-semibold hover:underline"
        >
          View project
        </Link>
      </div>
    </article>
  );
}
