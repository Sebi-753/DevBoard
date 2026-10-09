import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ErrorInput({ children }: Props) {
  return <p className="text-sm text-red-500">{children}</p>;
}
