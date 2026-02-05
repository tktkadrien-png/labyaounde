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
import Footer from "@/components/sections/footer";
import FloatingReviewWidget from "@/components/sections/floating-review-widget";

export default function HomePage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main>
        <AboutUs />
        <HeroCarousel />
        <Newsletter />
        <ResultsAccess />
        <NotreReferentiel />
        <JobOpenings />
        <ThreePillars />
        <NewsArticles />
      </main>
      <Footer />
      <FloatingReviewWidget />
    </>
  );
}
