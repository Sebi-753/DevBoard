import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function H2({ children, className = "" }: Props) {
  return (
    <h2 className={`text-2xl font-semibold text-[--text] ${className}`}>
      {children}
    </h2>
  );
}
