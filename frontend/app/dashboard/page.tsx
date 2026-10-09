import { getMe } from "@/lib/server-data-services";
import { User } from "@/types/user";
import Dashboard from "@/ui/Dashboard/Dashboard";

export default async function page() {
  const user: User = await getMe();

  return <Dashboard user={user} />;
}
