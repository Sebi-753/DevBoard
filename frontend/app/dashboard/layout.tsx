import Dashboard from "@/ui/Dashboard/Dashboard";
import Sidebar from "@/ui/Dashboard/Sidebar";

export default function layout() {
  return (
    <section>
      <Sidebar />
      <Dashboard />
    </section>
  );
}
