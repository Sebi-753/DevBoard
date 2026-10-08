import Button from "../components/Button";

export default function CTA() {
  return (
    <section className="flex flex-col gap-16 bg-[var(--background)] bg-[var(--background-secondary)] bg-[var(--cta-background)] px-10 py-20 text-[var(--cta-text)]">
      <header className="flex flex-col gap-3 text-center">
        <h2 className="text-xl font-semibold">
          Ready to get your projects under control?
        </h2>
        <h3 className="text-[var(--cta-text-muted)]">
          Stop juggling tasks, messages, and deadlines across different tools.
        </h3>
      </header>
      <Button type="getstarted-cta">Get started for free</Button>
    </section>
  );
}
