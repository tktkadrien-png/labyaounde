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
        <ScrollReveal animation="blurIn" duration={0.8}>
          <AboutUs />
        </ScrollReveal>
        <HeroCarousel />
        <ScrollReveal animation="scaleUp" delay={0.1}>
          <PatientJourneyCards />
        </ScrollReveal>
        <ScrollReveal animation="fadeLeft" delay={0.1}>
          <Newsletter />
        </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.1}>
          <ResultsAccess />
        </ScrollReveal>
        <ScrollReveal animation="fadeRight" delay={0.1}>
          <PartnersLogos />
        </ScrollReveal>
        <ScrollReveal animation="rotateIn" delay={0.1}>
          <NotreReferentiel />
        </ScrollReveal>
        <ScrollReveal animation="scaleUp" delay={0.15}>
          <JobOpenings />
        </ScrollReveal>
        <ScrollReveal animation="blurIn" delay={0.1}>
          <ThreePillars />
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={0.1}>
          <NewsArticles />
        </ScrollReveal>
      </main>
      <ScrollReveal animation="fadeUp" delay={0.1}>
        <Footer />
      </ScrollReveal>
      <FloatingReviewWidget />
      <FloatingContactButton />
    </>
  );
}
