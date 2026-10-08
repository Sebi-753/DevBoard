"use client";

import Button from "../components/Button";
import { useState } from "react";
import { login } from "@/lib/data-services";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      setError("Please enter your email and password.");
      return;
    }

    try {
      await login(email, password);
      router.refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-base font-semibold">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-base font-semibold">
          Password
        </label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="login">Log in</Button>
      <Button link="/signup" type="signup">
        Sign up
      </Button>

      <p className="text-center text-[var(--text-muted)]">or</p>

      <Button type="google">Continue with Google</Button>
    </form>
  );
}
