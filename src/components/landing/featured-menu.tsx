"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";

export type DishBadge = "chefsPick" | "popular" | "vegetarian" | "spicy";

export interface FeaturedDish {
  id: string;
  image: string;
  imageAlt: string;
  name: string;
  description: string;
  price: number;
  badges: DishBadge[];
}

export interface FeaturedMenuProps {
  title?: string;
  subtitle?: string;
  dishes?: FeaturedDish[];
  whatsappNumber?: string;
  className?: string;
}

const defaultDishes: FeaturedDish[] = [
  {
    id: "grilled-octopus",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80&fit=crop&auto=format",
    imageAlt: "Grilled octopus with lemon dressing and fresh herbs on a wooden board",
    name: "Grilled Octopus",
    description: "Tender charred octopus with lemon dressing, kalamata olives, and garden herbs.",
    price: 32,
    badges: ["chefsPick", "popular"],
  },
  {
    id: "truffle-risotto",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80&fit=crop&auto=format",
    imageAlt: "Creamy risotto with wild mushrooms and grated parmesan",
    name: "Truffle Risotto",
    description: "Creamy arborio rice with wild mushrooms, aged parmesan, and black truffle oil.",
    price: 28,
    badges: ["chefsPick", "vegetarian"],
  },
  {
    id: "lamb-chops",
    image:
      "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=600&q=80&fit=crop&auto=format",
    imageAlt: "Herb-crusted lamb chops with roasted vegetables",
    name: "Herb-Crusted Lamb Chops",
    description:
      "Australian lamb with rosemary crust, mint glaze, and seasonal roasted vegetables.",
    price: 45,
    badges: ["popular"],
  },
  {
    id: "burrata-salad",
    image:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80&fit=crop&auto=format",
    imageAlt: "Burrata cheese with heirloom tomatoes and fresh basil",
    name: "Burrata & Heirloom Salad",
    description: "Creamy burrata with vine-ripened heirloom tomatoes, basil, and aged balsamic.",
    price: 24,
    badges: ["vegetarian"],
  },
];

function badgeLabel(badge: DishBadge): string {
  const labels: Record<DishBadge, string> = {
    chefsPick: "Chef's Pick",
    popular: "Bestseller",
    vegetarian: "Vegetarian",
    spicy: "Spicy",
  };
  return labels[badge];
}

function badgeClass(badge: DishBadge): string {
  const classes: Record<DishBadge, string> = {
    chefsPick: "featured-badge-chef",
    popular: "featured-badge-popular",
    vegetarian: "",
    spicy: "",
  };
  return classes[badge];
}

const imageBadgePriority: DishBadge[] = ["chefsPick", "popular"];

export function FeaturedMenu({
  title = "Featured Dishes",
  subtitle = "A carefully curated selection from our kitchen.",
  dishes = defaultDishes,
  whatsappNumber = "+15551234567",
  className = "",
}: FeaturedMenuProps) {
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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`featured section ${className}`}
      aria-labelledby="featured-heading"
    >
      <div className="content-wrapper">
        <header className="featured-header">
          <span className="featured-overline">From Our Kitchen</span>
          <h2 id="featured-heading" className="heading-1">
            {title}
          </h2>
          <p
            className="body-base"
            style={{ color: "var(--garcia-text-secondary)", marginTop: "var(--garcia-spacing-3)" }}
          >
            {subtitle}
          </p>
        </header>

        <div className="featured-grid" role="list">
          {dishes.map((dish, index) => {
            const imageBadge = imageBadgePriority.find((b) => dish.badges.includes(b));
            const inlineBadges = dish.badges.filter((b) => b !== imageBadge);
            const waMessage = encodeURIComponent(
              `Hi! I'd like to order the ${dish.name} ($${dish.price}).`,
            );

            return (
              <article
                key={dish.id}
                className={`featured-card ${hasEntered ? "featured-card-enter-active" : "featured-card-enter"}`}
                role="listitem"
                aria-label={`${dish.name} — ${dish.price} dollars`}
                style={{ animationDelay: hasEntered ? `${index * 100}ms` : "0ms" }}
              >
                <div className="featured-card-image">
                  <Image
                    src={dish.image}
                    alt={dish.imageAlt}
                    fill
                    sizes="(max-width: 48rem) 100vw, (max-width: 80rem) 50vw, 33vw"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />

                  {imageBadge !== undefined ? (
                    <span className={`featured-badge-image ${badgeClass(imageBadge)}`}>
                      {badgeLabel(imageBadge)}
                    </span>
                  ) : null}
                </div>

                <div className="featured-card-body">
                  <h3 className="featured-card-name">{dish.name}</h3>
                  <p className="featured-card-desc">{dish.description}</p>

                  {inlineBadges.length > 0 ? (
                    <div className="featured-card-badges">
                      {inlineBadges.map((badge) => (
                        <span key={badge} className={`featured-badge-inline ${badgeClass(badge)}`}>
                          {badgeLabel(badge)}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <span className="featured-card-price">${dish.price}</span>

                  <hr className="featured-card-divider" />

                  <a
                    href={`https://wa.me/${waNumber}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-card-whatsapp"
                    aria-label={`Order ${dish.name} via WhatsApp`}
                  >
                    <Icon name="whatsapp" size={16} />
                    Order via WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="featured-footer">
          <Link href="/menu">
            <Button variant="secondary" size="lg">
              View Full Menu
              <Icon name="chevronDown" size={16} />
            </Button>
          </Link>
        </footer>
      </div>
    </section>
  );
}
