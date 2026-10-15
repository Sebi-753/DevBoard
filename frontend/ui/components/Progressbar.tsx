type Props = {
  completedTasks: number;
  totalTasks: number;
};

export default function ProgressBar({ completedTasks, totalTasks }: Props) {
  const progress =
    totalTasks > 0
      ? Math.min(100, Math.max(0, (completedTasks / totalTasks) * 100))
      : 0;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          Overall Progress
        </span>
        <span className="text-sm font-semibold text-[var(--foreground)]">
          {Math.round(progress)}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="Project progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-sky-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-[var(--text-secondary)]">
        {completedTasks} of {totalTasks} tasks completed
      </p>
    </div>
  );
}
