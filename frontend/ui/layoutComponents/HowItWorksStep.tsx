type Props = { step: string; title: string; text: string };

export default function HowItWorksStep({ step, title, text }: Props) {
  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-[var(--step-blue)] p-5 shadow-sm">
      <h3 className="text-4xl font-black text-[var(--step-blue-text)]">
        0{step}
      </h3>
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-semibold text-[var(--text)]">{title}</h4>
        <p className="text-base text-[var(--text-secondary)]">{text}</p>
      </div>
    </div>
  );
}
