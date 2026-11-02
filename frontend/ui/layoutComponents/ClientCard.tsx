import { Client } from "@/types/user";
import { FolderKanban, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

type Props = { client: Client };

export default function ClientCard({ client }: Props) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl bg-[var(--background)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      {/* Client header */}
      <div className="flex items-center gap-3">
        {client.photo ? (
          <Image
            src={client.photo}
            alt={client.name}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--background-secondary)] text-lg font-semibold text-[var(--primary)]">
            {client.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-[var(--text)]">
            {client.name}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">Client</p>
        </div>

        <span className="rounded-lg bg-[var(--background-secondary)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
          {client.projects?.length ?? 0} projects
        </span>
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FolderKanban size={16} className="text-[var(--primary)]" />
          <h4 className="text-sm font-semibold text-[var(--text)]">Projects</h4>
        </div>

        {client.projects?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {client.projects.slice(0, 3).map((project) => (
              <div
                key={project._id}
                className="flex items-center gap-2.5 rounded-lg bg-[var(--background-secondary)] px-3 py-2.5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                <span className="truncate text-sm text-[var(--text-secondary)]">
                  {project.name}
                </span>
              </div>
            ))}

            {client.projects.length > 3 && (
              <p className="text-xs text-[var(--text-muted)]">
                +{client.projects.length - 3} more projects
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">No projects yet</p>
        )}
      </div>

      {/* Contact information */}
      <div className="flex flex-col gap-3 rounded-xl bg-[var(--background-secondary)] p-4">
        <h4 className="text-xs font-semibold tracking-wide text-[var(--text-muted)]">
          CONTACT INFORMATION
        </h4>

        <div className="flex min-w-0 items-center gap-3">
          <Mail size={16} className="shrink-0 text-[var(--primary)]" />
          <span className="truncate text-sm text-[var(--text-secondary)]">
            {client.email}
          </span>
        </div>

        {client.phone && (
          <div className="flex items-center gap-3">
            <Phone size={16} className="shrink-0 text-[var(--primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">
              {client.phone}
            </span>
          </div>
        )}

        {client.location && (
          <div className="flex items-center gap-3">
            <MapPin size={16} className="shrink-0 text-[var(--primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">
              {client.location}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
