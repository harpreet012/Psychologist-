# Anjali Jakhar Psychology

A production-ready counselling-practice website built with Next.js 16,
TypeScript, Tailwind CSS, Framer Motion, Supabase, Google Calendar, and
Razorpay Payment Links.

## What is included

- Personal, non-generic homepage positioning and transparent credentials
- Detailed counselling services, therapeutic approach, FAQ, and resources
- Live availability calculated from working hours, Google Calendar busy times,
  existing bookings, minimum notice, blocked dates, and a 10-minute buffer
- Temporary 15-minute slot holds and dynamic Razorpay Payment Links
- Signed Razorpay webhook verification and automatic appointment confirmation
- Private Google Calendar event creation after verified payment
- Public token-protected booking-status page and private admin dashboard
- Payment and calendar details in the admin appointment view
- Privacy notice, terms, professional disclaimer, and crisis boundary
- Responsive navigation, accessible focus states, and reduced-motion support

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Public content renders without integrations, but
live availability, payment, and the admin dashboard require the configuration below.

## 1. Database setup

1. Create a Supabase project.
2. Run the complete `supabase/schema.sql` file in the Supabase SQL editor. Run it
   again if upgrading an earlier version of this project; the migration statements
   add the scheduling and payment columns safely.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and the server-only
   `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and Vercel.

The browser never writes directly to Supabase. Validated server routes use the
service-role client. Do not expose the service-role key with a `NEXT_PUBLIC_` name.

## 2. Google Calendar setup

1. In Google Cloud, create/select a project and enable **Google Calendar API**.
2. Create a service account and download its JSON key.
3. In Anjali's Google Calendar settings, share the booking calendar with the
   service-account email and grant **Make changes to events** permission.
4. Copy that calendar's **Calendar ID** from its integration settings.
5. Set these values:

```dotenv
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=calendar-id@group.calendar.google.com
```

The generated event is deliberately private and contains only the time, session
mode, and internal booking ID. The client is not added as a Google Calendar guest,
so a standard service account works without domain-wide delegation.

## 3. Razorpay setup

Start in **Test Mode**.

1. Create Razorpay API keys and set `RAZORPAY_KEY_ID` and
   `RAZORPAY_KEY_SECRET`.
2. In Razorpay Webhooks, add:

   `https://your-domain.com/api/payments/razorpay/webhook`

3. Subscribe to `payment_link.paid`.
4. Create a strong webhook secret in Razorpay and set the exact same value as
   `RAZORPAY_WEBHOOK_SECRET`.
5. Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin, with no trailing path.

The payment page is hosted by Razorpay. The webhook is signature-verified from
the raw request body before a payment is accepted. A successful verified payment
creates the calendar event and confirms the appointment automatically.

## 4. Practice settings

The following two values are required before live slots appear:

```dotenv
SESSION_FEE_INR=1500
BOOKING_CANCELLATION_POLICY=Example only — replace with Anjali's approved policy.
```

Do not launch with the example policy. Confirm the real fee and exact cancellation
and refund wording first.

Scheduling defaults can be changed without editing code:

```dotenv
BOOKING_TIME_ZONE=Asia/Kolkata
BOOKING_WORKING_DAYS=1,2,3,4,5,6
BOOKING_DAY_START=10:00
BOOKING_DAY_END=18:00
BOOKING_SESSION_MINUTES=50
BOOKING_BUFFER_MINUTES=10
BOOKING_HOLD_MINUTES=15
BOOKING_MIN_NOTICE_HOURS=4
BOOKING_HORIZON_DAYS=45
BOOKING_BLOCKED_DATES=2026-10-02,2026-10-24
```

Working days use ISO numbers: Monday is `1`, Sunday is `7`. Blocked dates use
`YYYY-MM-DD` in the configured booking time zone.

## 5. Admin setup

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a strong `ADMIN_SESSION_SECRET`:

```bash
openssl rand -base64 32
```

Add the same variables in Vercel, visit `/admin/login`, and sign in. Cancelling
a pending appointment also cancels its unpaid Payment Link. Cancelling a paid
appointment removes its calendar event, but deliberately does **not** issue an
automatic refund; review the policy and process any eligible refund in Razorpay.

## Before launch

1. Confirm the phone, email, and résumé photograph currently used on the website.
2. Add any approved professional social links in `lib/site-config.ts`.
3. Confirm qualification wording, session modes, fee, working hours, location,
   cancellation/refund policy, and privacy/consent language.
4. Have the legal pages reviewed for the actual practice workflow.
5. Run the database schema and add all Vercel environment variables.
6. Complete an end-to-end Razorpay **Test Mode** booking: choose a slot, pay,
   confirm the admin status becomes Paid/Confirmed, and verify the private event.
7. Test cancellation of both an unpaid hold and a paid appointment.
8. Only then replace test keys with live Razorpay keys and recreate the live webhook.

## Main routes

- `/` — Homepage
- `/about` — Profile, qualifications, experience, and approach
- `/services` — Detailed areas of support
- `/resources` and `/resources/[slug]` — Complete psychoeducational articles
- `/book-appointment` — Live availability, details, and Payment Link flow
- `/contact` — Booking guidance and session modes
- `/privacy`, `/terms`, `/disclaimer` — Practice policies
- `/admin/login` — Private appointment dashboard

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
npm audit
```
