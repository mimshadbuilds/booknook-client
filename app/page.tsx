import CategoryPage from "@/components/homepage/browse-category";
import Banner from "@/components/homepage/hero-banner";
import NewArrivalsPage from "@/components/homepage/new-arrivals";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <NewArrivalsPage />
      <CategoryPage />
    </div>
  );
}
