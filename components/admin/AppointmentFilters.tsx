"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { APPOINTMENT_STATUSES } from "@/types/appointment";

export default function AppointmentFilters({ services }: { services: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", searchValue.trim());
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-charcoal/8 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center">
      <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:min-w-[220px]">
        <Search
          size={15}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted"
        />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search name, email, or phone"
          aria-label="Search appointments"
          className="w-full rounded-full border border-charcoal/15 py-2 pl-9 pr-4 text-sm focus:border-sage-400"
        />
      </form>

      <select
        value={searchParams.get("status") ?? "all"}
        onChange={(e) => updateParam("status", e.target.value === "all" ? "" : e.target.value)}
        aria-label="Filter by status"
        className="rounded-full border border-charcoal/15 bg-white px-3.5 py-2 text-sm text-charcoal-soft focus:border-sage-400"
      >
        <option value="all">All Statuses</option>
        {APPOINTMENT_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("service") ?? "all"}
        onChange={(e) => updateParam("service", e.target.value === "all" ? "" : e.target.value)}
        aria-label="Filter by service"
        className="rounded-full border border-charcoal/15 bg-white px-3.5 py-2 text-sm text-charcoal-soft focus:border-sage-400"
      >
        <option value="all">All Services</option>
        {services.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={searchParams.get("date") ?? ""}
        onChange={(e) => updateParam("date", e.target.value)}
        aria-label="Filter by appointment date"
        className="rounded-full border border-charcoal/15 bg-white px-3.5 py-2 text-sm text-charcoal-soft focus:border-sage-400"
      />

      <select
        value={searchParams.get("sort") ?? "newest"}
        onChange={(e) => updateParam("sort", e.target.value)}
        aria-label="Sort appointments"
        className="rounded-full border border-charcoal/15 bg-white px-3.5 py-2 text-sm text-charcoal-soft focus:border-sage-400"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="appointment_date">Appointment Date</option>
      </select>

      {isPending && <span className="text-xs text-charcoal-muted">Updating...</span>}
    </div>
  );
}
