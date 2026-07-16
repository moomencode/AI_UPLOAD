"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (el === null) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = el.parentElement?.offsetHeight ?? window.innerHeight;
          if (scrollY <= heroHeight) {
            el.style.transform = `translateY(${scrollY * 0.15}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={`hero ${className}`} aria-label={`Hero: ${name}`}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="hero-background" ref={bgRef}>
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />
      </div>

      <div className="hero-background-fallback" aria-hidden="true" />

      <div className="hero-overlay-dark" aria-hidden="true" />
      <div className="hero-overlay-warm" aria-hidden="true" />
      <div className="hero-overlay-vignette" aria-hidden="true" />

      <div className="hero-content">
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
