import Button from "../components/Button";
import Logo from "../layoutComponents/Logo";

export default function Hero() {
  return (
    <section className="flex h-[100dvh] flex-col gap-20 bg-[var(--background-secondary)] px-10 pt-30">
      <Logo className="absolute top-7 left-5 text-4xl" />
      <header className="flex flex-col gap-10">
        <h1 className="text-center text-2xl font-bold">
          Manage projects. Ship better work.
        </h1>
        <h2 className="text-center text-base font-semibold text-[var(--text-secondary)]">
          DevBoard gives freelancers and clients one simple place to manage
          projects, track tasks, and stay on the same page.
        </h2>
      </header>
      <main className="flex flex-col items-center gap-20">
        <div className="flex w-[80%] flex-col gap-5">
          <Button link="/signup" type="getstarted">
            Get started
          </Button>
          <Button link="#how-it-works" type="how-it-works">
            See how it works
          </Button>
        </div>
        <p className="text-center text-[var(--text-muted)] italic">
          No complicated setup. Just create a project and get to work.
        </p>
      </main>
    </section>
  );
}
