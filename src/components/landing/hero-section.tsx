import Image from "next/image";

import { Button } from "@/components/button";

export interface HeroSectionProps {
  backgroundImage?: string;
  name?: string;
  tagline?: string;
  ctaLabel?: string;
  className?: string;
}

const defaultImage = "/images/hero-bg.png";

export function HeroSection({
  backgroundImage = defaultImage,
  name = "Garcia Restaurant & Cafe",
  tagline = "Mediterranean soul. Modern heart.",
  ctaLabel = "Reserve a Table",
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`hero ${className}`} aria-label={`Hero: ${name}`}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="hero-background">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="hero-background-fallback" aria-hidden="true" />

      <div className="hero-overlay-base" aria-hidden="true" />
      <div className="hero-overlay-radial" aria-hidden="true" />
      <div className="hero-overlay-vignette" aria-hidden="true" />

      <div className="hero-content">
        <h1 className="hero-name">{name}</h1>
        <p className="hero-tagline">{tagline}</p>

        <div className="hero-cta hidden md:block">
          <Button variant="primary" size="lg">
            {ctaLabel}
          </Button>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <svg className="hero-scroll-icon" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <span className="hero-scroll-label">Scroll</span>
      </div>
    </section>
  );
}
