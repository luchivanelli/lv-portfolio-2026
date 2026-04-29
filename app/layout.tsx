import type { Metadata } from "next";
import "./globals.css";
import LanguageProvider from "./components/LanguageProvider";

export const metadata: Metadata = {
  title: "Luciana Vanelli — Frontend Developer",
  description: "Desarrolladora Frontend especializada en crear experiencias web fluidas y escalables. React, Next.js, Tailwind CSS, GSAP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favincon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0d0f0e] text-[#e8ede9]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
