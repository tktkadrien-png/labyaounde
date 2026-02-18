import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import HeroCarousel from "@/components/sections/hero-carousel";
import AboutUs from "@/components/sections/about-us";
import Newsletter from "@/components/sections/lab-finder";
import ResultsAccess from "@/components/sections/results-access";
import JobOpenings from "@/components/sections/job-openings";
import ThreePillars from "@/components/sections/three-pillars";
import NewsArticles from "@/components/sections/news-articles";
import NotreReferentiel from "@/components/sections/notre-referentiel";
import PatientJourneyCards from "@/components/sections/patient-journey-cards";
import PartnersLogos from "@/components/sections/partners-logos";
import Footer from "@/components/sections/footer";
import FloatingReviewWidget from "@/components/sections/floating-review-widget";
import FloatingContactButton from "@/components/sections/floating-contact-button";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function HomePage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main>
        <ScrollReveal direction="up" duration={0.7}>
          <AboutUs />
        </ScrollReveal>
        <HeroCarousel />
        <ScrollReveal direction="up" delay={0.1}>
          <PatientJourneyCards />
        </ScrollReveal>
        <ScrollReveal direction="left" delay={0.1}>
          <Newsletter />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <ResultsAccess />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.1}>
          <PartnersLogos />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <NotreReferentiel />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.15}>
          <JobOpenings />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <ThreePillars />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <NewsArticles />
        </ScrollReveal>
      </main>
      <ScrollReveal direction="up" delay={0.1}>
        <Footer />
      </ScrollReveal>
      <FloatingReviewWidget />
      <FloatingContactButton />
    </>
  );
}
