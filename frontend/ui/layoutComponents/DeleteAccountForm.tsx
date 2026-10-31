"use client";

import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { deleteMe } from "@/lib/data-services-user";
type Props = {
  userId: string;
};

export default function DeleteAccountForm({ userId }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
    );

    if (!confirmed) return;
    try {
      setIsLoading(true);

      //API call
      await deleteMe(userId);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <div className="mb-3 flex items-center gap-2 text-red-500">
          <Trash2 size={20} />
          <h3 className="font-semibold">Delete your account</h3>
        </div>

        <p className="text-muted-foreground text-sm">
          Are you sure you want to permanently delete your account? Your
          personal information will be removed, but your projects, tasks and
          comments will be preserved and attributed to &quot;Deleted User&quot;.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="border-border hover:bg-muted flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition disabled:opacity-50"
        >
          <X size={17} />
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={17} />
          {isLoading ? "Deleting..." : "Delete account"}
        </button>
      </div>
    </div>
  );
}
