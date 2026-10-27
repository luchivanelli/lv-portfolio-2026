import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import LanguageProvider from "./components/providers/LanguageProvider";
import SmoothScroll from "./components/providers/SmoothScroll";
import { personal, site } from "./lib/data";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const title = `${personal.name} — Frontend Developer`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description.es,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: personal.name,
    title,
    description: site.description.es,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description.es,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-fg font-sans antialiased">
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
