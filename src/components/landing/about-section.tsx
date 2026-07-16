"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/icon";

export interface AboutSectionProps {
  headline?: string;
  story?: string;
  features?: { title: string; description: string }[];
  whatsappNumber?: string;
  className?: string;
}

const defaultFeatures = [
  {
    title: "Farm-to-Table Freshness",
    description: "Seasonal ingredients sourced from local farms and purveyors.",
  },
  {
    title: "Award-Winning Chefs",
    description: "Culinary excellence recognized by international guides.",
  },
  {
    title: "Intimate Atmosphere",
    description: "A warm, inviting space designed for memorable moments.",
  },
  {
    title: "Curated Wine Cellar",
    description: "An exclusive selection of old-world and new-world vintages.",
  },
];

export function AboutSection({
  headline = "A Legacy of Flavor",
  story = "Garcia Restaurant & Cafe began as a family dream — a place where Mediterranean heritage meets contemporary elegance. Every dish reflects generations of tradition refined through modern technique, from our hand-rolled pasta to our wood-fired specialties.",
  features = defaultFeatures,
  whatsappNumber = "+15551234567",
  className = "",
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const waNumber = whatsappNumber.replace(/[^0-9]/g, "");

  useEffect(() => {
    const el = sectionRef.current;
    if (el === null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting === true) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about section ${className}`}
      aria-labelledby="about-heading"
    >
      <div className="content-wrapper">
        <div className="about-grid">
          <div
            className={`about-image-wrapper ${hasEntered ? "about-image-clip-active" : "about-image-clip"}`}
          >
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85&fit=crop&auto=format"
              alt="Warm, candlelit restaurant interior with rich wood tones and ambient glow"
              fill
              sizes="(max-width: 48rem) 100vw, 50vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          <div
            className={`about-content ${hasEntered ? "about-enter-active" : "about-enter"}`}
            style={{ animationDelay: hasEntered ? "150ms" : "0ms" }}
          >
            <h2 id="about-heading" className="about-heading">
              {headline}
            </h2>
            <p className="about-story">{story}</p>

            <ul className="about-features" role="list">
              {features.map((feature) => (
                <li key={feature.title} className="about-feature" role="listitem">
                  <span className="about-feature-icon" aria-hidden="true">
                    <Icon name="checkCompact" size={16} />
                  </span>
                  <div className="about-feature-text">
                    <span className="about-feature-title">{feature.title}</span>
                    <span className="about-feature-desc">{feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>

            <hr className="about-divider" />

            <div className="about-cta">
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hi! I'd like to make a reservation at Garcia.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                aria-label="Reserve a table via WhatsApp"
              >
                <Icon name="whatsapp" size={20} />
                Reserve Your Table
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
