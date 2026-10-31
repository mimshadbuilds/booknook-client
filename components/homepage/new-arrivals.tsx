import Link from "next/link";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { BookCard, type BookPreview } from "@/components/home/book-card";

const books: BookPreview[] = [
    { id: "klara-and-the-sun", title: "Klara and the Sun", author: "Kazuo Ishiguro", category: "Fiction", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=85", copies: 2, shelf: "Shelf 03-A" },
    { id: "an-immense-world", title: "An Immense World", author: "Ed Yong", category: "Science", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=85", copies: 1, shelf: "Shelf 12-C" },
    { id: "warmth-of-other-suns", title: "The Warmth of Other Suns", author: "Isabel Wilkerson", category: "History", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=85", copies: 3, shelf: "Shelf 08-B" },
    { id: "where-the-wild-things-are", title: "Where the Wild Things Are", author: "Maurice Sendak", category: "Kids", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=85", copies: 1, shelf: "Shelf 04-K" },
    { id: "braiding-sweetgrass", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", category: "Others", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=85", copies: 2, shelf: "Shelf 10-N" },
    { id: "educated", title: "Educated", author: "Tara Westover", category: "Others", image: "https://images.unsplash.com/photo-1516979187457-637e4f0d6e71?auto=format&fit=crop&w=800&q=85", copies: 2, shelf: "Shelf 07-B" },
];

const NewArrivalsPage = () => {
    return (
        <section className="px-4 py-14 md:px-6 md:py-20 lg:px-12">
            <div className="mx-auto max-w-[1320px]">
                <div className="mb-8 flex flex-col justify-between gap-5 md:mb-10 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#69736d]"><Sparkles className="size-4 text-[#c97959]" /> Fresh on shelves</p>
                        <h2 className="font-[Literata] text-3xl font-semibold tracking-tight text-[#252d29] md:text-4xl">New Arrivals</h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#525f58] md:text-base">The latest additions, freshly cataloged and ready to find their next reader.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#69736d]"><Clock3 className="size-4" /> Updated recently</div>
                </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 lg:gap-5">
                    {books.map((book) => <BookCard key={book.id} book={book} />)}
                    </div>
                <div className="mt-9 flex justify-center"><Link href="/books" className="inline-flex items-center rounded-lg border border-[#c9d6cc] bg-transparent px-5 py-2 text-sm font-medium text-[#234b3c] transition-colors hover:bg-[#dce8df]">See All Books <ArrowRight className="ml-2 size-4" /></Link></div>
            </div>
        </section>
    );
};

export default NewArrivalsPage;