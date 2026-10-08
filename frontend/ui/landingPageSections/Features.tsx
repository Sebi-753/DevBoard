import Feature from "../layoutComponents/Feature";
import {
  FolderKanban,
  ListChecks,
  UsersRound,
  MessageSquareText,
} from "lucide-react";

export default function Features() {
  return (
    <section className="flex flex-col gap-20 bg-[var(--background)] px-10 py-20">
      <header className="flex flex-col items-center gap-3">
        <h2 className="text-2xl font-semibold">Features</h2>
        <h3 className="text-lg text-[var(--text-secondary)]">
          Built for better collaboration
        </h3>
      </header>
      <main>
        <div className="grid grid-cols-1 gap-5">
          <Feature
            title="Projects, organized."
            text="Keep all your projects, deadlines, clients, and progress in one
          place"
            icon={<FolderKanban />}
          />
          <Feature
            title="Tasks that stay on track."
            text="Break projects into manageable tasks, set priorities, and track
          what's done and what's next."
            icon={<ListChecks />}
          />
          <Feature
            title="Simple client collaboration."
            text="  Give clients visibility into their projects without overwhelming
          them with unnecessary complexity."
            icon={<UsersRound />}
          />
          <Feature
            title="Conversations in context."
            text=" Discuss tasks directly where the work happens. No more searching
          through scattered messages.."
            icon={<MessageSquareText />}
          />
        </div>
      </main>
    </section>
  );
}
