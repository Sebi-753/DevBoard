import { getTask } from "@/lib/data-services-tasks";

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function page({ params }: Props) {
  const { taskId } = await params;

  const task = await getTask(taskId);
  console.log(task);

  return <div>{taskId}</div>;
}
