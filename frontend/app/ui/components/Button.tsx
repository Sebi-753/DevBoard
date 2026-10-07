import Link from "next/link";
import { ReactNode } from "react";

type Props = { type: string; children: ReactNode; link?: string };

export default function Button({ link = "", type, children }: Props) {
  let style =
    "w-full rounded-xl py-3 text-xl font-semibold transition-all duration-300 hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-px";
  if (type === "login") {
    style +=
      " bg-[var(--background-inverted)] text-[var(--text-inverted)] hover:opacity-90";
  } else if (type === "signup") {
    style +=
      " bg-[var(--background-secondary)] text-[var(--text)] hover:bg-[var(--background-hover)]";
  } else if (type === "google") {
    style +=
      " bg-[var(--background)] text-[var(--text)] border border-[var(--input-border)] hover:bg-[var(--background-hover)]";
  }

  if (link)
    return (
      <button className={`${style}`}>
        <Link href={"/signup"}>{children}</Link>
      </button>
    );

  return <button className={`${style}`}>{children}</button>;
}
