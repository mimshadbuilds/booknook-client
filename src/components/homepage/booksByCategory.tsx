import Link from "next/link";
import { ArrowRight, BookOpen, BookText, FlaskConical, History, Baby } from "lucide-react";
import type { IBooks } from "@/components/shared/BooksCard";

const categories = [
    { name: "Fiction", description: "Novels, short stories & literary fiction.", icon: BookOpen, tint: "bg-[#fbf6f3] border-[#ebd7ce] border-l-[#c97959] text-[#8e3f22] dark:bg-[#2b2422] dark:border-[#4b3a34] dark:border-l-[#d08a6c] dark:text-[#efc3af]", iconBg: "bg-[#faece4] border-[#e8cebf] dark:bg-[#3a2d28] dark:border-[#5a453d]" },
    { name: "Science", description: "Nature, technology & the world around us.", icon: FlaskConical, tint: "bg-[#f2f7fa] border-[#d5e3ec] border-l-[#64869d] text-[#315c75] dark:bg-[#212b33] dark:border-[#3a4a56] dark:border-l-[#7fa6c0] dark:text-[#b3d0e2]", iconBg: "bg-[#e4eff5] border-[#c8d8e4] dark:bg-[#2a3740] dark:border-[#42545f]" },
    { name: "History", description: "People, places & moments that shaped us.", icon: History, tint: "bg-[#f7f5ef] border-[#e5ddcf] border-l-[#a88a5e] text-[#694e34] dark:bg-[#2a2822] dark:border-[#4a4436] dark:border-l-[#c2a06f] dark:text-[#e0c9a4]", iconBg: "bg-[#eee8dc] border-[#e3d7c9] dark:bg-[#36322a] dark:border-[#4f4839]" },
    { name: "Kids", description: "Picture books & adventures for young readers.", icon: Baby, tint: "bg-[#fbf3f5] border-[#efd9df] border-l-[#bd788a] text-[#8c465b] dark:bg-[#2b2328] dark:border-[#4d3b43] dark:border-l-[#cd93a3] dark:text-[#eec2ce]", iconBg: "bg-[#f7e8ed] border-[#ebcbd5] dark:bg-[#372b31] dark:border-[#54404a]" },
    { name: "Others", description: "Poetry, art, essays & curious collections.", icon: BookText, tint: "bg-[#f4f2f8] border-[#ded9e9] border-l-[#81769d] text-[#49435b] dark:bg-[#25232f] dark:border-[#413d50] dark:border-l-[#a39ac4] dark:text-[#cfc8e4]", iconBg: "bg-[#ebe8f2] border-[#d9d3e5] dark:bg-[#2f2c3c] dark:border-[#494460]" },
];

export function CategoryPage({ books = [] }: { books?: IBooks[] }) {
    return (
        <section id="categories" className="w-full border-y border-[#c1c8c3]/50 bg-[#f5f3ed] px-4 py-16 dark:border-[#34443b] dark:bg-[#202f27] md:px-6 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-[1320px]">
                <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div>
                        <span className="mb-1 block text-xs font-bold uppercase tracking-[0.16em] text-[#234b3c] dark:text-[#a5d0bc]">Catalog Structure</span>
                        <h2 className="font-heading text-3xl font-medium tracking-tight text-[#234b3c] dark:text-[#dce8df] md:text-4xl">Browse by Category</h2>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#525f58] dark:text-[#b0beb5]">Navigate through carefully sorted shelves curated by topic, genre, and age group.</p>
                    </div>
                    <Link href="/books" className="inline-flex items-center gap-2 pb-1 text-sm font-semibold text-[#234b3c] hover:underline dark:text-[#dce8df]">
                        View All Books <ArrowRight className="size-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const count = books.filter((book) => book.category?.toLowerCase() === category.name.toLowerCase()).length;
                        return (
                            <Link key={category.name} href={`/books?category=${encodeURIComponent(category.name)}`} className={`group relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl border border-l-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${category.tint}`}>
                                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-white/40 to-transparent dark:from-white/[0.05]" />
                                <div className="relative z-10 flex items-start justify-between">
                                    <div className={`flex size-12 items-center justify-center rounded-xl border ${category.iconBg}`}>
                                        <Icon className="size-6" />
                                    </div>
                                    <ArrowRight className="size-5 opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="font-heading text-xl font-semibold">{category.name}</h3>
                                    <p className="mt-1 text-xs font-bold opacity-80">{count} {count === 1 ? "title" : "titles"} shelved</p>
                                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#525f58] dark:text-[#b0beb5]">{category.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
