import HowItWorksStep from "../layoutComponents/HowItWorksStep";

import H2 from "../components/H2";
import H3 from "../components/H3";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col gap-16 bg-[var(--background)] bg-[var(--background-secondary)] px-10 py-20"
    >
      <header className="flex flex-col gap-3 text-center">
        <H2>How it works</H2>
        <H3>From idea to done in three steps.</H3>
      </header>
      <main>
        <div className="grid grid-cols-1 gap-4">
          <HowItWorksStep
            step="1"
            title="Create a project"
            text="Set up your project, add the client, define the deadline, and get
          everything in place."
          />
          <HowItWorksStep
            step="2"
            title="Break it into tasks"
            text=" Turn your project into clear tasks, assign priorities, and keep
          track of progress."
          />
          <HowItWorksStep
            step="3"
            title="Work together"
            text=" Collaborate with your client, discuss tasks, and keep everyone
          aligned until the project is complete."
          />
        </div>
      </main>
    </section>
  );
}
