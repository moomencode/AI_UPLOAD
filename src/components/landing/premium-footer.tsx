"use client";

import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/icon";

export interface PremiumFooterProps {
  whatsappNumber?: string;
  className?: string;
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MapPinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function PremiumFooter({
  whatsappNumber = "+15551234567",
  className = "",
}: PremiumFooterProps) {
  const waNumber = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div className="content-wrapper">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-brand-logo">
              <Image
                src="/images/logo.png"
                alt="Garcia Restaurant & Cafe"
                width={120}
                height={40}
                priority
                style={{
                  height: "2rem",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </span>
            <span className="footer-brand-line" aria-hidden="true" />
            <p className="footer-desc">
              An intimate dining experience where Mediterranean tradition meets modern elegance.
              Every dish is crafted with passion, using the finest seasonal ingredients.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Follow us on Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="footer-social-link" aria-label="Follow us on Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className="footer-social-link" aria-label="Follow us on X">
                <XIcon />
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Contact us on WhatsApp"
              >
                <Icon name="whatsapp" size={18} />
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-links-heading">
            <h3 id="footer-links-heading" className="footer-heading">
              Quick Links
            </h3>
            <ul className="footer-links">
              <li>
                <Link href="/menu">Our Menu</Link>
              </li>
              <li>
                <a href="#reservations">Reservations</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="footer-heading">Contact</h3>
            <div className="footer-contact-item">
              <span className="footer-contact-icon" aria-hidden="true">
                <MapPinIcon />
              </span>
              <span>
                123 Gourmet Street
                <br />
                New York, NY 10012
              </span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon" aria-hidden="true">
                <PhoneIcon />
              </span>
              <a href={`tel:+15551234567`} style={{ color: "inherit", textDecoration: "none" }}>
                +1 (555) 123-4567
              </a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon" aria-hidden="true">
                <MailIcon />
              </span>
              <a
                href="mailto:hello@garcia.com"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                hello@garcia.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Opening Hours</h3>
            <div className="footer-hours-item">
              <span className="footer-hours-day">Mon — Thu</span>
              <span className="footer-hours-time">11:00 — 22:00</span>
            </div>
            <div className="footer-hours-item">
              <span className="footer-hours-day">Fri — Sat</span>
              <span className="footer-hours-time">11:00 — 23:00</span>
            </div>
            <div className="footer-hours-item">
              <span className="footer-hours-day">Sunday</span>
              <span className="footer-hours-time">10:00 — 21:00</span>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} Garcia Restaurant &amp; Cafe. All rights reserved.
          </span>
          <nav className="footer-bottom-links" aria-label="Legal links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
