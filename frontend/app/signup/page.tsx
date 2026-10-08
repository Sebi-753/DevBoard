import Link from "next/link";

import Button from "@/ui/components/Button";

export default function page() {
  return (
    <section className="h-[100dvh] px-8 pt-16">
      <header className="flex flex-col items-center justify-center gap-8 font-bold">
        <h2 className="text-xl font-black">
          <Link href="/">DevBoard</Link>
        </h2>
        <h3 className="text-2xl">Create Account</h3>
      </header>
      <main>
        <form className="mt-6 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full name"
              className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
            />
          </div>

          <Button link="/signup" type="signup">
            Sign up
          </Button>
        </form>
      </main>
    </section>
  );
}
