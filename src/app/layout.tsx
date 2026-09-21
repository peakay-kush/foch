import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrueVolt Systems Ltd — Solar, Electrical & Security Engineering | Kenya",
  description:
    "TrueVolt Systems Ltd delivers expert solar installations, NCA-certified electrical contracting, and smart security systems across Kenya. EPRA licensed, KPLC compliant.",
  keywords: [
    "solar installation Kenya",
    "electrical contractor Nairobi",
    "security systems Kenya",
    "solar panels Nairobi",
    "CCTV installation Kenya",
    "electric fencing Nairobi",
    "EPRA licensed solar Kenya",
    "NCA registered contractor",
    "TrueVolt Systems Ltd",
  ],
  openGraph: {
    title: "TrueVolt Systems Ltd — Solar, Electrical & Security Engineering | Kenya",
    description:
      "Expert solar, electrical and security installations across Kenya. EPRA licensed, NCA registered, trusted quality.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
