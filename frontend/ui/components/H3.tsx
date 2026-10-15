import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function H3({ children, className = "" }: Props) {
  return (
    <h3 className={`text-base text-[var(--text-secondary)] ${className}`}>
      {children}
    </h3>
  );
}
