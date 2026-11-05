import { NewArrivals } from "@/components/homepage/newarrivals";
import { CategoryPage } from "@/components/homepage/booksByCategory";
import { MostRead } from "@/components/homepage/mostRead";
import { Newsletter } from "@/components/homepage/newsletter";
import { getHomeBooks } from "@/lib/books-api";
import { HeroSlider } from "@/components/homepage/heroSlider";
import { HowItWorks } from "@/components/homepage/howItWorks";
import { CommunityPage } from "@/components/homepage/communityBanner";

export default async function HomePage() {
    const books = await getHomeBooks();

    return (
        <div className="min-h-screen bg-[#fbf9f3] text-[#1b1c18] dark:bg-[#17251f] dark:text-[#f3f1eb]">
            <HeroSlider />
            <NewArrivals books={books} />
            <CategoryPage books={books} />
            <MostRead books={books} />
            <HowItWorks />
            <CommunityPage />
            <Newsletter />
        </div>
    );
}
