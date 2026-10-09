import { getMe } from "@/lib/server-data-services";
import { User } from "@/types/user";

import Sidebar from "@/ui/Dashboard/Sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const user: User = await getMe();
  return (
    <section>
      <Sidebar user={user} />
      <main>{children}</main>
    </section>
  );
}
