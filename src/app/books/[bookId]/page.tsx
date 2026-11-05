import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, BookOpenCheck, BookPlusIcon, CalendarDays, CalendarSyncIcon, CheckCircle2, MapPin, Share2,  } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BorrowBookDialog from "@/components/books/BorrowBookDialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Metadata } from "next";

interface IBook {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    bookImage: string;
    copies: number;
    createdAt: string;
}

async function getBookDetails(bookId: string): Promise<IBook> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
        cache: "no-store",
    });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error("Failed to fetch book details.");
    }

    return res.json();
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ bookId: string }>;
}): Promise<Metadata> {
    const { bookId } = await params;
    const book = await getBookDetails(bookId);
    const description = book.description.trim();

    return {
        title: `${book.title} | BookNook`,
        description: description
            ? description.length > 160
                ? `${description.slice(0, 157).trimEnd()}...`
                : description
            : `Explore ${book.title} by ${book.author} at BookNook.`,
    };
}

const BookDetailsPage = async({ params } : {params: Promise<{ bookId: string }>}) => {
    const { bookId } = await params;

        const session = await auth.api.getSession({
            headers: await headers(),
        });
    
        const user = session?.user;

    const bookDetails = await getBookDetails(bookId);
    const isAvailable = bookDetails.copies > 0;
    
    const addedDate = bookDetails.createdAt 
    ? new Date(bookDetails.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }) : "Not Specified";

    return (
        <main className="min-h-screen bg-[#fbf9f3] text-[#252d29] dark:bg-[#17251f] dark:text-[#f0f2ed]">
            <div className="border-b border-[#eae6dd] bg-[#f5f3ed] dark:border-[#34443b] dark:bg-[#202f27]">
                <div className="mx-auto flex max-w-[1320px] items-center gap-2 overflow-x-auto whitespace-nowrap px-4 py-3 text-xs text-[#68736c] sm:px-6 lg:px-8 dark:text-[#aab8ae]">
                    <Link href="/"
                        className="transition-colors hover:text-[#234b3c] dark:hover:text-[#dce8df]">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/books"
                        className="transition-colors hover:text-[#234b3c] dark:hover:text-[#dce8df]">
                        All Books
                    </Link>
                    <span>/</span>
                    <span className="font-medium text-[#252d29] dark:text-[#f0f2ed]">
                        {bookDetails.title}
                    </span>
                </div>
            </div>

            <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
                    <aside className="flex flex-col gap-5 lg:col-span-4">
                        <div className="rounded-xl border border-[#e9e4da] bg-white p-4 shadow-sm sm:p-5 dark:border-[#34443b] dark:bg-[#202f27]">
                            <div className="mb-4 flex items-center justify-between gap-2">
                                <Badge
                                    variant="secondary"
                                    className="rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#234b3c] dark:border-[#48604f] dark:bg-[#314b3b] dark:text-[#dce8df]">
                                    {bookDetails.category}
                                </Badge>
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#68736c] dark:text-[#aab8ae]">
                                    ID: {bookDetails._id}
                                </span>
                            </div>
                            <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px] overflow-hidden rounded-lg bg-[#f0eee8] shadow-[0_12px_30px_-12px_rgba(37,45,41,0.28)] dark:bg-[#26382e]">
                                <Image src={bookDetails.bookImage}
                                    alt='Book cover image'
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 90vw, 340px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-[#f5f3ed] p-4 dark:bg-[#26382e]">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`size-2.5 shrink-0 rounded-full ${
                                            isAvailable
                                                ? "bg-[#23976b]"
                                                : "bg-[#c97959]"
                                        }`}/>
                                    <div>
                                        <p className="text-sm font-semibold text-[#252d29] dark:text-[#f0f2ed]">
                                            {isAvailable
                                                ? "Available on shelf"
                                                : "Currently unavailable"}
                                        </p>
                                        <p className="mt-0.5 text-xs text-[#68736c] dark:text-[#aab8ae]">
                                            Community Library
                                        </p>
                                    </div>
                                </div>
                                <BookOpenCheck className="size-5 shrink-0 text-[#234b3c] dark:text-[#dce8df]" />
                            </div>
                        </div>
                        <div className="rounded-xl border border-[#e9e4da] bg-white p-5 dark:border-[#34443b] dark:bg-[#202f27]">
                            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#252d29] dark:text-[#f0f2ed]">
                                <BookOpen className="size-4 text-[#234b3c] dark:text-[#dce8df]" />
                                Book Information
                            </h2>
                            <Separator className="mb-4 bg-[#eee9e0] dark:bg-[#34443b]" />
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[#68736c] dark:text-[#aab8ae]">
                                        Author
                                    </span>
                                    <span className="text-right font-medium">
                                        {bookDetails.author}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[#68736c] dark:text-[#aab8ae]">
                                        Category
                                    </span>
                                    <span className="text-right font-medium">
                                        {bookDetails.category}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[#68736c] dark:text-[#aab8ae]">
                                        Added to library
                                    </span>
                                    <span className="text-right font-medium">
                                        {addedDate}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[#68736c] dark:text-[#aab8ae]">
                                        Available copies
                                    </span>
                                    <span className="font-semibold text-[#234b3c] dark:text-[#dce8df]">
                                        {bookDetails.copies}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <section className="flex flex-col gap-7 lg:col-span-8">
                        <div>
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <Badge className="rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#234b3c] hover:bg-[#e8ede9] dark:border-[#48604f] dark:bg-[#314b3b] dark:text-[#dce8df] dark:hover:bg-[#314b3b]">
                                    {bookDetails.category}
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="rounded-full bg-[#f0eee8] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#68736c] dark:bg-[#26382e] dark:text-[#aab8ae]">
                                    Community Collection
                                </Badge>
                            </div>
                            <h1 className="font-[Literata] text-3xl font-semibold leading-tight tracking-tight text-[#252d29] sm:text-4xl lg:text-[42px] dark:text-[#f0f2ed]">
                                {bookDetails.title}
                            </h1>
                            <p className="mt-3 text-base text-[#68736c] dark:text-[#aab8ae]">
                                by{" "}
                                <span className="font-semibold text-[#234b3c] dark:text-[#dce8df]">
                                    {bookDetails.author}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#68736c] dark:text-[#aab8ae]">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-[#23976b]" />
                                {isAvailable
                                    ? "Available for borrowing"
                                    : "Out of stock"}
                            </span>
                            <span className="flex items-center gap-2">
                                <BookOpen className="size-4 text-[#234b3c] dark:text-[#dce8df]" />
                                {bookDetails.copies}{" "}
                                {bookDetails.copies === 1
                                    ? "copy available"
                                    : "copies available"}
                            </span>
                            <span className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-[#234b3c] dark:text-[#dce8df]" />
                                Added {addedDate}
                            </span>
                        </div>
                        <div className="rounded-xl border border-[#e9e4da] bg-white p-5 sm:p-6 dark:border-[#34443b] dark:bg-[#202f27]">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`size-2.5 rounded-full ${
                                            isAvailable
                                                ? "bg-[#23976b]"
                                                : "bg-[#c97959]"
                                        }`}
                                    />
                                    <h2 className="text-sm font-semibold text-[#252d29] dark:text-[#f0f2ed]">
                                    {isAvailable
                                        ? `Available — ${bookDetails.copies} ${bookDetails.copies === 1
                                            ? "copy"
                                            : "copies"
                                            } currently on shelf`
                                        : "Currently unavailable"}
                                    </h2>
                                </div>
                                <Badge
                                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                                        isAvailable
                                            ? "bg-[#dceee5] text-[#23724f] hover:bg-[#dceee5] dark:bg-[#314b3b] dark:text-[#dce8df] dark:hover:bg-[#314b3b]"
                                            : "bg-[#f7e5dc] text-[#9b4d32] hover:bg-[#f7e5dc] dark:bg-[#3a2b24] dark:text-[#e5a184] dark:hover:bg-[#3a2b24]"
                                    }`}>
                                    {isAvailable
                                        ? "Available"
                                        : "Out of stock"}
                                </Badge>
                            </div>
                            <p className="mt-1 text-xs text-[#68736c] dark:text-[#aab8ae]">
                                {isAvailable
                                    ? "Ready for borrowing from the community library."
                                    : "Please check back later for availability."}
                            </p>
                            <Separator className="my-5 bg-[#eee9e0] dark:bg-[#34443b]" />
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-lg bg-[#f5f3ed] p-3 dark:bg-[#26382e]">
                                    <BookPlusIcon className="size-5 text-[#234b3c] dark:text-[#dce8df]" />
                                    <div>
                                        <p className="text-[10px] font-semibold tracking-wider text-[#68736c] dark:text-[#aab8ae]">
                                            Added by
                                        </p>
                                        <p className="mt-0.5 text-sm font-bold text-[#1a201d] dark:text-[#f0f2ed]">
                                            {user?.name}
                                        </p>
                                        <p className="text-[10px] font-semibold tracking-wider text-[#68736c] dark:text-[#aab8ae]">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-[#f5f3ed] p-3 dark:bg-[#26382e]">
                                    <CalendarSyncIcon className="size-5 text-[#234b3c] dark:text-[#dce8df]" />
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#68736c] dark:text-[#aab8ae]">
                                            Borrow Period
                                        </p>
                                        <p className="mt-0.5 text-sm font-semibold text-[#252d29] dark:text-[#f0f2ed]">
                                            21 Calendar Days
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center gap-3">
                                <BorrowBookDialog book={bookDetails} />
                                <Button
                                    variant="outline"
                                    className="h-12 flex-1 rounded-lg border-[#d1ddd3] bg-[#e8ede9] text-sm font-semibold text-[#234b3c] hover:bg-[#dce8df] dark:border-[#48604f] dark:bg-[#314b3b] dark:text-[#dce8df] dark:hover:bg-[#314b3b]">
                                    <BookOpenCheck className="mr-2 size-4" />
                                    Save to List
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    aria-label="Share this book"
                                    title="Share this book"
                                    className="size-12 shrink-0 rounded-lg border-[#e5e0d8] bg-white text-[#234b3c] hover:bg-[#f0eee8] dark:border-[#34443b] dark:bg-[#202f27] dark:text-[#dce8df] dark:hover:bg-[#26382e]">
                                    <Share2 className="size-4" />
                                </Button>
                            </div>
                        </div>
                        <section className="pt-1">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <h2 className="font-[Literata] text-2xl font-semibold text-[#252d29] dark:text-[#f0f2ed]">
                                    About This Book
                                </h2>
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#68736c] dark:text-[#aab8ae]">
                                    {bookDetails.category}
                                </span>
                            </div>
                            <Separator className="mb-5 bg-[#e9e4da] dark:bg-[#34443b]" />
                            <p className="whitespace-pre-line text-[15px] leading-8 text-[#525f58] dark:text-[#aab8ae]">
                                {bookDetails.description}
                            </p>
                        </section>
                        <div>
                            <Link href="/books"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#234b3c] transition-colors hover:text-[#c97959] dark:text-[#dce8df] dark:hover:text-[#e5a184]">
                                <ArrowLeft className="size-4" />
                                Back to All Books
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default BookDetailsPage;