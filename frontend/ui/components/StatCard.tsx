import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  iconColor?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  iconColor = "text-[var(--primary)]",
}: Props) {
  return (
    <div className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background)] p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            {value}
          </p>
        </div>

        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--background-secondary)] ${iconColor}`}
        >
          <Icon size={22} strokeWidth={1.8} />
        </div>
      </div>

      {description && (
        <p className="mt-3 text-xs text-[var(--text-muted)] sm:text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
