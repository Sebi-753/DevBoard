import { getTask } from "@/lib/data-services-tasks";

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function page({ params }: Props) {
  const { taskId } = await params;

  return <div>{taskId}</div>;
}
