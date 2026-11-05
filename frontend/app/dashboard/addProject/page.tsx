import { getClients } from "@/lib/data-services-user";
import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";
import AddProjectForm from "@/ui/layoutComponents/AddProjectForm";

export type Client = {
  _id: string;
  name: string;
};

export default async function page() {
  const clients: Client[] = await getClients();
  return (
    <section className="px-8 py-10">
      <header className="flex flex-col gap-3 text-center">
        <H2>Create project</H2>
        <H3>Create projects to keep your clients up to </H3>
      </header>
      <AddProjectForm clients={clients} />
    </section>
  );
}
