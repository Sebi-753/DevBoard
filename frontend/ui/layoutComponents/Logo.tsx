import Link from "next/link";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <Link
      href={"/"}
      className={`flex justify-center text-xl font-extrabold text-[var(--primary)] hover:text-[var(--primary-hover)] ${className}`}
    >
      DevBoard
    </Link>
  );
}
