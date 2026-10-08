import Link from "next/link";
import LoginForm from "@/ui/layoutComponents/LoginForm";
import React from "react";

export default function page() {
  return (
    <section className="h-[100dvh] px-8 pt-16">
      <header className="flex flex-col items-center justify-center gap-8 font-bold">
        <h2 className="text-xl font-black">
          <Link href={"/"}>DevBoard</Link>
        </h2>
        <h3 className="text-2xl">Log in or Sign up</h3>
      </header>
      <main>
        <LoginForm />
      </main>
    </section>
  );
}
