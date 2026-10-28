import { getMe } from "@/lib/server-data-services";
import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";
import SettingsLink from "@/ui/layoutComponents/SettingsLink";
import {
  BriefcaseBusiness,
  LucideIcon,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  UserRound,
} from "lucide-react";

type SettingsItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export const settingsLinks: SettingsItem[] = [
  {
    icon: UserRound,
    title: "Personal Information",
    description: "Update your name, email, and profile photo.",
    href: "/dashboard/settings/personal-information",
  },
  {
    icon: BriefcaseBusiness,
    title: "Professional Profile",
    description: "Manage your skills, experience, and professional details.",
    href: "/dashboard/settings/professional-profile",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description: "Change your password and manage account security.",
    href: "/dashboard/settings/security",
  },
  {
    icon: SlidersHorizontal,
    title: "Preferences",
    description: "Customize your account and application preferences.",
    href: "/dashboard/settings/preferences",
  },
  {
    icon: Trash2,
    title: "Delete Account",
    description: "Permanently delete your account and associated data.",
    href: "/dashboard/settings/delete-account",
  },
];

export default async function page() {
  return (
    <section className="flex flex-col gap-4 px-6 py-10">
      <header className="text-center">
        <H2>Settings</H2>
        <H3>Manage account settings and personal information</H3>
      </header>
      <main>
        <ul className="flex flex-col gap-3">
          {settingsLinks.map((item) => (
            <li key={item.href}>
              <SettingsLink {...item} />
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
