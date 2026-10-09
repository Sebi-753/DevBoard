import { User } from "@/types/user";
import Button from "../components/Button";
import Logo from "../layoutComponents/Logo";

type Props = {
  user?: User;
};

export default function Hero({ user }: Props) {
  return (
    <section className="flex h-full flex-col gap-15 bg-[var(--background-secondary)] px-10 pt-30">
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
      <main className="flex flex-col items-center gap-15">
        {user && (
          <h3 className="text-lg font-semibold">
            Wellcome, <span>{user.name}</span>
          </h3>
        )}
        <div className="w-[80%]">
          {user ? (
            <div className="flex flex-col gap-5">
              <Button link="/dashboard" type="dashboard">
                Dashboard
              </Button>
              <Button link="/account" type="getstarted">
                Manege account
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <Button link="/signup" type="getstarted">
                Get started
              </Button>
              <Button link="/login" type="login">
                Log in
              </Button>
              <Button link="#how-it-works" type="how-it-works">
                See how it works
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-[var(--text-muted)] italic">
          No complicated setup. Just create a project and get to work.
        </p>
      </main>
    </section>
  );
}
