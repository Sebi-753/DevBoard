import { getTask } from "@/lib/data-services-tasks";
import EditTaskForm from "@/ui/layoutComponents/EditTaskForm";

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function Page({ params }: Props) {
  const { taskId } = await params;

  const taskObj = await getTask(taskId);
  const task = taskObj.data;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit task
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Update the task details and manage its progress.
        </p>
      </header>

      <EditTaskForm task={task} />
    </section>
  );
}
