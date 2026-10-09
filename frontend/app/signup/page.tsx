import Link from "next/link";
import SignupForm from "@/ui/layoutComponents/SignupForm";

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
        <SignupForm />
      </main>
    </section>
  );
}
