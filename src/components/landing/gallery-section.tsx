"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ImagePreview } from "@/components/modal";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  aspectRatio: string;
  caption?: string;
}

export interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  items?: GalleryItem[];
  className?: string;
}

const defaultItems: GalleryItem[] = [
  {
    id: "interior-1",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85&fit=crop&auto=format",
    alt: "Elegant restaurant interior with warm ambient lighting",
    aspectRatio: "4 / 3",
    caption: "The Main Dining Room",
  },
  {
    id: "octopus",
    src: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=1200&q=85&fit=crop&auto=format",
    alt: "Grilled octopus with lemon dressing and fresh herbs",
    aspectRatio: "3 / 4",
    caption: "Grilled Octopus",
  },
  {
    id: "candlelit",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85&fit=crop&auto=format",
    alt: "Warm candlelit dinner table with wine glasses",
    aspectRatio: "3 / 2",
    caption: "An Evening at Garcia",
  },
  {
    id: "risotto",
    src: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&q=85&fit=crop&auto=format",
    alt: "Creamy truffle risotto with wild mushrooms",
    aspectRatio: "4 / 3",
    caption: "Truffle Risotto",
  },
  {
    id: "lamb",
    src: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=1200&q=85&fit=crop&auto=format",
    alt: "Herb-crusted lamb chops with roasted vegetables",
    aspectRatio: "3 / 4",
    caption: "Herb-Crusted Lamb Chops",
  },
  {
    id: "burrata",
    src: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=1200&q=85&fit=crop&auto=format",
    alt: "Burrata cheese with heirloom tomatoes and fresh basil",
    aspectRatio: "4 / 3",
    caption: "Burrata & Heirloom Salad",
  },
  {
    id: "cocktails",
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=85&fit=crop&auto=format",
    alt: "Artisanal cocktails at the bar",
    aspectRatio: "9 / 16",
    caption: "Handcrafted Cocktails",
  },
  {
    id: "interior-2",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&fit=crop&auto=format",
    alt: "Candlelit fine dining table setting",
    aspectRatio: "1 / 1",
    caption: "Intimate Gatherings",
  },
];

export function GallerySection({
  title = "Moments at Garcia",
  subtitle = "A visual journey through our restaurant and cuisine.",
  items = defaultItems,
  className = "",
}: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

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

  const openLightbox = useCallback((item: GalleryItem) => {
    setSelectedImage(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`gallery section ${className}`}
      aria-labelledby="gallery-heading"
    >
      <div className="content-wrapper">
        <header className="gallery-header">
          <h2 id="gallery-heading" className="heading-1">
            {title}
          </h2>
          <p
            className="body-base"
            style={{ color: "var(--garcia-text-secondary)", marginTop: "var(--garcia-spacing-3)" }}
          >
            {subtitle}
          </p>
        </header>

        <div className="gallery-grid" role="list">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`gallery-item ${hasEntered ? "gallery-item-enter-active" : "gallery-item-enter"}`}
              role="listitem"
              aria-label={`View ${item.caption ?? item.alt}`}
              style={{
                aspectRatio: item.aspectRatio,
                animationDelay: hasEntered ? `${index * 80}ms` : "0ms",
              }}
              onClick={() => {
                openLightbox(item);
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 48rem) 50vw, (max-width: 80rem) 33vw, 25vw"
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
              {item.caption !== undefined ? (
                <div className="gallery-item-overlay">
                  <span className="gallery-item-caption">{item.caption}</span>
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {selectedImage !== null ? (
        <ImagePreview
          isOpen={true}
          onClose={closeLightbox}
          src={selectedImage.src}
          alt={selectedImage.alt}
          caption={<span>{selectedImage.caption ?? selectedImage.alt}</span>}
        />
      ) : null}
    </section>
  );
}
