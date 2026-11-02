import Banner from "@/components/homepage/hero-banner";
import NewArrivalsPage from "../components/homepage/new-arrivals";
import { HowItWorksPage } from "../components/homepage/how-it-works";
import CategoryPage from "../components/homepage/browse-category";
import MostReadPage from "../components/homepage/most-read";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fbf9f3] text-[#252d29]">
      <Banner />
      <NewArrivalsPage />
      <CategoryPage />
      <MostReadPage />
      <HowItWorksPage />
    </div>
  );
}
