import TopNavigationBar from "@/components/sections/top-navigation-bar";
import MainNavigation from "@/components/sections/main-navigation";
import HeroCarousel from "@/components/sections/hero-carousel";
import PatientJourneyCards from "@/components/sections/patient-journey-cards";
import Newsletter from "@/components/sections/lab-finder";
import ResultsAccess from "@/components/sections/results-access";
import JobOpenings from "@/components/sections/job-openings";
import ThreePillars from "@/components/sections/three-pillars";
import NewsArticles from "@/components/sections/news-articles";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <TopNavigationBar />
      <MainNavigation />
      <main>
        <HeroCarousel />
        <PatientJourneyCards />
        <Newsletter />
        <ResultsAccess />
        <JobOpenings />
        <ThreePillars />
        <NewsArticles />
      </main>
      <Footer />
    </>
  );
}