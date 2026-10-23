import { getMe } from "@/lib/server-data-services";
import { User } from "@/types/user";
import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";
import StatCard from "@/ui/components/StatCard";
import { formatDate } from "@/utils/formatDate";
import {
  CalendarDays,
  CheckCircle2,
  FolderKanban,
  Mail,
  MapPin,
  Pencil,
  Phone,
  UserRound,
  BriefcaseBusiness,
  Clock3,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const user: User = await getMe();
  const joinedDate = formatDate(user.createdAt);
  console.log(user);

  const roleStyles: Record<string, string> = {
    freelancer:
      "bg-blue-500/10 text-blue-500 ring-1 ring-inset ring-blue-500/20",
    client:
      "bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20",
    admin:
      "bg-purple-500/10 text-purple-500 ring-1 ring-inset ring-purple-500/20",
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:gap-8 lg:py-10">
      {/* Page heading */}
      <div className="flex flex-col items-center justify-between gap-3">
        <div className="text-center">
          <H2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Profile
          </H2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Manage your personal information and professional profile.
          </p>
        </div>

        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Pencil size={16} />
          Edit profile
        </Link>
      </div>

      {/* Profile header */}
      <header className="relative overflow-hidden rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] shadow-sm">
        <div className="h-24 bg-[var(--primary)] sm:h-32" />

        <div className="px-5 pb-5 sm:px-7 sm:pb-7">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:gap-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-[var(--background-secondary)] bg-[var(--background)] sm:h-28 sm:w-28">
              <Image
                src="/images/user.jpg"
                alt="Profile photo"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>

            <div className="min-w-0 flex-1 sm:pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold sm:text-2xl">{user.name}</h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    roleStyles[user.role] ?? "bg-gray-500/10 text-gray-500"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  Joined {joinedDate}
                </span>
              </div>
            </div>

            <Link
              href="/dashboard/settings"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--sidebar-border)] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--background-hover)] sm:mb-1"
            >
              <Pencil size={15} />
              Edit details
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,1fr)] lg:gap-8">
        {/* Left column */}
        <main className="flex min-w-0 flex-col gap-6">
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <StatCard title="Projects" value={4} icon={FolderKanban} />
            <StatCard title="Tasks Completed" value={12} icon={CheckCircle2} />
          </div>

          {/* About me */}
          <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <H3 className="text-lg font-semibold">About me</H3>

              <Link
                href="/dashboard/settings"
                aria-label="Edit about me"
                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--background-hover)] hover:text-[var(--primary)]"
              >
                <Pencil size={16} />
              </Link>
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              {user.bio ? user.bio : "No bio yet"}
            </p>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <H3 className="text-lg font-semibold">Skills</H3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Technologies and tools
                </p>
              </div>

              <Link
                href="/dashboard/settings"
                aria-label="Edit skills"
                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--background-hover)] hover:text-[var(--primary)]"
              >
                <Pencil size={16} />
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {user.skills &&
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--sidebar-border)] bg-[var(--background)] px-3 py-1.5 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </section>
        </main>

        {/* Right column */}
        <aside className="flex min-w-0 flex-col gap-6">
          {/* Personal information */}
          <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <H3 className="flex items-center gap-2 text-lg font-semibold">
                <UserRound size={20} className="text-[var(--primary)]" />
                Personal information
              </H3>

              <Link
                href="/dashboard/settings"
                aria-label="Edit personal information"
                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--background-hover)] hover:text-[var(--primary)]"
              >
                <Pencil size={16} />
              </Link>
            </div>

            <ul className="mt-6 flex flex-col gap-5">
              <li className="flex min-w-0 items-start gap-3">
                <Mail
                  size={19}
                  className="mt-1 shrink-0 text-[var(--text-muted)]"
                />
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)]">
                    Email address
                  </p>
                  <p className="mt-1 text-sm font-medium break-all">
                    {user.email}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={19}
                  className="mt-1 shrink-0 text-[var(--text-muted)]"
                />
                <div>
                  <p className="text-xs text-[var(--text-muted)]">
                    Phone number
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
                    {user.phone ? user.phone : "Not set"}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-1 shrink-0 text-[var(--text-muted)]"
                />
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Location</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
                    {user.location ? user.location : "Not set"}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <CalendarDays
                  size={19}
                  className="mt-1 shrink-0 text-[var(--text-muted)]"
                />
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Birth date</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
                    {user.birthDate ? user.birthDate : "Not set"}
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Work preferences */}
          <section className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--background-secondary)] p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <H3 className="text-lg font-semibold">Work preferences</H3>

              <Link
                href="/dashboard/settings"
                aria-label="Edit work preferences"
                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--background-hover)] hover:text-[var(--primary)]"
              >
                <Pencil size={16} />
              </Link>
            </div>

            <ul className="mt-5 flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <BriefcaseBusiness
                  size={19}
                  className="mt-1 shrink-0 text-[var(--text-muted)]"
                />
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Work type</p>
                  <p className="mt-1 text-sm font-medium">Not specified</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock3
                  size={19}
                  className="mt-1 shrink-0 text-[var(--text-muted)]"
                />
                <div>
                  <p className="text-xs text-[var(--text-muted)]">
                    Availability
                  </p>
                  <p className="mt-1 text-sm font-medium">Not specified</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Globe
                  size={19}
                  className="mt-1 shrink-0 text-[var(--text-muted)]"
                />
                <div>
                  <p className="text-xs text-[var(--text-muted)]">
                    Preferred location
                  </p>
                  <p className="mt-1 text-sm font-medium">Remote</p>
                </div>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </section>
  );
}
