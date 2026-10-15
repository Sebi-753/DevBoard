import { NavLink, User } from "@/types/user";
import SidebarLink from "@/ui/components/SidebarLink";
import { usePathname } from "next/navigation";

type Props = {
  user: User;
  links: NavLink[];
  onClick: () => void;
};

export default function FreelancerSidebar({ user, links, onClick }: Props) {
  const pathname = usePathname();

  return (
    <ul>
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/dashboard" && pathname.startsWith(`${link.href}/`));

        return (
          <SidebarLink
            onClick={onClick}
            key={link.href}
            isActive={isActive}
            link={link}
          />
        );
      })}
    </ul>
  );
}
