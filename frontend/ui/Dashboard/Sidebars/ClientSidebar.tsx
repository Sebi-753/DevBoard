"use client";

import { NavLink, User } from "@/types/user";
import SidebarLink from "@/ui/components/SidebarLink";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  user: User;
  links: NavLink[];
  // setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ClientSidebar({ user, links }: Props) {
  const pathname = usePathname();

  return (
    <ul>
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/dashboard" && pathname.startsWith(`${link.href}/`));

        return <SidebarLink key={link.href} isActive={isActive} link={link} />;
      })}
    </ul>
  );
}
