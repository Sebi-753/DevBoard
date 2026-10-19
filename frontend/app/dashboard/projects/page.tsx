import { Project as ProjectType } from "@/types/project";
import Project from "@/ui/layoutComponents/Project";
import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";
import { getUserProjects } from "@/lib/data-services-projects";

export default async function page() {
  const projects: ProjectType[] = await getUserProjects();

  return (
    <section className="flex flex-col gap-6 px-6 py-10">
      <header className="text-center">
        <H2 className="text-xl font-semibold">Your Projects</H2>
        <H3>Manage your projects</H3>
      </header>

      <ul className={`flex flex-col gap-4`}>
        {projects.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </ul>
    </section>
  );
}
