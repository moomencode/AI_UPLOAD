import type { Metadata } from "next";

import { inter, playfair, notoNaskhArabic } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garcia Restaurant & Cafe",
  description: "Digital menu platform for Garcia Restaurant & Cafe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${playfair.variable} ${notoNaskhArabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
