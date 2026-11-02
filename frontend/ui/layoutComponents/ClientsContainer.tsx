"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Mail,
  FolderKanban,
  ArrowUpRight,
  Users,
  X,
} from "lucide-react";
import { Client } from "@/types/user";
import StatCard from "../components/StatCard";
import ClientCard from "./ClientCard";
import ClientDashboard from "../Dashboard/Dashboards/ClientDashboard";

type Props = {
  clients: Client[];
};

export default function ClientsContainer({ clients }: Props) {
  const [search, setSearch] = useState("");

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return clients;

    return clients.filter((client) => {
      const matchesName = client.name.toLowerCase().includes(query);
      const matchesEmail = client.email.toLowerCase().includes(query);
      const matchesProject = client.projects?.some((project) =>
        project.name.toLowerCase().includes(query),
      );

      return matchesName || matchesEmail || matchesProject;
    });
  }, [clients, search]);

  return (
    <div className="flex flex-col gap-7">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatCard
          title="Total clients"
          value={clients.length}
          icon={Users}
          description="Clients you've worked with"
        />
      </section>
      {/* Search and client count */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={17}
            className="text-muted-foreground absolute top-1/2 left-3.5 -translate-y-1/2"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients or projects..."
            className="border-border/70 bg-background focus:border-primary focus:ring-primary/15 placeholder:text-muted-foreground/70 h-11 w-full rounded-xl border pr-10 pl-10 text-sm shadow-sm transition-all outline-none focus:ring-4"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Showing</span>
          <span className="bg-secondary text-foreground rounded-lg px-2.5 py-1 font-semibold tabular-nums">
            {filteredClients.length}
          </span>
          <span className="text-muted-foreground">
            {filteredClients.length === 1 ? "client" : "clients"}
          </span>
        </div>
      </div>

      {/* Client cards */}
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filteredClients.map((client) => (
            <ClientCard key={client._id} client={client} />
          ))}
        </div>
      ) : (
        <div className="border-border/70 bg-card flex flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-16 text-center">
          <div className="bg-secondary mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
            {search ? (
              <Search size={23} className="text-muted-foreground" />
            ) : (
              <Users size={23} className="text-muted-foreground" />
            )}
          </div>

          <h3 className="font-semibold">
            {search ? "No clients found" : "No clients yet"}
          </h3>

          <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
            {search
              ? "We couldn't find any clients matching your search. Try another name, email, or project."
              : "Your clients will appear here once you create projects and start working together."}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-primary mt-5 text-sm font-semibold hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
