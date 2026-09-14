import "server-only";
import { SignJWT, importPKCS8 } from "jose";

interface GoogleToken {
  value: string;
  expiresAt: number;
}

interface BusyInterval {
  start: string;
  end: string;
}

interface CalendarEventInput {
  appointmentId: string;
  start: string;
  end: string;
  timeZone: string;
  sessionType: "online" | "in-person";
}

let cachedToken: GoogleToken | null = null;

export function isGoogleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID
  );
}

function calendarCredentials() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim();
  const unquotedKey =
    rawKey?.startsWith('"') && rawKey?.endsWith('"')
      ? rawKey.slice(1, -1)
      : rawKey;
  const privateKey = unquotedKey?.replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();

  if (!clientEmail || !privateKey || !calendarId) {
    throw new Error(
      "Google Calendar is not configured. Set the service-account email, private key, and calendar ID."
    );
  }

  return { clientEmail, privateKey, calendarId };
}

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const { clientEmail, privateKey } = calendarCredentials();
  const now = Math.floor(Date.now() / 1000);
  const key = await importPKCS8(privateKey, "RS256");
  const assertion = await new SignJWT({
    scope:
      "https://www.googleapis.com/auth/calendar.freebusy https://www.googleapis.com/auth/calendar.events",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(clientEmail)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google authentication failed (${response.status}).`);
  }

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!data.access_token) throw new Error("Google did not return an access token.");

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

async function googleRequest<T>(url: string, init: RequestInit): Promise<T> {
  const accessToken = await getAccessToken();
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Calendar request failed (${response.status}): ${detail}`);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function getGoogleBusyIntervals(
  timeMin: string,
  timeMax: string,
  timeZone: string
): Promise<BusyInterval[]> {
  const { calendarId } = calendarCredentials();
  const data = await googleRequest<{
    calendars?: Record<string, { busy?: BusyInterval[]; errors?: unknown[] }>;
  }>("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone,
      items: [{ id: calendarId }],
    }),
  });

  const calendar = data.calendars?.[calendarId];
  if (calendar?.errors?.length) {
    throw new Error("Google Calendar returned an error for the configured calendar.");
  }
  return calendar?.busy ?? [];
}

export async function createGoogleAppointmentEvent(input: CalendarEventInput) {
  const { calendarId } = calendarCredentials();
  const eventId = input.appointmentId.replace(/-/g, "");
  const baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId
  )}/events`;

  const eventBody = {
    id: eventId,
    summary: "Private counselling appointment",
    description: `Website appointment ID: ${input.appointmentId}`,
    location:
      input.sessionType === "online"
        ? "Online session"
        : "Rohtak — exact location confirmed directly",
    start: { dateTime: input.start, timeZone: input.timeZone },
    end: { dateTime: input.end, timeZone: input.timeZone },
    guestsCanInviteOthers: false,
    guestsCanModify: false,
    guestsCanSeeOtherGuests: false,
    extendedProperties: {
      private: { appointmentId: input.appointmentId },
    },
  };

  try {
    return await googleRequest<{ id: string; htmlLink?: string }>(
      `${baseUrl}?sendUpdates=none`,
      { method: "POST", body: JSON.stringify(eventBody) }
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("(409)")) {
      return googleRequest<{ id: string; htmlLink?: string }>(
        `${baseUrl}/${eventId}`,
        { method: "GET" }
      );
    }
    throw error;
  }
}

export async function deleteGoogleAppointmentEvent(eventId: string) {
  const { calendarId } = calendarCredentials();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId
  )}/events/${encodeURIComponent(eventId)}?sendUpdates=none`;
  try {
    await googleRequest<void>(url, { method: "DELETE" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("(410)")) return;
    if (error instanceof Error && error.message.includes("(404)")) return;
    throw error;
  }
}
