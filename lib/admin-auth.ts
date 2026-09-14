import { SignJWT, jwtVerify } from "jose";

/**
 * Framework-agnostic admin session token helpers.
 *
 * This module intentionally avoids `next/headers` or any Node-only APIs
 * so it can run in both the Edge middleware and regular server code.
 */

export const ADMIN_COOKIE_NAME = "sp_admin_session";
const SESSION_TTL = "8h";

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add it to your environment variables."
    );
  }
  return new TextEncoder().encode(secret);
}

export interface AdminSessionPayload {
  email: string;
  role: "admin";
}

export async function createAdminSessionToken(email: string): Promise<string> {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(getSecretKey());
}

export async function verifyAdminSessionToken(
  token: string | undefined | null
): Promise<AdminSessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.role !== "admin" || typeof payload.email !== "string") {
      return null;
    }
    return { email: payload.email, role: "admin" };
  } catch {
    // Expired, malformed, or tampered token.
    return null;
  }
}
