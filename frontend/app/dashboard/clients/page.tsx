import { getUsersClients } from "@/lib/data-services-user";
import ClientsContainer from "@/ui/layoutComponents/ClientsContainer";

export default async function page() {
  const clients = await getUsersClients();

  return (
    <div className="flex flex-col gap-6 px-8 py-10">
      <header className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <p className="text-muted-foreground text-sm">
          Manage your clients and keep track of your relationships.
        </p>
      </header>
      <ClientsContainer clients={clients} />
    </div>
  );
}
