"use client";

import Link from "next/link";
import { ArrowRight, Clock3, LibraryBig } from "lucide-react";
import { BooksCard, type IBooks } from "@/components/shared/BooksCard";

export function NewArrivals({ books }: { books: IBooks[] }) {
    const filteredBooks = books.slice(0, 6);

    return (
        <section id="new-arrivals" className="w-full bg-[#fbf9f3] px-4 py-14 text-[#1b1c18] dark:bg-[#17251f] dark:text-[#f3f1eb] md:px-6 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-[1320px]">
                <div className="mb-7 border-b border-[#c1c8c3]/60 pb-6">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8e4b32] dark:text-[#e5a184]">
                        <LibraryBig className="size-4" />
                        Fresh on Shelves
                    </div>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <h2 className="font-heading text-3xl font-medium tracking-tight text-[#234b3c] dark:text-[#dce8df] md:text-4xl">New Arrivals</h2>
                        <span className="inline-flex items-center gap-2 self-start rounded-full border border-[#c1c8c3]/60 bg-[#f0eee8] px-3 py-2 text-[11px] font-semibold text-[#525f58] dark:border-[#34443b] dark:bg-[#26382e] dark:text-[#c4cec7] lg:self-auto">
                            <Clock3 className="size-3.5 text-[#234b3c] dark:text-[#dce8df]" />
                            Recently added to the collection
                        </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#525f58] dark:text-[#b0beb5]">
                        The latest additions freshly cataloged and placed on our community shelves this week.
                    </p>
                </div>

                {filteredBooks.length ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {filteredBooks.map((book) => <BooksCard key={book.id} book={book} />)}
                    </div>
                ) : (
                    <p className="rounded-xl border border-dashed border-[#c1c8c3] px-5 py-10 text-center text-sm text-[#68736c] dark:border-[#48594e] dark:text-[#b0beb5]">
                        No books found in this category yet.
                    </p>
                )}
                <div className="mt-9 flex justify-center">
                    <Link href="/books" className="inline-flex items-center gap-2 rounded-lg bg-[#234b3c] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(35,75,60,0.75)] transition hover:bg-[#1b3b2f] dark:bg-[#dce8df] dark:text-[#17251f] dark:hover:bg-[#c6d6c9]">
                        See All Books <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
