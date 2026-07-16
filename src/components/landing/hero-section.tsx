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
      <div className="hero-overlay-sweep" aria-hidden="true" />

      <div className="hero-content">
        <span className="hero-overline">Mediterranean Dining</span>
        <span className="hero-bar" aria-hidden="true" />
        <h1 className="hero-name">{name}</h1>
        <p className="hero-tagline">{tagline}</p>

        <div className="hero-cta hidden md:block">
          <Button variant="primary" size="lg">
            {ctaLabel}
          </Button>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
