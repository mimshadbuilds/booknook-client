import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    BookOpen,
    BookPlus,
    Library,
    Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EditBookDialog from "@/components/books/EditBookDialog";
import DeleteBookDialog from "@/components/books/DeleteBookDialog";

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

const MyBooksPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    // if (!user?.email) {
    //     redirect("/signin");
    // }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-books/${user?.email}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch your books.");
    }

    const books: IBook[] = await res.json();

    const formatDate = (date?: string) => {
        if (!date) return "Date not available";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
    });
};

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
                            Manage the books you&apos;ve shared with the BookNook
                            community.
                        </p>
                    </div>

                    <Button className="h-11 rounded-lg bg-[#234b3c] px-5 text-sm font-semibold text-white hover:bg-[#1b3b2f]">
                        <Link href="/add-book" className="flex items-center gap-2">
                            <Plus className="size-4" />
                            Add a Book
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="mx-auto max-w-[1320px] px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
                <div className="mb-7 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="font-[Literata] text-xl font-semibold text-[#252d29]">
                            Your Contributions
                        </h2>
                        <p className="mt-1 text-sm text-[#68736c]">
                            Books you&apos;ve added to the community library.
                        </p>
                    </div>

                    <span className="rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-3 py-1.5 text-xs font-semibold text-[#234b3c]">
                        {books.length} {books.length === 1 ? "Book" : "Books"}
                    </span>
                </div>

                {books.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#d5cebe] bg-white px-5 py-16 text-center">
                        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#e8ede9]">
                            <BookOpen className="size-6 text-[#234b3c]" />
                        </div>

                        <h3 className="mt-5 font-[Literata] text-xl font-semibold text-[#252d29]">
                            Your collection is waiting
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#68736c]">
                            You haven&apos;t added any books yet. Share your first
                            book with the BookNook community.
                        </p>

                        <Button className="mt-6 rounded-lg bg-[#234b3c] text-white hover:bg-[#1b3b2f]">
                            <Link href="/add-book" className="flex items-center gap-2">
                                <BookPlus className="size-4" />
                                Add Your First Book
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {books.map((book) => {
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
                                    className="group overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-[0_2px_8px_-2px_rgba(37,45,41,0.04),0_1px_3px_rgba(37,45,41,0.02)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(37,45,41,0.08),0_4px_8px_-2px_rgba(37,45,41,0.04)]">
                                    <Link href={`/books/${book._id}`}
                                        className="relative block aspect-[2/3] overflow-hidden bg-[#f0eee8]">
                                        <Image
                                            src={book.bookImage}
                                            alt={`Cover of ${book.title}`}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                        />

                                        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/15 to-transparent" />

                                        <span
                                            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold ${
                                                book.copies > 0
                                                    ? "bg-[#e8f2e9] text-[#1e5a22]"
                                                    : "bg-[#f7e5dc] text-[#9b4d32]"
                                            }`}
                                        >
                                            {book.copies > 0
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>
                                    </Link>

                                    <div className="p-4">
                                        <div className="mb-3 flex items-center justify-between gap-2">
                                            <span className="rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#234b3c]">
                                                {book.category}
                                            </span>

                                            <span className="text-xs text-[#68736c]">
                                                {book.copies}{" "}
                                                {book.copies === 1 ? "copy" : "copies"}
                                            </span>
                                        </div>

                                        <Link href={`/books/${book._id}`}>
                                            <h3 className="line-clamp-2 font-[Literata] text-lg font-semibold leading-6 text-[#252d29] transition-colors hover:text-[#234b3c]">
                                                {book.title}
                                            </h3>
                                        </Link>

                                        <p className="mt-1 line-clamp-1 text-sm text-[#525f58]">
                                            {book.author}
                                        </p>

                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#68736c]">
                                            {book.description}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between border-t border-[#eee9e0] pt-3">
                                            <span className="text-xs text-[#68736c]">
                                                Added {formatDate(book.createdAt)}
                                            </span>

                                            <Link
                                                href={`/books/${book._id}`}
                                                className="text-xs font-semibold text-[#234b3c] hover:text-[#c97959]"
                                            >
                                                Details
                                            </Link>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <EditBookDialog book={editBook} />
                                            <DeleteBookDialog
                                                bookId={book._id}
                                                bookTitle={book.title}
                                            />
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
};

export default MyBooksPage;