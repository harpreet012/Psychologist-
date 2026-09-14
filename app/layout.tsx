import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.professionalTitle} in Rohtak`,
  description:
    "Online and in-person counselling for anxiety, emotional difficulties, relationships, self-esteem, life transitions, stress, and burnout with Anjali Jakhar in Rohtak.",
  keywords: [
    "psychologist",
    "therapist",
    "therapy",
    "counselling psychologist Rohtak",
    "online counselling",
    "anxiety counselling",
    "relationship counselling",
    "stress counselling",
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.professionalTitle}`,
    description:
      "A collaborative counselling space to understand difficult emotions, recurring patterns, and meaningful next steps.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-sans bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
