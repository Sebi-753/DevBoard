import Link from "next/link";

import { NavLink } from "@/types/user";
import { Dispatch, SetStateAction } from "react";

type Props = {
  link: NavLink;
  isActive: boolean;
  // setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SidebarLink({ link, isActive }: Props) {
  return (
    <li>
      <Link
        href={link.href}
        className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "bg-[var(--sidebar-active)] text-[var(--sidebar-text-active)]"
            : "text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)]"
        }`}
      >
        <link.icon
          size={20}
          strokeWidth={1.8}
          className={`shrink-0 transition-colors ${
            isActive
              ? "text-[var(--sidebar-text-active)]"
              : "text-[var(--sidebar-text-muted)] group-hover:text-[var(--sidebar-text)]"
          }`}
        />
        <span>{link.label}</span>
      </Link>
    </li>
  );
}
