import Button from "../components/Button";
import H2 from "../components/H2";
import H3 from "../components/H3";

export default function CTA() {
  return (
    <section className="flex flex-col gap-16 bg-[var(--background)] bg-[var(--background-secondary)] bg-[var(--cta-background)] px-10 py-20 text-[var(--cta-text)]">
      <header className="flex flex-col gap-3 text-center">
        <H2 className="text-xl">Ready to get your projects under control?</H2>
        <H3 className="text-[var(--cta-text-muted)]">
          Stop juggling tasks, messages, and deadlines across different tools.
        </H3>
      </header>
      <Button type="getstarted-cta">Get started for free</Button>
    </section>
  );
}
