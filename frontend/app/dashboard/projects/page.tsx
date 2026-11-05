import Link from "next/link";
import { Plus } from "lucide-react";
import { Project as ProjectType } from "@/types/project";
import Project from "@/ui/layoutComponents/Project";
import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";
import { getUserProjects } from "@/lib/data-services-projects";
import Button from "@/ui/components/Button";

export default async function Page() {
  let projects: ProjectType[] = await getUserProjects();

  projects = projects.sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  );

  return (
    <section className="flex flex-col gap-6 px-6 py-10">
      <header className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <H2 className="text-xl font-semibold">Your Projects</H2>
          <H3>Manage your projects</H3>
        </div>

        <Button type="primary" link="/dashboard/addProject">
          Create project
        </Button>
      </header>

      <ul className="flex flex-col gap-4">
        {projects.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </ul>
    </section>
  );
}
