import { Inter, Playfair_Display, Noto_Naskh_Arabic } from "next/font/google";

/**
 * Inter — Primary body font.
 * Clean, highly readable sans-serif. Available in 9 weights.
 * Loaded: Regular (400), Medium (500), Semibold (600), Bold (700).
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: true,
  preload: true,
});

/**
 * Playfair Display — Display/heading font.
 * Elegant serif with high contrast. For restaurant branding, menu titles, headings.
 * Loaded: Regular (400), Medium (500), Semibold (600), Bold (700).
 */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: true,
  preload: true,
});

/**
 * Noto Naskh Arabic — Arabic font.
 * Classic Naskh style for Arabic menu items, descriptions, and UI.
 * Loaded: Regular (400), Medium (500), Semibold (600), Bold (700).
 */
export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-naskh-arabic",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: true,
  preload: false,
});
