"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";

export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

export interface LandingHeaderProps {
  navItems?: NavItem[];
  whatsappNumber?: string;
  ctaLabel?: string;
  className?: string;
  scrollThreshold?: number;
}

export function LandingHeader({
  navItems = defaultNavItems,
  whatsappNumber = "+15551234567",
  ctaLabel = "Reserve a Table",
  className = "",
  scrollThreshold = 100,
}: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    const sectionIds = navItems
      .map((item) => item.sectionId)
      .filter((id): id is string => id !== undefined);

    if (sectionIds.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el !== null) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const headerClass = [
    "landing-header",
    isScrolled ? "landing-header-scrolled" : "landing-header-default",
    isMobileMenuOpen ? "nav-mobile-open" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isActive = (sectionId?: string): boolean => {
    if (sectionId === undefined) {
      return false;
    }
    return activeSection === sectionId;
  };

  const waNumber = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <header className={headerClass}>
      <div className="landing-header-inner">
        <Link href="/" className="landing-logo">
          <Image
            src="/images/logo.png"
            alt="Garcia Restaurant & Cafe"
            width={120}
            height={40}
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>

        <nav className="landing-nav-desktop" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "landing-nav-link",
                isActive(item.sectionId) ? "landing-nav-link-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="landing-header-actions">
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-whatsapp"
            aria-label="Contact us on WhatsApp"
          >
            <Icon name="whatsapp" size={20} />
          </a>

          <div className="landing-header-cta">
            <Button variant="primary" size="sm">
              {ctaLabel}
            </Button>
          </div>

          <button
            type="button"
            className="landing-hamburger"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="nav-mobile-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="nav-mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "nav-mobile-link",
                isActive(item.sectionId) ? "nav-mobile-link-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-mobile-actions">
          <Button variant="primary" size="lg" onClick={closeMobileMenu}>
            {ctaLabel}
          </Button>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-whatsapp"
            aria-label="Contact us on WhatsApp"
            onClick={closeMobileMenu}
          >
            <Icon name="whatsapp" size={24} />
          </a>
        </div>
      </div>
    </header>
  );
}

const defaultNavItems: NavItem[] = [
  { label: "Menu", href: "/menu" },
  { label: "Reservations", href: "#reservations", sectionId: "reservations" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];
