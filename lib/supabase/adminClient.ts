import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Client scoped to the Supabase service role key. This bypasses Row
 * Level Security entirely, so it must only be used in server-only code
 * that has already verified an admin session (see lib/admin-session.ts).
 * The `server-only` import above makes any accidental client-side
 * import fail at build time rather than leaking the key at runtime.
 */
export function getAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase admin access is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
