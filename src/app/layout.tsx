import type { Metadata } from "next";

import { inter, playfair, notoNaskhArabic } from "@/lib/fonts";
import "./globals.css";

const siteUrl = "https://garcia-restaurant-cafe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Garcia Restaurant & Cafe",
  description:
    "Experience refined Mediterranean dining at Garcia Restaurant & Cafe. Award-winning cuisine, curated wines, and an intimate ambiance in the heart of the city.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Garcia Restaurant & Cafe",
    title: "Garcia Restaurant & Cafe — Mediterranean Dining",
    description:
      "Experience refined Mediterranean dining at Garcia Restaurant & Cafe. Award-winning cuisine, curated wines, and an intimate ambiance.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Garcia Restaurant & Cafe — Mediterranean Dining",
    description:
      "Experience refined Mediterranean dining at Garcia Restaurant & Cafe. Award-winning cuisine, curated wines, and an intimate ambiance.",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
