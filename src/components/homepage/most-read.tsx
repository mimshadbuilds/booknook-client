import Link from "next/link";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";
import { BooksCard, type IBooks } from "../books/BooksCard";

const favorites: IBooks[] = [
    { id: "tomorrow-and-tomorrow", title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", category: "Fiction", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=85", copies: 2, borrows: 48 },
    { id: "braiding-sweetgrass", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", category: "Nature", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=85", copies: 4, borrows: 42 },
    { id: "klara-sun-favorite", title: "Klara and the Sun", author: "Kazuo Ishiguro", category: "Fiction", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=85", copies: 2, borrows: 39 },
];
const MostReadPage = () => {
    return (
        <section className="px-4 py-14 md:px-6 md:py-20 lg:px-12">
            <div className="mx-auto max-w-[1320px]">
                <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div><p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#69736d]"><TrendingUp className="size-4 text-[#c97959]" /> Community favorites · Circulation archives</p><h2 className="font-[Literata] text-3xl font-semibold tracking-tight text-[#252d29] md:text-4xl">Most Read Books</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#525f58] md:text-base">The volumes passing most frequently from reader to reader around the neighborhood.</p></div>
                <span className="inline-flex items-center gap-2 text-xs text-[#69736d]"><Flame className="size-4 text-[#c97959]" /> Community favorites</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((book, index) => <div key={book.id} className="relative"><BooksCard book={book} rank={index + 1} /><div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#fbf9f3]/95 px-3 py-1.5 text-xs font-bold text-[#8f4b31] shadow-sm"><Flame size={13} /> {book.borrows} borrows</div></div>)}
                </div>
                <div className="mt-8 text-center"><Link href="/books" className="inline-flex items-center rounded-lg border border-[#c9d6cc] px-4 py-2 text-sm font-medium text-[#234b3c] transition-colors hover:bg-[#dce8df]">Explore the collection <ArrowRight className="ml-2 size-4" /></Link></div>
            </div>
        </section>
    );
};

export default MostReadPage;