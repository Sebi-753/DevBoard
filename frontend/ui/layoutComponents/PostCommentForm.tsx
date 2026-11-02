"use client";

import { createComment } from "@/lib/data-services-comments";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

type Props = {
  taskId: string;
};

export default function PostCommentForm({ taskId }: Props) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) return;

    setError("");

    startTransition(async () => {
      try {
        await createComment(taskId, trimmedText);

        setText("");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        maxLength={2000}
        disabled={isPending}
        className="w-full resize-y rounded-xl border border-[var(--sidebar-border)] bg-[var(--background)] px-4 py-3 text-sm leading-6 transition outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] disabled:opacity-60"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          {error ? (
            <p className="text-xs text-red-500">{error}</p>
          ) : (
            <p className="text-xs text-[var(--text-muted)]">
              {text.length}/2000 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!text.trim() || isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={15} />
          {isPending ? "Posting..." : "Post comment"}
        </button>
      </div>
    </form>
  );
}
