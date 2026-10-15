import Link from "next/link";
import H2 from "../components/H2";
import H3 from "../components/H3";

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-background)] px-10 py-10 text-[var(--footer-text)]">
      <header className="flex flex-col gap-3">
        <H2>DevBoard</H2>
        <H3 className="text[var(--footer-text-muted)] text-base">
          Simple project management for freelancers and clients.
        </H3>
      </header>
      <div className="mt-10">
        <h4 className="mb-2 text-xl font-semibold">Product</h4>
        <ul className="flex flex-col gap-1 text-sm">
          <li>Features</li>
          <li>How it works</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div className="mt-10">
        <h4 className="mb-4 text-xl font-bold">Account</h4>
        <div className="flex flex-col gap-3">
          <Link href={"/login"}>Login</Link>
          <Link href={"/signup"}>Sign up</Link>
        </div>
      </div>
      <div className="my-6 text-[var(--footer-text-muted)]">
        © 2026 DevBoard. All rights reserved.
      </div>
    </footer>
  );
}
