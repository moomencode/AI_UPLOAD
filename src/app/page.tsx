import dynamic from "next/dynamic";

import { HeroSection, LandingHeader } from "@/components/landing";

const AboutSection = dynamic(() =>
  import("@/components/landing/about-section").then((m) => ({ default: m.AboutSection })),
);
const Categories = dynamic(() =>
  import("@/components/landing/categories").then((m) => ({ default: m.Categories })),
);
const FeaturedMenu = dynamic(() =>
  import("@/components/landing/featured-menu").then((m) => ({ default: m.FeaturedMenu })),
);
const SocialProof = dynamic(() =>
  import("@/components/landing/social-proof").then((m) => ({ default: m.SocialProof })),
);
const GallerySection = dynamic(() =>
  import("@/components/landing/gallery-section").then((m) => ({ default: m.GallerySection })),
);
const ReservationSection = dynamic(() =>
  import("@/components/landing/reservation-section").then((m) => ({
    default: m.ReservationSection,
  })),
);
const PremiumFooter = dynamic(() =>
  import("@/components/landing/premium-footer").then((m) => ({ default: m.PremiumFooter })),
);

function SectionDivider() {
  return (
    <div className="section-separator" aria-hidden="true">
      <span className="section-separator-diamond" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <main id="main-content">
        <AboutSection />
        <SectionDivider />
        <Categories />
        <SectionDivider />
        <FeaturedMenu />
        <SectionDivider />
        <SocialProof />
        <SectionDivider />
        <GallerySection />
        <SectionDivider />
        <ReservationSection />
        <section id="contact" style={{ height: "100vh" }} />
      </main>
      <PremiumFooter />
    </>
  );
}
