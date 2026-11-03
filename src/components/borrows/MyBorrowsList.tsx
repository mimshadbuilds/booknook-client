
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, CalendarDays, CheckCircle2, History, Library, LoaderCircle, RotateCcw, Search, Tag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IBorrow } from "@/app/borrows/page";

interface MyBorrowsListProps {
    borrows: IBorrow[];
}

const MyBorrowsList = ({ borrows: initBorrows }: MyBorrowsListProps) => {
    const router = useRouter();
    const [borrows, setBorrows] = useState(initBorrows);
    const [activeTab, setActiveTab] = useState<"active" | "history">("active");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
    const [returningId, setReturningId] = useState<string | null>(null);

    const activeBorrows = borrows.filter(
        borrow => borrow.status === "borrowed",
    );

    const returnedBorrows = borrows.filter(
        borrow => borrow.status === "returned",
    );

    const categories = [...new Set(borrows
        .map(borrow => borrow.book?.category)
        .filter((value): value is string => Boolean(value)),
        ),
    ].sort();

    const searchTerm = search.trim().toLowerCase();

    const filteredBorrows = borrows.filter(borrow => {
            const matchesTab =
                activeTab === "active"
                    ? borrow.status === "borrowed"
                    : true;

            const matchesSearch =
                !searchTerm ||
                borrow.book?.title.toLowerCase().includes(searchTerm) ||
                borrow.book?.author.toLowerCase().includes(searchTerm) ||
                borrow.bookId.toLowerCase().includes(searchTerm);

            const matchesCategory =
                category === "all" ||
                borrow.book?.category === category;

            return matchesTab && matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            const dateA = new Date(a.borrowedAt).getTime();
            const dateB = new Date(b.borrowedAt).getTime();

            return sortBy === "newest"
                ? dateB - dateA
                : dateA - dateB;
        });

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    const handleReturn = async (borrowId: string) => {
        try {
            setReturningId(borrowId);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrowId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "returned" }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Unable to return this book.");
            }

            setBorrows(current => 
                current.map(borrow =>
                    borrow._id === borrowId
                        ? {...borrow, 
                            status: "returned",
                            returnedAt: new Date().toISOString(),
                        }
                        : borrow,
                ),
            );

            toast.success(result.message || "Book returned successfully.");
            router.refresh();
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong. Please try again.");
        } finally {
            setReturningId(null);
        }
    };

    return (
        <main className="min-h-screen bg-[#fbf9f3] px-4 py-8 text-[#252d29] sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1232px]">
                <div className="mb-7">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a918b]">
                        <span className="size-1.5 rounded-full bg-[#c97959]" />
                        Member Circulation • Borrowing Record
                    </div>

                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="font-[Literata] text-3xl font-semibold tracking-tight text-[#234b3c]">
                                My Borrows
                            </h1>
                            <p className="mt-1 max-w-xl text-sm leading-6 text-[#68736c]">
                                Manage your borrowed books and keep track of your personal borrowing history.
                            </p>
                        </div>

                        <div className="flex w-fit items-center gap-2 rounded-full border border-[#e5e0d8] bg-white px-3 py-2 text-xs text-[#59685d]">
                            <Library className="size-3.5 text-[#234b3c]" />
                            My Library Records
                        </div>
                    </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-[#e9e5dc] bg-white p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#68736c]">
                                Active Borrows
                            </p>
                            <span className="grid size-9 place-items-center rounded-lg bg-[#e8ede9] text-[#234b3c]">
                                <BookOpen className="size-4" />
                            </span>
                        </div>
                        <p className="mt-2 font-[Literata] text-2xl font-semibold text-[#234b3c]">
                            {activeBorrows.length}
                        </p>
                        <p className="mt-1 text-xs text-[#68736c]">
                            <span className="mr-1 inline-block size-1.5 rounded-full bg-[#65a875]" />
                            Currently borrowed books
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#e9e5dc] bg-white p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#68736c]">
                                Returned Books
                            </p>
                            <span className="grid size-9 place-items-center rounded-lg bg-[#f9eee8] text-[#c97959]">
                                <CheckCircle2 className="size-4" />
                            </span>
                        </div>
                        <p className="mt-2 font-[Literata] text-2xl font-semibold text-[#c97959]">
                            {returnedBorrows.length}
                        </p>
                        <p className="mt-1 text-xs text-[#68736c]">
                            Successfully returned
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#e9e5dc] bg-white p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#68736c]">
                                Total Borrowings
                            </p>
                            <span className="grid size-9 place-items-center rounded-lg bg-[#f0eee8] text-[#59685d]">
                                <History className="size-4" />
                            </span>
                        </div>
                        <p className="mt-2 font-[Literata] text-2xl font-semibold text-[#234b3c]">
                            {borrows.length}
                        </p>
                        <p className="mt-1 text-xs text-[#68736c]">
                            Your lifetime borrowing records
                        </p>
                    </div>
                </div>

                <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex w-fit items-center gap-1 rounded-lg border border-[#e9e5dc] bg-white p-1">
                        <button
                            type="button"
                            onClick={() => setActiveTab("active")}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition ${
                                activeTab === "active"
                                    ? "bg-[#e8ede9] text-[#234b3c]"
                                    : "text-[#68736c] hover:bg-[#f5f3ed]"
                            }`}>
                            Active Borrows
                            <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px]">
                                {activeBorrows.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("history")}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition ${
                                activeTab === "history"
                                    ? "bg-[#e8ede9] text-[#234b3c]"
                                    : "text-[#68736c] hover:bg-[#f5f3ed]"
                            }`}>
                            Borrowing History
                            <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px]">
                                {borrows.length}
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(190px,1fr)_150px_175px] lg:w-auto lg:min-w-[580px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#89928c]" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search borrowed titles, authors, or IDs"
                                className="h-10 w-full rounded-lg border border-[#e5e0d8] bg-white pl-9 pr-3 text-xs text-[#252d29] outline-none transition placeholder:text-[#9ba29c] focus:border-[#234b3c]"
                            />
                        </div>

                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="h-10 rounded-lg border border-[#e5e0d8] bg-white px-3 text-xs text-[#525f58] outline-none focus:border-[#234b3c]">
                            <option value="all">All Categories</option>
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select value={sortBy} onChange={(event) =>
                                setSortBy(event.target.value as "newest" | "oldest",)
                            }
                            className="h-10 rounded-lg border border-[#e5e0d8] bg-white px-3 text-xs text-[#525f58] outline-none focus:border-[#234b3c]">
                            <option value="newest">Borrow Date (Newest)</option>
                            <option value="oldest">Borrow Date (Oldest)</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#e5e0d8] bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] border-collapse text-left">
                            <thead className="bg-[#f5f3ed]">
                                <tr className="border-b border-[#e5e0d8] text-[10px] font-semibold uppercase tracking-[0.08em] text-[#68736c]">
                                    <th className="px-5 py-3.5">Book Title</th>
                                    <th className="px-4 py-3.5">Borrowed Date</th>
                                    <th className="px-4 py-3.5">Return Date</th>
                                    <th className="px-4 py-3.5">Borrow Status</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredBorrows.map((borrow) => (
                                    <tr
                                        key={borrow._id}
                                        className="border-b border-[#eeeae2] last:border-b-0 transition hover:bg-[#fdfcf9]">
                                        <td className="px-5 py-4">
                                            <div className="flex min-w-[230px] items-center gap-3">
                                                <div className="relative size-[58px] shrink-0 overflow-hidden rounded-md border border-[#eeeae2] bg-[#f0eee8]">
                                                    {borrow.book?.bookImage ? (
                                                        <Image
                                                            src={borrow.book.bookImage}
                                                            alt={borrow.book.title}
                                                            fill
                                                            sizes="58px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="grid size-full place-items-center text-[#89928c]">
                                                            <BookOpen className="size-5" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    {borrow.book?.category && (
                                                        <span className="mb-1 inline-block rounded-full bg-[#e8ede9] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#234b3c]">
                                                            {borrow.book.category}
                                                        </span>
                                                    )}
                                                    <p className="line-clamp-2 font-[Literata] text-sm font-semibold leading-5 text-[#252d29]">
                                                        {borrow.book?.title || "Book no longer available"}
                                                    </p>
                                                    <p className="mt-0.5 truncate text-[11px] text-[#68736c]">
                                                        {borrow.book?.author || "Book information unavailable"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2 text-xs font-medium text-[#252d29]">
                                                <CalendarDays className="size-3.5 text-[#89928c]" />
                                                {formatDate(borrow.borrowedAt)}
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            {borrow.returnedAt ? (
                                                <div className="flex items-center gap-2 text-xs font-medium text-[#252d29]">
                                                    <CheckCircle2 className="size-3.5 text-[#5b9b6a]" />
                                                    {formatDate(borrow.returnedAt)}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-[#89928c]">
                                                    Not returned yet
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                                    borrow.status === "borrowed"
                                                        ? "bg-[#e8f2e9] text-[#39734a]"
                                                        : "bg-[#f0eee8] text-[#68736c]"
                                                }`}>
                                                <span className="size-1.5 rounded-full bg-current" />
                                                {borrow.status === "borrowed"
                                                    ? "Active Loan"
                                                    : "Returned"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            {borrow.status === "borrowed" ? (
                                                <Button
                                                    type="button"
                                                    onClick={() => handleReturn(borrow._id)}
                                                    disabled={returningId !== null}
                                                    className="h-8 rounded-md bg-[#234b3c] px-3 text-[11px] font-semibold text-white hover:bg-[#1b3b2f] disabled:opacity-60">
                                                    {returningId === borrow._id ? (
                                                        <LoaderCircle className="size-3.5 animate-spin" />
                                                    ) : (
                                                        <RotateCcw className="size-3.5" />
                                                    )}
                                                    Return Book
                                                </Button>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#68736c]">
                                                    <CheckCircle2 className="size-3.5 text-[#65a875]" />
                                                    Completed
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {filteredBorrows.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-16 text-center">
                                            <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#f0eee8] text-[#68736c]">
                                                {activeTab === "active" ? (
                                                    <BookOpen className="size-5" />
                                                ) : (
                                                    <History className="size-5" />
                                                )}
                                            </div>
                                            <p className="mt-3 font-[Literata] text-base font-semibold text-[#234b3c]">
                                                {search || category !== "all"
                                                    ? "No matching borrowing records"
                                                    : activeTab === "active"
                                                    ? "No active borrow"
                                                    : "No borrowing history yet"}
                                            </p>
                                            <p className="mt-1 text-xs text-[#68736c]">
                                                {search || category !== "all"
                                                    ? "Try changing your search or category filter."
                                                    : activeTab === "active"
                                                    ? "Books you borrow will appear here."
                                                    : "Your returned books will appear here."}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <section className="mt-5 flex flex-col gap-4 rounded-xl border border-[#e9e5dc] bg-[#f0eee8] p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#dce8df] text-[#234b3c]">
                            <Tag className="size-4" />
                        </span>
                        <div>
                            <h2 className="font-[Literata] text-base font-semibold text-[#234b3c]">
                                The BookNook Circulation Honor Code
                            </h2>
                            <p className="mt-1 max-w-3xl text-xs leading-5 text-[#68736c]">
                                Our shelves run on neighborly trust. We offer a standard 21-day loan period. Please take good care of borrowed books and return them responsibly so another reader can enjoy them.
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 text-xs font-semibold text-[#234b3c]">
                        Read Guidelines →
                    </div>
                </section>
            </div>
        </main>
    );
};

export default MyBorrowsList;
