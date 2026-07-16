"use client";

import { useEffect, useRef, useState } from "react";

export interface ReviewQuote {
  text: string;
  author: string;
  publication: string;
}

export interface SocialProofProps {
  rating?: number;
  reviewCount?: number;
  quotes?: ReviewQuote[];
  pressItems?: string[];
  className?: string;
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const defaultQuotes: ReviewQuote[] = [
  {
    text: "An extraordinary dining experience where every dish tells a story. The truffle risotto alone is worth the trip.",
    author: "Amanda Chen",
    publication: "The Gourmand Times",
  },
  {
    text: "Garcia manages that rare alchemy of impeccable service, stunning ambiance, and food that genuinely surprises.",
    author: "Marcus Webb",
    publication: "Michelin Guide Inspectors",
  },
];

const defaultPress: string[] = [
  "The New York Times",
  "Michelin Guide",
  "TripAdvisor Travelers' Choice",
];

export function SocialProof({
  rating = 4.8,
  reviewCount = 247,
  quotes = defaultQuotes,
  pressItems = defaultPress,
  className = "",
}: SocialProofProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

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
      className={`social section ${className}`}
      aria-labelledby="social-heading"
    >
      <div className="content-wrapper">
        <header className="social-header">
          <span className="social-overline">Guest Reviews</span>
          <h2 id="social-heading" className="heading-1">
            What People Are Saying
          </h2>
        </header>

        <div className="social-grid">
          <div className={`social-rating ${hasEntered ? "social-enter-active" : "social-enter"}`}>
            <div>
              <div className="social-stars-row">
                <span className="social-score" aria-hidden="true">
                  {rating}
                </span>
                <span className="social-stars" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} />
                  ))}
                </span>
              </div>
              <p className="social-review-count">
                Based on <strong>{reviewCount.toLocaleString()}</strong> verified reviews
              </p>
            </div>

            <div className="social-press">
              <span className="social-press-label">As Featured In</span>
              {pressItems.map((item) => (
                <span key={item} className="social-press-item">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`social-quotes ${hasEntered ? "social-enter-active" : "social-enter"}`}
            style={{ animationDelay: hasEntered ? "150ms" : "0ms" }}
          >
            {quotes.map((quote, index) => (
              <blockquote
                key={`${quote.author}-${quote.publication}`}
                className="social-quote"
                style={{ animationDelay: hasEntered ? `${index * 100}ms` : "0ms" }}
              >
                <p className="social-quote-text">&ldquo;{quote.text}&rdquo;</p>
                <cite className="social-quote-author">
                  <strong>{quote.author}</strong>
                  &nbsp;&mdash;&nbsp;{quote.publication}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
