import Link from "next/link";
import { ArrowUpRight, BookOpen, FlaskConical, History, Palette, ToyBrick } from "lucide-react";

const categories = [
    { name: "Fiction", count: "142 titles", description: "Literary fiction, contemporary tales, mysteries and worlds to get lost in.", icon: BookOpen, tone: "bg-[#e8ede9] text-[#234b3c]" },
    { name: "Science", count: "68 titles", description: "Ecology, astronomy, physics and natural history explorations.", icon: FlaskConical, tone: "bg-[#e2eaf1] text-[#2c5068]" },
    { name: "History", count: "84 titles", description: "Biographies, social memory, archival letters and global accounts.", icon: History, tone: "bg-[#f2ece4] text-[#694e34]" },
    { name: "Kids", count: "95 titles", description: "Picture books, primers, young readers and fairy tales.", icon: ToyBrick, tone: "bg-[#f8ede7] text-[#a45535]" },
    { name: "Others", count: "53 titles", description: "Nature, art, practical guides and unexpected discoveries.", icon: Palette, tone: "bg-[#efece6] text-[#525f58]" },
];

const CategoryPage = () => {
    return (
        <section className="bg-[#f0eee8] px-4 py-14 md:px-6 md:py-20 lg:px-12">
            <div className="mx-auto max-w-[1320px]">
                <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#69736d]">Catalog structure</p><h2 className="font-[Literata] text-3xl font-semibold tracking-tight text-[#252d29] md:text-4xl">Browse by Category</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#525f58] md:text-base">Find your way through carefully sorted shelves, curated by topic, genre, and age group.</p></div>
                    <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-[#234b3c] hover:underline">View all books <ArrowUpRight size={17} />
                    </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {categories.map((category, index) => {
                    const Icon = category.icon;
                    return <Link key={category.name} href={`/books?category=${encodeURIComponent(category.name)}`} className={`group relative flex min-h-[240px] flex-col rounded-2xl border border-[#e5e0d8] bg-[#fbf9f3] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md ${index === 0 ? "lg:-translate-y-2 lg:min-h-[260px]" : ""}`}>
                        <div className={`mb-8 grid size-12 place-items-center rounded-xl ${category.tone}`}>
                            <Icon size={23} strokeWidth={1.7} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#69736d]">{category.count} shelved</span>
                        <h3 className="mt-2 font-[Literata] text-xl font-semibold text-[#252d29]">{category.name}</h3>
                        <p className="mt-2 text-sm leading-5 text-[#525f58]">{category.description}</p>
                        <ArrowUpRight className="absolute right-5 top-5 size-5 text-[#69736d] transition group-hover:text-[#234b3c]" />
                    </Link>;
                })}
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;