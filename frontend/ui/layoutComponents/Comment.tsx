"use client";

import { Comment as CommentType } from "@/types/comment";
import { formatCommentDate } from "@/utils/formatDate";
import { deleteComment } from "@/lib/data-services-comments";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

type Props = {
  comment: CommentType;
  currentUserId: string;
};

export default function Comment({ comment, currentUserId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const isAuthor = String(comment.author?._id) === String(currentUserId);

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!confirmed) return;

    setError("");

    startTransition(async () => {
      try {
        await deleteComment(comment._id);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete comment",
        );
      }
    });
  }

  return (
    <article className="flex gap-3 py-5 first:pt-0 last:pb-0">
      {/* Author avatar */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-semibold text-[var(--primary)]">
        {comment.author?.name?.charAt(0).toUpperCase() ?? "?"}
      </div>

      {/* Comment content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold">
              {comment.author?.name ?? "Unknown user"}
            </p>

            <span className="text-xs text-[var(--text-muted)]">
              {formatCommentDate(comment.createdAt)}
            </span>
          </div>

          {isAuthor && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="flex items-center gap-1.5 text-xs text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={14} />
              {isPending ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>

        <p className="mt-2 text-sm leading-6 whitespace-pre-wrap text-[var(--text-muted)]">
          {comment.text}
        </p>

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    </article>
  );
}
