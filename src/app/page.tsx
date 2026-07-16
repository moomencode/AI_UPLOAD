import {
  AboutSection,
  Categories,
  FeaturedMenu,
  GallerySection,
  HeroSection,
  LandingHeader,
  PremiumFooter,
  ReservationSection,
  SocialProof,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <main id="main-content">
        <AboutSection />
        <Categories />
        <FeaturedMenu />
        <SocialProof />
        <GallerySection />
        <ReservationSection />
        <section id="contact" style={{ height: "100vh" }} />
      </main>
      <PremiumFooter />
    </>
  );
}
