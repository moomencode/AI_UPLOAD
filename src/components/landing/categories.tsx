"use client";

import { useEffect, useRef, useState } from "react";

export interface CategoryItem {
  id: string;
  icon: "starters" | "mains" | "desserts" | "beverages" | "wine" | "specials";
  name: string;
  description: string;
}

export interface CategoriesProps {
  title?: string;
  subtitle?: string;
  categories?: CategoryItem[];
  className?: string;
}

function categoryIcon(id: CategoryItem["icon"]): string {
  switch (id) {
    case "starters":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 5 6 5 10c0 3 2 5.5 4 7l1 4h4l1-4c2-1.5 4-4 4-7 0-4-3-8-7-8z"/><path d="M9 10h6"/><path d="M10 6l1 3"/><path d="M14 6l-1 3"/></svg>`;
    case "mains":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3L5 21"/><path d="M16 3l3 18"/><path d="M3 12h18"/><path d="M4 17h16"/><path d="M6 7c3-2 6-2 12 0"/></svg>`;
    case "desserts":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 3.5 2 6.5 4 8h6c2-1.5 4-4.5 4-8a7 7 0 0 0-7-7z"/><path d="M6 16c2 1.5 4 2 6 2s4-.5 6-2"/><path d="M8 22h8"/></svg>`;
    case "beverages":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"/><path d="M5 2v10a5 5 0 0 0 10 0V2"/><path d="M3 2h14"/><path d="M8 22h4"/><path d="M10 12v10"/></svg>`;
    case "wine":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v9a4 4 0 0 0 8 0V2"/><path d="M6 2h12"/><path d="M10 14v6"/><path d="M6 20h8"/><path d="M14 20a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/></svg>`;
    case "specials":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
}

const defaultCategories: CategoryItem[] = [
  {
    id: "starters",
    icon: "starters",
    name: "Starters",
    description: "Light bites and appetizers to begin your meal.",
  },
  {
    id: "mains",
    icon: "mains",
    name: "Mains",
    description: "Signature dishes crafted by our chef de cuisine.",
  },
  {
    id: "desserts",
    icon: "desserts",
    name: "Desserts",
    description: "Sweet endings and artisanal pastries made daily.",
  },
  {
    id: "beverages",
    icon: "beverages",
    name: "Beverages",
    description: "Specialty coffee, tea, and handcrafted refreshments.",
  },
  {
    id: "wine",
    icon: "wine",
    name: "Wine List",
    description: "Curated selections from renowned vineyards worldwide.",
  },
  {
    id: "specials",
    icon: "specials",
    name: "Specials",
    description: "Chef's daily creations and seasonal offerings.",
  },
];

export function Categories({
  title = "Explore Our Menu",
  subtitle = "A journey through flavors, crafted with passion.",
  categories = defaultCategories,
  className = "",
}: CategoriesProps) {
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
      className={`categories section ${className}`}
      aria-labelledby="categories-heading"
    >
      <div className="content-wrapper">
        <header className="categories-header">
          <span className="categories-overline">Menu</span>
          <h2 id="categories-heading" className="heading-1">
            {title}
          </h2>
          <p
            className="body-base"
            style={{ color: "var(--garcia-text-secondary)", marginTop: "var(--garcia-spacing-3)" }}
          >
            {subtitle}
          </p>
        </header>

        <div className="categories-grid" role="list">
          {categories.map((item, index) => (
            <article
              key={item.id}
              className={`categories-card ${hasEntered ? "categories-card-enter-active" : "categories-card-enter"}`}
              role="listitem"
              aria-label={item.name}
              style={{ animationDelay: hasEntered ? `${index * 80}ms` : "0ms" }}
            >
              <div className="categories-icon" aria-hidden="true">
                {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
                <span dangerouslySetInnerHTML={{ __html: categoryIcon(item.icon) }} />
              </div>
              <div className="categories-content">
                <h3 className="categories-card-name">{item.name}</h3>
                <p className="categories-card-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
