import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

interface PaymentLinkInput {
  appointmentId: string;
  amountPaise: number;
  description: string;
  name: string;
  email: string;
  phone: string;
  expireAt: Date;
  callbackUrl: string;
}

export interface RazorpayPaymentLink {
  id: string;
  short_url: string;
  status: string;
  reference_id: string;
  amount: number;
  expire_by?: number;
}

function razorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Razorpay API credentials are not configured.");
  }
  return { keyId, keySecret };
}

export async function createRazorpayPaymentLink(
  input: PaymentLinkInput
): Promise<RazorpayPaymentLink> {
  const { keyId, keySecret } = razorpayCredentials();
  const response = await fetch("https://api.razorpay.com/v1/payment_links/", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: "INR",
      accept_partial: false,
      expire_by: Math.floor(input.expireAt.getTime() / 1000),
      reference_id: input.appointmentId,
      description: input.description,
      customer: {
        name: input.name,
        email: input.email,
        contact: input.phone,
      },
      notify: { sms: false, email: false },
      reminder_enable: false,
      callback_url: input.callbackUrl,
      callback_method: "get",
      notes: { appointment_id: input.appointmentId },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Razorpay payment-link creation failed (${response.status}): ${detail}`);
  }

  const link = (await response.json()) as RazorpayPaymentLink;
  if (!link.id || !link.short_url) {
    throw new Error("Razorpay did not return a usable payment link.");
  }
  return link;
}

export function verifyRazorpayWebhook(rawBody: string, signature: string | null) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signature);
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function cancelRazorpayPaymentLink(paymentLinkId: string) {
  const { keyId, keySecret } = razorpayCredentials();
  const response = await fetch(
    `https://api.razorpay.com/v1/payment_links/${encodeURIComponent(paymentLinkId)}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Razorpay payment-link cancellation failed (${response.status}): ${detail}`);
  }
}
