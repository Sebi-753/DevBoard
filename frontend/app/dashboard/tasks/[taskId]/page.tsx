import { getTask } from "@/lib/data-services-tasks";
import { getTaskComments } from "@/lib/data-services-comments";
import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  FolderKanban,
  Pencil,
  UserRound,
  Flag,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Comment from "@/ui/layoutComponents/Comment";
import PostCommentForm from "@/ui/layoutComponents/PostCommentForm";
import { getMe } from "@/lib/data-services-user";
import { formatTaskDate } from "@/utils/formatDate";

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function Page({ params }: Props) {
  const { taskId } = await params;

  // Fetch task and comments simultaneously
  const [taskObj, comments] = await Promise.all([
    getTask(taskId),
    getTaskComments(taskId),
  ]);

  const user = await getMe();

  const task = taskObj.data;

  const statusStyles: Record<string, string> = {
    todo: "bg-gray-500/10 text-gray-600",
    "in-progress": "bg-blue-500/10 text-blue-600",
    completed: "bg-emerald-500/10 text-emerald-600",
  };

  const priorityStyles: Record<string, string> = {
    low: "bg-gray-500/10 text-gray-600",
    medium: "bg-amber-500/10 text-amber-600",
    high: "bg-red-500/10 text-red-600",
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-10">
      {/* Top navigation */}
      <div className="mx-6 flex items-center justify-between">
        <Link
          href="/dashboard/tasks"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--background-secondary)] hover:text-[var(--primary)]"
        >
          <ArrowLeft size={16} />
          All tasks
        </Link>

        <Link
          href={`/dashboard/tasks/${taskId}/edit`}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90"
        >
          <Pencil size={16} />
          Edit task
        </Link>
      </div>

      {/* Task header */}
      <header className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                statusStyles[task.status] ?? ""
              }`}
            >
              {task.status.replace("-", " ")}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                priorityStyles[task.priority] ?? ""
              }`}
            >
              {task.priority} priority
            </span>
          </div>

          <div>
            <H2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {task.title}
            </H2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
              {task.description || "No description provided."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--sidebar-border)] pt-5">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <UserRound size={16} />
              <span>{task.assignedTo?.name ?? "Unassigned"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <FolderKanban size={16} />
              <span>{task.project?.name ?? "Unknown project"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <CalendarDays size={16} />
              <span>Due {formatTaskDate(task.dueDate)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Task information */}
        <main className="flex flex-col gap-6">
          {/* Task details */}
          <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
            <H3 className="text-lg font-semibold">Task details</H3>

            <div className="mt-5">
              <p className="text-xs font-medium tracking-wider text-[var(--text-muted)] uppercase">
                Description
              </p>

              <p className="mt-3 text-sm leading-7 whitespace-pre-wrap text-[var(--text-muted)]">
                {task.description || "No description provided."}
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
            <H3 className="text-lg font-semibold">Timeline</H3>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[var(--background)] p-2.5">
                  <CalendarDays
                    size={18}
                    className="text-[var(--text-muted)]"
                  />
                </div>

                <div>
                  <p className="text-xs text-[var(--text-muted)]">Due date</p>
                  <p className="mt-1 text-sm font-semibold">
                    {formatTaskDate(task.dueDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[var(--background)] p-2.5">
                  <Clock size={18} className="text-[var(--text-muted)]" />
                </div>

                <div>
                  <p className="text-xs text-[var(--text-muted)]">Created on</p>
                  <p className="mt-1 text-sm font-semibold">
                    {formatTaskDate(task.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[var(--background)] p-2.5">
                  <CheckCircle2
                    size={18}
                    className="text-[var(--text-muted)]"
                  />
                </div>

                <div>
                  <p className="text-xs text-[var(--text-muted)]">
                    Last updated
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {formatTaskDate(task.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Assigned to */}
        <aside className="flex flex-col gap-6">
          <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
            <H3 className="text-lg font-semibold">Assignment</H3>

            <div className="mt-5 flex items-center gap-3">
              <div className="rounded-xl bg-[var(--background)] p-2.5">
                <UserRound size={19} className="text-[var(--text-muted)]" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-[var(--text-muted)]">Assigned to</p>

                <p className="mt-1 truncate text-sm font-semibold">
                  {task.assignedTo?.name ?? "Unassigned"}
                </p>

                {task.assignedTo?.email && (
                  <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                    {task.assignedTo.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="rounded-xl bg-[var(--background)] p-2.5">
                <FolderKanban size={19} className="text-[var(--text-muted)]" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-[var(--text-muted)]">Project</p>

                <p className="mt-1 truncate text-sm font-semibold">
                  {task.project?.name ?? "Unknown project"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
            <H3 className="text-lg font-semibold">Priority</H3>

            <div className="mt-5 flex items-center gap-3">
              <div className="rounded-xl bg-[var(--background)] p-2.5">
                <Flag size={19} className="text-[var(--text-muted)]" />
              </div>

              <div>
                <p className="text-xs text-[var(--text-muted)]">
                  Current priority
                </p>

                <p className="mt-1 text-sm font-semibold capitalize">
                  {task.priority}
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
      {/* Comments */}
      <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <H3 className="text-lg font-semibold">Comments</H3>

          <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
            {comments.length}
          </span>
        </div>

        {/* Add comment form */}
        <div className="mt-6">
          <PostCommentForm taskId={taskId} />
        </div>

        {/* Comments list */}
        {comments.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-[var(--background)] px-4 py-10 text-center">
            <MessageCircle size={28} className="text-[var(--text-muted)]" />

            <p className="mt-3 text-sm font-medium">No comments yet</p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Start a discussion about this task.
            </p>
          </div>
        ) : (
          <div className="mt-4 flex max-h-60 flex-col divide-y divide-[var(--sidebar-border)] overflow-scroll">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                currentUserId={user._id}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
