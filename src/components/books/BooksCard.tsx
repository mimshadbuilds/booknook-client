import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type IBooks = {
    id: string;
    title: string;
    author: string;
    category: string;
    image: string;
    copies: number;
    shelf?: string;
    borrows?: number;
};

export function BooksCard( { book, rank } : { book: IBooks; rank?: number }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(37,45,41,0.08),0_4px_8px_-2px_rgba(37,45,41,0.04)]">
        <Link href={`/books/${book.id}`} className="relative block aspect-[2/3] overflow-hidden bg-[#f0eee8]" aria-label={`View ${book.title}`}>
            <img src={book.image} alt={`Cover artwork for ${book.title}`} className="size-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/15 to-transparent">
                {rank ? <span className="absolute left-3 top-3 rounded-full bg-[#234b3c] px-3 py-1 text-xs font-bold text-white">#{rank} circulated</span> : null} 
            </div>
        </Link>
        <div className="p-4 md:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary" className="rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#234b3c]">{book.category}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-[#526058]"><CheckCircle2 className="size-3.5 text-[#2e7d32]" /> {book.copies} {book.copies === 1 ? "copy" : "copies"}</span>
            </div>
            <h3 className="line-clamp-2 font-[Literata] text-lg font-semibold leading-6 text-[#252d29]"><Link href={`/books/${book.id}`} className="hover:text-[#234b3c]">{book.title}</Link></h3>
            <p className="mt-1 text-sm text-[#525f58]">{book.author}</p>
            <div className="mt-4 flex items-center justify-between border-t border-[#eee9e0] pt-3">
            <span className="text-xs text-[#69736d]">{book.shelf ?? "Community shelf"}</span>
            <Link href={`/books/${book.id}`} className="inline-flex items-center rounded-lg px-2 py-1 text-sm font-medium text-[#234b3c] transition-colors hover:bg-[#dce8df]">Details <ArrowUpRight className="ml-1 size-4" /></Link>
            </div>
        </div>
        </article>
    );
}
