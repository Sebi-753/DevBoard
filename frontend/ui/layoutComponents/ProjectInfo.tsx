import { LucideIcon } from "lucide-react";

type Props = { Icon: LucideIcon; title: string; content: string };
export default function ProjectInfo({ Icon, title, content }: Props) {
  return (
    <div className="grid w-full grid-cols-[auto_1fr] gap-4 rounded-xl p-4 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex size-12 items-center justify-center rounded-full">
        <Icon size={22} />
      </div>

      <div className="flex min-w-0 flex-col items-start">
        <p className="text-sm font-medium text-[var(--text-muted)]">{title}</p>
        <p className="truncate text-base font-semibold text-[var(--text-secondary)]">
          {content}
        </p>
      </div>
    </div>
  );
}
