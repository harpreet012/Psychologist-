"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, CalendarCheck, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
];

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="space-y-1.5">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-sage-500 text-cream font-medium"
                  : "text-charcoal-soft hover:bg-sage-50"
              }`}
            >
              <Icon size={17} strokeWidth={1.85} />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-charcoal-soft transition-colors hover:bg-charcoal/5 disabled:opacity-60 ${className}`}
    >
      <LogOut size={17} strokeWidth={1.85} />
      {loading ? "Signing out..." : "Logout"}
    </button>
  );
}

export default function AdminSidebar({ adminEmail }: { adminEmail?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-charcoal/8 bg-white px-4 py-6 md:flex">
        <div className="flex items-center gap-2.5 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500/10">
            <span className="h-3 w-3 rounded-full bg-sage-500" />
          </span>
          <span className="font-serif text-lg text-charcoal">Anjali Jakhar</span>
        </div>
        <p className="mt-1 px-2 text-xs text-charcoal-muted">Admin Dashboard</p>

        <nav className="mt-8 flex-1">
          <SidebarLinks />
        </nav>

        <div className="border-t border-charcoal/8 pt-4">
          {adminEmail && (
            <p className="truncate px-2 pb-2 text-xs text-charcoal-muted">
              {adminEmail}
            </p>
          )}
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="flex items-center justify-between border-b border-charcoal/8 bg-white px-4 py-3.5 md:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-500/10">
            <span className="h-2.5 w-2.5 rounded-full bg-sage-500" />
          </span>
          <span className="font-serif text-base text-charcoal">
            Anjali Jakhar Admin
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open admin menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal"
        >
          <Menu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-72 flex-col bg-white px-4 py-6"
            >
              <div className="flex items-center justify-between px-2">
                <span className="font-serif text-lg text-charcoal">
                  Anjali Jakhar
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close admin menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="mt-8 flex-1">
                <SidebarLinks onNavigate={() => setOpen(false)} />
              </nav>
              <div className="border-t border-charcoal/8 pt-4">
                {adminEmail && (
                  <p className="truncate px-2 pb-2 text-xs text-charcoal-muted">
                    {adminEmail}
                  </p>
                )}
                <LogoutButton />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
