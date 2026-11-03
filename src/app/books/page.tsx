'use client'

import { getBooks } from "@/lib/books-api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, BookOpenCheck, LoaderCircle, RotateCcw, Search, Users, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface IBook {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    bookImage: string;
    copies: number;
    createdAt?: string;
}

const categories = ["Fiction", "Science", "History", "Romance", "Adventure", "Kids", "Others"];

type SortOption = "recent" | "title-asc" | "title-desc";

const AllBooksPage = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [available, setAvailable] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("recent");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books", error);
                toast.error("Failed to fetch books. Please try again later.");
                setError("Failed to fetch books. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

    fetchBooks();
}, []);

const filtered = () => {
        let result = [...books];

        if (search.trim()) {
            const searchTerm = search.toLowerCase().trim();

            result = result.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            );
        }

        if (category !== "All Categories") {
            result = result.filter(book =>
                book.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (available) {
            result = result.filter(book => book.copies > 0);
        }

        if (sortBy === "title-asc") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "title-desc") {
            result.sort((a, b) => b.title.localeCompare(a.title));
        } else {
            result.sort((a, b) => b._id.localeCompare(a._id));
        }

        return result;
    };

    const filteredBooks = filtered();

    const totalAvailable = books.reduce(
        (total, book) => total + Math.max(0, Number(book.copies) || 0),
        0
    );

    const activeFilters =
        search.trim() !== "" || category !== "All Categories" || available;

    function resetFilters() {
        setSearch("");
        setCategory("All Categories");
        setAvailable(false);
        setSortBy("recent");
    }

    return (
        <main className="min-h-screen bg-[#fbf9f3] text-[#252d29]">
            <section className="relative overflow-hidden bg-[#f2f0e8] px-4 py-10 sm:px-6 sm:py-14 lg:px-12">
                <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#c0ecd7]/30 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-80 bg-[#d9e5dc]/50 blur-3xl" />

                <div className="relative mx-auto max-w-[1320px]">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#68736c]">
                        <span>Circulation Desk</span>
                        <span>/</span>
                        <span className="text-[#234b3c]">
                            Open Stacks Catalog
                        </span>
                    </div>

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#234b3c] sm:text-4xl">
                                Explore the Library
                            </h1>

                            <p className="mt-3 text-sm leading-7 text-[#68736c] sm:text-base">
                                Search, filter, and discover community-contributed
                                books across all genres.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 self-start rounded-xl border border-[#e5e0d8] bg-white p-3 shadow-sm lg:self-auto">
                            <div className="flex items-center gap-2 px-2">
                                <span className="size-2.5 animate-pulse rounded-full bg-emerald-700" />
                                <span className="text-sm font-semibold text-[#234b3c]">
                                    {totalAvailable} Copies Available
                                </span>
                            </div>

                            <div className="hidden h-5 w-px bg-[#e5e0d8] sm:block" />

                            <div className="flex items-center gap-2 px-2">
                                <Users className="size-4 text-[#68736c]" />
                                <span className="text-sm text-[#68736c]">
                                    Community Library
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-12">
                <div className="mb-6 rounded-xl border border-[#e5e0d8] bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#68736c]" />

                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title or author..."
                                className="h-12 rounded-lg border-0 bg-[#f2f0e8] pl-11 pr-10 focus-visible:ring-2 focus-visible:ring-[#234b3c]/20"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#68736c] hover:bg-[#e5e0d8]">
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 md:justify-end">
                            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[#414844] hover:bg-[#f2f0e8]">
                                <input
                                    type="checkbox"
                                    checked={available}
                                    onChange={(e) =>
                                        setAvailable(e.target.checked)
                                    }
                                    className="size-4 accent-[#234b3c]"
                                />
                                Available only
                            </label>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={resetFilters}
                                className="h-9 gap-1.5 rounded-lg px-3 text-sm text-[#68736c] hover:bg-[#f2f0e8] hover:text-[#234b3c]">
                                <RotateCcw className="size-3.5" />
                                Reset
                            </Button>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col justify-between gap-4 border-t border-[#eeeae2] pt-4 lg:flex-row lg:items-center">
                        <div className="flex flex-wrap items-center gap-2">
                            {categories.map((item) => {
                                const isActive = category === item;

                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setCategory(item)}
                                        className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                                            isActive
                                                ? "bg-[#234b3c] text-white"
                                                : "bg-[#f0eee8] text-[#59685d] hover:bg-[#dce8df] hover:text-[#234b3c]"
                                        }`}>
                                        {item}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-[#68736c]">
                            <BookOpen className="size-4 text-[#56615a]" />
                            <span>
                                Showing{" "}
                                <strong className="text-[#234b3c]">
                                    {filteredBooks.length}
                                </strong>{" "}
                                {filteredBooks.length === 1 ? "book" : "books"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-5 flex flex-col justify-between gap-3 px-1 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold uppercase tracking-wider text-[#68736c]">
                            Shelf section:
                        </span>
                        <span className="font-bold text-[#234b3c]">
                            {category === "All Categories"
                                ? "All Catalog Editions"
                                : category}
                        </span>
                        {available && (
                            <span className="rounded-full bg-[#dce8df] px-2.5 py-1 font-semibold text-[#234b3c]">
                                Available only
                            </span>
                        )}
                        {search && (
                            <span className="rounded-full bg-[#f6e5dc] px-2.5 py-1 font-semibold text-[#8d4d36]">
                                Search: {search}
                            </span>
                        )}
                    </div>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#68736c]">
                        <span>Sort by</span>
                        <span className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="h-9 rounded-lg border border-[#e5e0d8] bg-white px-3 text-xs font-semibold text-[#234b3c] outline-none focus:border-[#234b3c]">
                            <option value="recent">Recently Added</option>
                            <option value="title-asc">Title (A–Z)</option>
                            <option value="title-desc">Title (Z–A)</option>
                        </select>

                            {/* <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#68736c]" /> */}
                        </span>
                    </label>
                </div>

                {isLoading && (
                    <div className="flex min-h-72 flex-col items-center justify-center gap-4">
                        <LoaderCircle className="size-9 animate-spin text-[#234b3c]" />
                        <p className="text-sm text-[#68736c]">
                            Exploring the library...
                        </p>
                    </div>
                )}

                {!isLoading && error && (
                    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-[#e5e0d8] bg-white px-5 text-center">
                        <BookOpen className="mb-4 size-10 text-[#c97959]" />
                        <h2 className="font-heading text-xl font-bold text-[#234b3c]">
                            Unable to load the library
                        </h2>
                        <p className="mt-2 text-sm text-[#68736c]">
                            {error}
                        </p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-lg bg-[#234b3c] hover:bg-[#1b3b2f]">
                            Try again
                        </Button>
                    </div>
                )}

                {!isLoading && !error && filteredBooks.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredBooks.map((book) => (
                            <article
                                key={book._id}
                                className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e0d8] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <div className="relative flex items-center justify-center overflow-hidden bg-[#f0eee8] p-6">
                                    <div className="absolute bottom-5 left-5 top-5 w-2 rounded-l bg-gradient-to-r from-black/20 to-transparent" />

                                    <div className="relative aspect-[2/3] w-48 overflow-hidden rounded-md shadow-md transition-transform duration-300 group-hover:scale-[1.03]">
                                        <Image
                                            src={book.bookImage}
                                            alt={`Cover of ${book.title}`}
                                            fill
                                            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 240px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <span
                                        className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold shadow-sm backdrop-blur ${
                                            book.copies > 0
                                                ? "bg-emerald-50/95 text-emerald-900"
                                                : "bg-red-50/95 text-red-800"
                                        }`}>
                                        <span
                                            className={`size-1.5 rounded-full ${
                                                book.copies > 0
                                                    ? "bg-emerald-600"
                                                    : "bg-red-600"
                                            }`}
                                        />
                                        {book.copies > 0
                                            ? `Available (${book.copies})`
                                            : "Currently unavailable"}
                                    </span>
                                </div>
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-3 flex items-center justify-between gap-2">
                                        <span className="rounded-full bg-[#dce8df] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#234b3c]">
                                            {book.category}
                                        </span>
                                        <span className="text-xs text-[#879088]">
                                            {book.copies}{" "}
                                            {book.copies === 1
                                                ? "copy"
                                                : "copies"}
                                        </span>
                                    </div>
                                    <h2 className="font-heading text-xl font-bold leading-snug text-[#234b3c] transition-colors group-hover:text-[#c97959]">
                                        {book.title}
                                    </h2>
                                    <p className="mt-1 text-sm text-[#68736c]">
                                        by {book.author}
                                    </p>
                                    <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-[#68736c]">
                                        {book.description}
                                    </p>
                                    <div className="mt-5 border-t border-[#eeeae2] pt-4">
                                        <Link
                                            href={`/books/${book._id}`}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#234b3c] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1b3b2f]">
                                            View book
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                {!isLoading && !error && filteredBooks.length === 0 && (
                    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-[#d9dfd6] bg-white px-5 text-center">
                        <div className="mb-4 grid size-16 place-items-center rounded-full bg-[#dce8df] text-[#234b3c]">
                            <BookOpenCheck className="size-7" />
                        </div>
                        <h2 className="font-heading text-xl font-bold text-[#234b3c]">
                            No books found
                        </h2>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-[#68736c]">
                            We couldn&apos;t find any books matching your search.
                            Try another title, author, or category.
                        </p>
                        {activeFilters && (
                            <Button
                                type="button"
                                onClick={resetFilters}
                                variant="outline"
                                className="mt-5 gap-2 rounded-lg border-[#234b3c] text-[#234b3c] hover:bg-[#dce8df]">
                                <RotateCcw className="size-4" />
                                Clear filters
                            </Button>
                        )}
                    </div>
                )}

                {!isLoading && !error && books.length > 0 && (
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#f0eee8] p-6 text-center sm:flex-row sm:text-left sm:p-8">
                        <div>
                            <h2 className="font-heading text-xl font-bold text-[#234b3c]">
                                Have a book to share?
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-[#68736c]">
                                Help grow the community library by adding
                                another book to the collection.
                            </p>
                        </div>

                        <Link href="/add-book"
                            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#234b3c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1b3b2f]">
                            Add a book
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
};

export default AllBooksPage;