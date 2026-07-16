import {
  AboutSection,
  Categories,
  FeaturedMenu,
  HeroSection,
  LandingHeader,
  PremiumFooter,
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
        <section id="reservations" style={{ height: "100vh" }} />
        <section id="contact" style={{ height: "100vh" }} />
      </main>
      <PremiumFooter />
    </>
  );
}
