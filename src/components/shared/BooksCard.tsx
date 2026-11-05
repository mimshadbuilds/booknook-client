'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getLoanDays } from "@/lib/utils";

import type { IBooks } from "@/lib/books-api";
export type { IBooks };

export function BooksCard({ book, rank }: { book: IBooks; rank?: number }) {

    const [fallbackImg, setFallbackImg] = useState(!book.image);
    const showCover = !fallbackImg && Boolean(book.image);
    const loanDays = getLoanDays(book.id);

    return (
        <article className="overflow-hidden rounded-2xl border border-[#e7e2d9] bg-white shadow-[0_1px_2px_rgba(37,45,41,0.04),0_10px_28px_-16px_rgba(37,45,41,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(37,45,41,0.12),0_4px_8px_-2px_rgba(37,45,41,0.06)] dark:border-[#34443b] dark:bg-[#202f27]">
            <Link href={`/books/${book.id}`}
                className="group relative block aspect-[2/3] overflow-hidden bg-linear-to-b from-[#f4f2ec] to-[#eae6dd] dark:from-[#26382e] dark:to-[#1d2b23]"
                aria-label={`View ${book.title}`}>
                <span className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                    {showCover ? (
                        <Image src={book.image}
                            alt="book cover img"
                            fill
                            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 240px"
                            className="object-contain p-5 drop-shadow-[0_10px_18px_rgba(24,28,24,0.22)] md:p-6 dark:drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)]"
                            onError={() => setFallbackImg(true)}
                        />
                    ) : (
                        <div className="flex size-full flex-col items-center justify-center gap-3 bg-linear-to-br from-[#e8ede9] to-[#dce8df] p-5 text-center text-[#234b3c] dark:from-[#314b3b] dark:to-[#26382e] dark:text-[#dce8df]">
                            <BookOpen className="size-10 opacity-60" />
                            <span className="line-clamp-2 font-heading text-lg font-semibold leading-snug">{book.title}</span>
                            <span className="text-xs opacity-75">{book.author}</span>
                        </div>
                    )}
                    {showCover ? (
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-5 left-5 w-2.5 rounded-l-sm bg-linear-to-r from-black/25 to-transparent md:inset-y-6 md:left-6 dark:from-black/45" />
                    ) : null}
                </span>
                {rank ? (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-[#234b3c] px-3 py-1 text-xs font-bold text-white shadow-sm dark:bg-[#dce8df] dark:text-[#17251f]">
                        #{rank} circulated
                    </span>
                ) : null}
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#252d29] shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#1b2b23]/95 dark:text-[#f0f2ed]">
                    <span className={`size-1.5 rounded-full ${book.copies > 0 ? "bg-emerald-600" : "bg-stone-400"}`} />
                    {book.copies} {book.copies === 1 ? "copy" : "copies"} available
                </span>
            </Link>

            <div className="p-4 md:p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <Badge
                        variant="secondary"
                        className="rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-2.5 py-1 text-[11px] font-semibold text-[#234b3c] dark:border-[#48604f] dark:bg-[#314b3b] dark:text-[#dce8df]">
                        {book.category}
                    </Badge>
                    <span className="text-[11px] text-[#68736c] dark:text-[#aab8ae]">
                        {book.shelf ?? "Community shelf"}
                    </span>
                </div>

                <h3 className="line-clamp-1 font-heading text-lg font-semibold leading-6 text-[#252d29] dark:text-[#f0f2ed]">
                    <Link href={`/books/${book.id}`} className="hover:text-[#234b3c] dark:hover:text-[#dce8df]">
                        {book.title}
                    </Link>
                </h3>

                <p className="mt-1 line-clamp-1 text-sm text-[#525f58] dark:text-[#aab8ae]">
                    {book.author}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#eee9e0] pt-3 dark:border-[#3a4a40]">
                    <span className="text-[11px] text-[#69736d] dark:text-[#aab8ae]">
                        Standard {loanDays}-day borrow
                    </span>
                    <Link
                        href={`/books/${book.id}`}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#ded9cf] px-2.5 py-1.5 text-[11px] font-semibold text-[#234b3c] transition-colors hover:bg-[#eef3ef] dark:border-[#48594e] dark:text-[#dce8df] dark:hover:bg-[#314b3b]">
                        View Details <ArrowUpRight className="size-3.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
