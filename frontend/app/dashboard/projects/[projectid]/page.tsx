import H2 from "@/ui/components/H2";
import Image from "next/image";
import { Project } from "@/types/project";
import ProjectInfo from "@/ui/layoutComponents/ProjectInfo";
import {
  Calendar,
  Check,
  Clock,
  DollarSign,
  ListTodo,
  MoreHorizontal,
  User,
} from "lucide-react";
import StatCard from "@/ui/components/StatCard";
import ProgressBar from "@/ui/components/Progressbar";
import ProjectTasksContainer from "@/ui/layoutComponents/ProjectTasksContainer";
import { getProjctsTasks, getProject } from "@/lib/data-services-projects";
import { Task } from "@/types/task";

const statusStyles = {
  planning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  "in-progress": "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};

type Props = {
  params: Promise<{ projectid: string }>;
};

export default async function page({ params }: Props) {
  const { projectid } = await params;

  const project: Project = await getProject(projectid);

  const tasks: Task[] = await getProjctsTasks(projectid);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const deadline = formatDate(project.deadline);

  //Counts
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const remainingTasksCount = tasks.filter(
    (task) => task.status === "todo",
  ).length;
  const inProgressTasksCount = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  return (
    <section className="flex flex-col gap-20 bg-[var(--background-secondary)] px-6 py-10">
      <header className="flex flex-col gap-6 text-center">
        <div className="relative">
          <Image
            loading="eager"
            src={"/images/default-project.jpg"}
            alt={`${project.name} image`}
            width={800}
            height={400}
            className="w-full rounded-xl object-cover"
          />
          <div
            className={`absolute top-2 right-2 ${project.status === "planning" && statusStyles.planning} ${project.status === "completed" && statusStyles.completed} ${project.status === "in-progress" && statusStyles["in-progress"]} rounded-lg px-2 py-1 font-semibold opacity-75`}
          >
            {project.status[0].toUpperCase() + project.status.slice(1)}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <H2>{project.name}</H2>
          <p className="text-base">{project.description}</p>
        </div>

        <aside>
          <ul className="mt-5 grid grid-cols-1 gap-3">
            <li>
              <ProjectInfo
                Icon={User}
                title="Client"
                content={project.client?.name}
              />
            </li>
            <li>
              <ProjectInfo
                Icon={User}
                title="Owner"
                content={project.owner?.name}
              />
            </li>
            <li>
              <ProjectInfo
                Icon={Calendar}
                title="Deadline"
                content={deadline}
              />
            </li>
            <li>
              <ProjectInfo
                Icon={DollarSign}
                title="Buget"
                content={`$${project.buget}`}
              />
            </li>
          </ul>
        </aside>
      </header>
      <main>
        <div>
          <div>
            <ul className="grid grid-cols-1 gap-3">
              <li>
                <StatCard
                  title="Total tasks"
                  icon={ListTodo}
                  value={totalTasksCount}
                />
              </li>
              <li>
                <StatCard
                  title="Completed"
                  icon={Check}
                  value={completedTasksCount}
                />
              </li>
              <li>
                <StatCard
                  title="In progress"
                  icon={Clock}
                  value={inProgressTasksCount}
                />
              </li>
              <li>
                <StatCard
                  title="Remaning"
                  icon={MoreHorizontal}
                  value={remainingTasksCount}
                />
              </li>
            </ul>
          </div>
          <div className="mt-10 rounded-xl bg-white px-4 py-3 shadow-xs">
            <div>
              <ProgressBar
                completedTasks={completedTasksCount}
                totalTasks={totalTasksCount}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <ProjectTasksContainer tasks={tasks} />
        </div>
      </main>
    </section>
  );
}
