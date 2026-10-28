import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

type SettingsLinkProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export default function SettingsLink({
  icon: Icon,
  title,
  description,
  href,
}: SettingsLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-xl border border-[var(--input-border)] bg-[var(--background)] p-4 transition-colors hover:bg-[var(--background-hover)]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--background-secondary)]">
        <Icon size={21} className="text-[var(--primary)]" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-[var(--foreground)]">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <ChevronRight
        size={20}
        className="shrink-0 text-gray-400"
        aria-hidden="true"
      />
    </Link>
  );
}
