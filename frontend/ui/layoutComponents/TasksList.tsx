import { Task } from "@/types/task";
import TaskItem from "../components/TaskItem";

type Props = { tasks: Task[] };

export default function TasksList({ tasks }: Props) {
  return (
    <div className="py-10">
      <p className="text-lg font-semibold text-[--text]">Your tasks</p>
      <div className="my-6 flex w-full gap-1 overflow-x-auto rounded-xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-1 sm:w-fit">
        <button className="flex-1 rounded-lg bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--primary)] shadow-sm transition-colors sm:flex-none">
          All
        </button>

        <button className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--background-hover)] hover:text-[var(--text)] sm:flex-none">
          To do
        </button>

        <button className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--background-hover)] hover:text-[var(--text)] sm:flex-none">
          Active
        </button>

        <button className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--background-hover)] hover:text-[var(--text)] sm:flex-none">
          Done
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-3">
        {tasks.map((task) => (
          <TaskItem task={task} key={task._id} />
        ))}
      </ul>
    </div>
  );
}
