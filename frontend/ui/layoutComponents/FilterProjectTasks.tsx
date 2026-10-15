import { Filter } from "./ProjectTasksContainer";

type Props = {
  filters: { label: string; value: Filter }[];
  activeFilter: Filter;
  setActiveFilter: React.Dispatch<React.SetStateAction<Filter>>;
  counts: Record<string, number>;
};

export default function FilterProjectTasks({
  filters,
  activeFilter,
  setActiveFilter,
  counts,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 border-b border-[var(--input-border)] pb-4 sm:flex sm:flex-wrap">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            aria-pressed={isActive}
            className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:justify-start ${
              isActive
                ? "bg-sky-100 text-sky-800"
                : "text-[var(--text-secondary)] hover:bg-[var(--background-hover)]"
            }`}
          >
            <span className="truncate">{filter.label}</span>

            <span
              className={`shrink-0 rounded-md px-1.5 py-0.5 text-xs ${
                isActive ? "bg-sky-200/70" : "bg-[var(--background-hover)]"
              }`}
            >
              {counts[filter.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
