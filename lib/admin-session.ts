import "server-only";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
  AdminSessionPayload,
} from "@/lib/admin-auth";

/**
 * Reads and verifies the admin session cookie. Safe to call from Server
 * Components, Route Handlers, and Server Actions only.
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}
