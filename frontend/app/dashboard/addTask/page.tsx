import { getMe, getUsersClients } from "@/lib/data-services-user";
import { User } from "@/types/user";
import AddTaskForm from "@/ui/layoutComponents/AddTaskForm";

type Props = {
  searchParams: Promise<{ projectId?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const user: User = await getMe();
  const { projectId } = await searchParams;

  return (
    <section className="px-8 py-10">
      <header className="flex flex-col gap-5 text-center">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Add a new task
            </h1>

            <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
              Break your project into manageable tasks and keep everything
              moving forward.
            </p>
          </div>
        </div>
      </header>
      <AddTaskForm projectId={projectId} user={user} />
    </section>
  );
}
