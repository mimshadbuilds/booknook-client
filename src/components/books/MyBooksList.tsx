
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    BookOpen,
    BookPlus,
    CalendarDays,
    ExternalLink,
    Library,
    Plus,
    Search,
    SlidersHorizontal,
} from "lucide-react";
import EditBookDialog from "@/components/books/EditBookDialog";
import DeleteBookDialog from "@/components/books/DeleteBookDialog";
import type { IBook } from "@/app/my-books/page";

interface IBooks {
    id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    image: string;
    copies: number;
    shelf?: string;
    borrows?: number;
    createdAt?: string;
}

interface MyBooksListProps {
    books: IBook[];
}

const MyBooksList = ({ books }: MyBooksListProps) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("newest");

    const categories = [...new Set(books.map((book) => book.category))];
    const totalCopies = books.reduce((total, book) => total + book.copies, 0);
    const availableBooks = books.filter((book) => book.copies > 0).length;

    let filteredBooks = [...books];

    if (search.trim()) {
        const searchTerm = search.toLowerCase();
        filteredBooks = filteredBooks.filter(
            (book) =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm),
        );
    }

    if (category !== "All Categories") {
        filteredBooks = filteredBooks.filter((book) => book.category === category);
    }

    if (sortBy === "newest") {
        filteredBooks.sort(
            (a, b) =>
                new Date(b.createdAt ?? 0).getTime() -
                new Date(a.createdAt ?? 0).getTime(),
        );
    } else if (sortBy === "oldest") {
        filteredBooks.sort(
            (a, b) =>
                new Date(a.createdAt ?? 0).getTime() -
                new Date(b.createdAt ?? 0).getTime(),
        );
    } else if (sortBy === "title-asc") {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
    }

    const formatDate = (date?: string) => {
        if (!date) return "Date not available";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const desktopGrid =
        "xl:grid-cols-[minmax(0,1.65fr)_minmax(92px,0.65fr)_minmax(140px,1fr)_minmax(165px,1.15fr)_minmax(150px,0.95fr)]";

    return (
        <main className="min-h-screen bg-[#fbf9f3]">
            <section className="border-b border-[#e5e0d8] bg-[#f5f3ed]">
                <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8 lg:py-14">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#68736c]">
                            <Library className="size-4 text-[#234b3c]" />
                            Your Library Collection
                        </div>
                        <h1 className="font-[Literata] text-3xl font-semibold tracking-tight text-[#252d29] sm:text-4xl">
                            My Books
                        </h1>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#68736c]">
                            Manage the books you&apos;ve shared with the BookNook community.
                        </p>
                    </div>
                    <Link
                        href="/add-book"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#234b3c] px-5 text-sm font-semibold text-white transition hover:bg-[#1b3b2f]"
                    >
                        <Plus className="size-4" />
                        Add a Book
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-[1320px] px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-[#e5e0d8] bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#68736c]">Titles Donated</p>
                            <BookOpen className="size-5 text-[#234b3c]" />
                        </div>
                        <p className="mt-3 font-[Literata] text-3xl font-semibold text-[#252d29]">
                            {books.length}
                        </p>
                        <p className="mt-1 text-xs text-[#68736c]">
                            Books in your collection
                        </p>
                    </div>
                    <div className="rounded-xl border border-[#e5e0d8] bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#68736c]">Total Copies</p>
                            <Library className="size-5 text-[#234b3c]" />
                        </div>
                        <p className="mt-3 font-[Literata] text-3xl font-semibold text-[#252d29]">
                            {totalCopies}
                        </p>
                        <p className="mt-1 text-xs text-[#68736c]">
                            Copies listed across your books
                        </p>
                    </div>
                    <div className="rounded-xl border border-[#e5e0d8] bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#68736c]">Available Titles</p>
                            <BookPlus className="size-5 text-[#234b3c]" />
                        </div>
                        <p className="mt-3 font-[Literata] text-3xl font-semibold text-[#252d29]">
                            {availableBooks}
                        </p>
                        <p className="mt-1 text-xs text-[#68736c]">
                            Titles with copies available
                        </p>
                    </div>
                </div>

                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <h2 className="font-[Literata] text-xl font-semibold text-[#252d29]">
                            Your Contributions
                        </h2>
                        <p className="mt-1 text-sm text-[#68736c]">
                            Books you&apos;ve added to the community library.
                        </p>
                    </div>
                    <span className="w-fit rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-3 py-1.5 text-xs font-semibold text-[#234b3c]">
                        {books.length} {books.length === 1 ? "Book" : "Books"}
                    </span>
                </div>

                <div className="mb-5 grid grid-cols-1 gap-3 rounded-xl border border-[#e5e0d8] bg-white p-3 sm:grid-cols-[1fr_190px_180px] sm:p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#89928c]" />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by title or author..."
                            className="h-11 w-full rounded-lg border border-[#e5e0d8] bg-[#fbf9f3] pl-10 pr-3 text-sm text-[#252d29] outline-none transition placeholder:text-[#89928c] focus:border-[#234b3c]"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="h-11 rounded-lg border border-[#e5e0d8] bg-[#fbf9f3] px-3 text-sm text-[#525f58] outline-none focus:border-[#234b3c]"
                    >
                        <option value="All Categories">All Categories</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <div className="relative">
                        <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#89928c]" />
                        <select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value)}
                            className="h-11 w-full rounded-lg border border-[#e5e0d8] bg-[#fbf9f3] pl-10 pr-3 text-sm text-[#525f58] outline-none focus:border-[#234b3c]"
                        >
                            <option value="newest">Recently Added</option>
                            <option value="oldest">Oldest Added</option>
                            <option value="title-asc">Title: A to Z</option>
                            <option value="title-desc">Title: Z to A</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#e5e0d8] bg-white">
                    <div className={`hidden ${desktopGrid} items-center gap-3 bg-[#f5f3ed] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#68736c] xl:grid`}>
                        <span>Book Details</span>
                        <span>Copies</span>
                        <span>Availability Status</span>
                        <span>Community Reads</span>
                        <span className="text-center">Actions</span>
                    </div>

                    {books.length === 0 ? (
                        <div className="px-5 py-16 text-center">
                            <BookOpen className="mx-auto size-8 text-[#234b3c]" />
                            <h3 className="mt-4 font-[Literata] text-xl font-semibold text-[#252d29]">
                                Your collection is waiting
                            </h3>
                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#68736c]">
                                You haven&apos;t added any books yet. Share your first book with the BookNook community.
                            </p>
                            <Link
                                href="/add-book"
                                className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-[#234b3c] px-4 text-sm font-semibold text-white hover:bg-[#1b3b2f]"
                            >
                                <BookPlus className="size-4" />
                                Add Your First Book
                            </Link>
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div className="px-5 py-14 text-center">
                            <Search className="mx-auto size-7 text-[#89928c]" />
                            <h3 className="mt-4 font-[Literata] text-lg font-semibold text-[#252d29]">
                                No matching books
                            </h3>
                            <p className="mt-1 text-sm text-[#68736c]">
                                Try another search term or category.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setCategory("All Categories");
                                    setSortBy("newest");
                                }}
                                className="mt-4 text-sm font-semibold text-[#234b3c] hover:text-[#c97959]"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        filteredBooks.map((book) => {
                            const editBook: IBooks = {
                                id: book._id,
                                title: book.title,
                                author: book.author,
                                category: book.category,
                                description: book.description,
                                image: book.bookImage,
                                copies: book.copies,
                                createdAt: book.createdAt,
                            };

                            return (
                                <article
                                    key={book._id}
                                    className={`grid grid-cols-1 gap-4 border-t border-[#eee9e0] px-5 py-5 ${desktopGrid} xl:items-center xl:gap-3`}
                                >
                                    <div className="flex min-w-0 items-center gap-4">
                                        <Link
                                            href={`/books/${book._id}`}
                                            className="relative h-[112px] w-[72px] shrink-0 overflow-hidden rounded-md border border-[#e5e0d8] bg-[#f0eee8]"
                                        >
                                            <Image
                                                src={book.bookImage}
                                                alt={`Cover of ${book.title}`}
                                                fill
                                                sizes="72px"
                                                className="object-cover"
                                            />
                                        </Link>
                                        <div className="min-w-0">
                                            <span className="inline-block max-w-full truncate rounded-full bg-[#e8ede9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#234b3c]">
                                                {book.category}
                                            </span>
                                            <Link href={`/books/${book._id}`}>
                                                <h3 className="mt-2 line-clamp-2 font-[Literata] text-base font-semibold leading-5 text-[#234b3c] hover:text-[#c97959]">
                                                    {book.title}
                                                </h3>
                                            </Link>
                                            <p className="mt-1 truncate text-xs text-[#68736c]">
                                                {book.author}
                                            </p>
                                            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#89928c]">
                                                <CalendarDays className="size-3.5 shrink-0" />
                                                <span className="truncate">Added {formatDate(book.createdAt)}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs text-[#68736c] xl:hidden">
                                            Copies
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#e8ede9] font-[Literata] text-lg font-semibold text-[#234b3c]">
                                                {book.copies}
                                            </span>
                                            <span className="text-xs text-[#68736c]">
                                                {book.copies === 1 ? "Copy" : "Copies"}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs text-[#68736c] xl:hidden">
                                            Availability Status
                                        </p>
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                                book.copies > 0
                                                    ? "bg-[#e8f2e9] text-[#234b3c]"
                                                    : "bg-[#f7e5dc] text-[#9b4d32]"
                                            }`}
                                        >
                                            <span className="size-1.5 rounded-full bg-current" />
                                            {book.copies > 0 ? "Available" : "Unavailable"}
                                        </span>
                                        <p className="mt-1 text-xs text-[#68736c]">
                                            {book.copies > 0 ? "Copies on shelf" : "No copies available"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs text-[#68736c] xl:hidden">
                                            Community Reads
                                        </p>
                                        <p className="text-sm font-medium text-[#252d29]">—</p>
                                        <p className="mt-1 text-xs text-[#68736c]">
                                            No checkout data yet
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 border-t border-[#eee9e0] pt-3 xl:flex-nowrap xl:justify-center xl:border-0 xl:pt-0">
                                        <EditBookDialog book={editBook} />
                                        <DeleteBookDialog
                                            bookId={book._id}
                                            bookTitle={book.title}
                                        />
                                        <Link
                                            href={`/books/${book._id}`}
                                            aria-label={`View details for ${book.title}`}
                                            title="View details"
                                            className="grid size-8 shrink-0 place-items-center rounded-md text-[#525f58] transition hover:bg-[#e8ede9] hover:text-[#234b3c]"
                                        >
                                            <ExternalLink className="size-4" />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>

                {filteredBooks.length > 0 && (
                    <p className="mt-4 text-right text-xs text-[#89928c]">
                        Showing {filteredBooks.length} of {books.length} books
                    </p>
                )}
            </section>
        </main>
    );
};

export default MyBooksList;
