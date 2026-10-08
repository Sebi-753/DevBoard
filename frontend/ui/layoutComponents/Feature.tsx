import { ReactNode } from "react";

type Props = {
  title: string;
  text: string;
  icon: ReactNode;
};

export default function Feature({ title, text, icon }: Props) {
  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-[var(--feature-blue)] p-5 shadow-xs">
      <div className="[&>svg]:size-6">{icon}</div>
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-semibold text-[var(--text)]">{title}</h4>
        <p className="text-base text-[var(--text-secondary)]">{text}</p>
      </div>
    </div>
  );
}
