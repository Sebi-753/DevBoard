import { Project as ProjectType } from "@/types/project";
import Project from "@/ui/layoutComponents/Project";
import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";

const projects: ProjectType[] = [
  {
    _id: "project-1",
    name: "Portfolio redesign",
    description: "Build a responsive portfolio with a modern design.",
    status: "in-progress",
    completedTasks: 8,
    totalTasks: 12,
    deadline: "2026-10-20",
  },
  {
    _id: "project-2",
    name: "E-commerce website",
    description: "Develop a storefront and product catalog.",
    status: "planning",
    completedTasks: 0,
    totalTasks: 10,
    deadline: "2026-11-05",
  },
];

export default function page() {
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
