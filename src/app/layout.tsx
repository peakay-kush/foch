import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrueVolt Systems — Solar, Electrical & Security Solutions",
  description:
    "TrueVolt Systems delivers expert solar installations, electrical services, and security systems for residential and commercial properties. Trusted quality, lasting performance.",
  keywords: [
    "solar installation",
    "electrical contractor",
    "security systems",
    "solar panels",
    "CCTV installation",
    "electrical wiring",
    "TrueVolt Systems",
  ],
  openGraph: {
    title: "TrueVolt Systems — Solar, Electrical & Security Solutions",
    description:
      "Expert solar, electrical and security installations. Trusted quality, lasting performance.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
