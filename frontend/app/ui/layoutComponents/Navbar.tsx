"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Menu button */}
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="fixed top-6 right-5 z-[110]"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sliding navbar */}
      <nav
        className={`fixed top-0 right-0 z-[100] flex h-[100dvh] w-[60%] flex-col justify-between bg-[var(--background)] px-5 py-10 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <Logo className="" />

          <ul className="mt-10 flex flex-col items-center gap-8 text-lg font-semibold">
            <li>
              <Link href="/">Features</Link>
            </li>

            <li>
              <Link href="/">How it works</Link>
            </li>

            <li>
              <Link href="/">Pricing</Link>
            </li>

            <li>
              <Link href="/login">Log in</Link>
            </li>

            <li>
              <Link href="/signup">Get started</Link>
            </li>
          </ul>
        </div>
        <div>
          <Button type="signout">Sign out</Button>
        </div>
      </nav>
    </div>
  );
}
