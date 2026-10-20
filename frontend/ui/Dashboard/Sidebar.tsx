"use client";
import { useEffect, useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";

import { User } from "@/types/user";
import Logo from "../layoutComponents/Logo";
import AdminSidebar from "./Sidebars/AdminSidebar";
import FreelancerSidebar from "./Sidebars/FreelancerSidebar";
import ClientSidebar from "./Sidebars/ClientSidebar";
import { adminLinks, clientLinks, freelancerLinks } from "@/utils/SidebarLinks";
import Overlay from "../components/Overlay";

type Props = { user: User };

export default function Sidebar({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <>
      {isOpen && <Overlay isOpen={isOpen} onClose={handleClose} />}
      <nav
        className={`fixed z-60 flex h-dvh w-[60vw] flex-col items-start border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] px-6 py-6 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-[-100%]"}`}
      >
        <div className="relative">
          {/* Menu button */}
          <button
            onClick={() => setIsOpen((open) => !open)}
            className="fixed top-6 right-[-15%] z-70"
          >
            {isOpen ? <ChevronLeft size={28} /> : <Menu size={28} />}
          </button>

          <Logo />
          <div className="my-6 h-[1px] w-full bg-gray-200"></div>
          <main>
            {user.role === "admin" && (
              <AdminSidebar
                links={adminLinks}
                user={user}
                onClick={handleClose}
              />
            )}{" "}
            {user.role === "freelancer" && (
              <FreelancerSidebar
                links={freelancerLinks}
                user={user}
                onClick={handleClose}
              />
            )}
            {user.role === "client" && (
              <ClientSidebar
                links={clientLinks}
                user={user}
                onClick={handleClose}
              />
            )}
          </main>
        </div>
      </nav>
    </>
  );
}
