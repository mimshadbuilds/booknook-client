import { Award, ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { BooksCard, type IBooks } from "@/components/shared/BooksCard";

export function MostRead({ books }: { books: IBooks[] }) {
    const mostReadBooks = [...books]
        .sort((a, b) => (Number(b.borrows) || 0) - (Number(a.borrows) || 0))
        .slice(0, 4);

    return (
        <section id="most-read" className="w-full bg-[#fbf9f3] px-4 py-16 dark:bg-[#17251f] md:px-6 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-[1320px]">
                <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#c1c8c3]/60 pb-6 lg:flex-row lg:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#234b3c] dark:text-[#a5d0bc]">
                            <Flame className="size-4" />
                            Community Favorites / Circulation Archives
                        </div>
                        <h2 className="font-heading text-3xl font-medium tracking-tight text-[#234b3c] dark:text-[#dce8df] md:text-4xl">Most Read Books</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#525f58] dark:text-[#b0beb5]">The volumes passing most frequently from reader to reader across our neighborhood kiosks.</p>
                    </div>
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-[#c1c8c3]/60 bg-[#f5f3ed] px-3 py-2 text-[11px] font-semibold text-[#525f58] dark:border-[#34443b] dark:bg-[#26382e] dark:text-[#c4cec7]">
                        <Award className="size-4 text-[#8e4b32] dark:text-[#e5a184]" />
                        Ranked by community borrows
                    </span>
                </div>
                {mostReadBooks.length ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {mostReadBooks.map((book, index) => <BooksCard key={book.id} book={book} rank={index + 1} />)}
                    </div>
                ) : (
                    <p className="rounded-xl border border-dashed border-[#c1c8c3] px-5 py-10 text-center text-sm text-[#68736c] dark:border-[#48594e] dark:text-[#b0beb5]">No reading activity is available yet.</p>
                )}
                <div className="mt-8 flex justify-center">
                    <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-[#234b3c] hover:underline dark:text-[#dce8df]">Explore the collection <ArrowRight className="size-4" /></Link>
                </div>
            </div>
        </section>
    );
}
