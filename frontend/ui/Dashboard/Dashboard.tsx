import { User } from "@/types/user";
import AdminDashboard from "./Dashboards/AdminDashboard";
import FreelancerDashboard from "./Dashboards/FreelancerDashboard";
import ClientDashboard from "./Dashboards/ClientDashboard";

type Props = {
  user: User;
};

export default function Dashboard({ user }: Props) {
  return (
    <section>
      {user.role === "admin" && <AdminDashboard user={user} />}
      {user.role === "freelancer" && <FreelancerDashboard user={user} />}
      {user.role === "client" && <ClientDashboard user={user} />}
    </section>
  );
}
