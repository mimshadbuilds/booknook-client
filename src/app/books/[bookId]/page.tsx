import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, BookOpenCheck, CalendarDays, CheckCircle2, Clock3, MapPin, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

const BookDetailsPage = async({ params} : { params: Promise<{ bookId: string }> }) => {
    const { bookId } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, { 
        cache: "no-store" });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error("Failed to fetch book details.");
    }

    const bookDetails: IBook = await res.json();
    const isAvailable = bookDetails.copies > 0;
    
    const addedDate = bookDetails.createdAt 
    ? new Date(bookDetails.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }) : "Not Specified";

    return (
        <main className="min-h-screen bg-[#fbf9f3] text-[#252d29]">
            <div className="border-b border-[#eae6dd] bg-[#f5f3ed]">
                <div className="mx-auto flex max-w-[1320px] items-center gap-2 overflow-x-auto whitespace-nowrap px-4 py-3 text-xs text-[#68736c] sm:px-6 lg:px-8">
                    <Link href="/"
                        className="transition-colors hover:text-[#234b3c]">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/books"
                        className="transition-colors hover:text-[#234b3c]">
                        All Books
                    </Link>
                    <span>/</span>
                    <span className="font-medium text-[#252d29]">
                        {bookDetails.title}
                    </span>
                </div>
            </div>

            <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
                    <aside className="flex flex-col gap-5 lg:col-span-4">
                        <div className="rounded-xl border border-[#e9e4da] bg-white p-4 shadow-sm sm:p-5">
                            <div className="mb-4 flex items-center justify-between gap-2">
                                <Badge
                                    variant="secondary"
                                    className="rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#234b3c]">
                                    {bookDetails.category}
                                </Badge>
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#68736c]">
                                    ID: {bookDetails._id}
                                </span>
                            </div>

                            <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px] overflow-hidden rounded-lg bg-[#f0eee8] shadow-[0_12px_30px_-12px_rgba(37,45,41,0.28)]">
                                <Image
                                    src={bookDetails.bookImage}
                                    alt='Book cover image'
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 90vw, 340px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-[#f5f3ed] p-4">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`size-2.5 shrink-0 rounded-full ${
                                            isAvailable
                                                ? "bg-[#23976b]"
                                                : "bg-[#c97959]"
                                        }`}/>
                                    <div>
                                        <p className="text-sm font-semibold text-[#252d29]">
                                            {isAvailable
                                                ? "Available on shelf"
                                                : "Currently unavailable"}
                                        </p>
                                        <p className="mt-0.5 text-xs text-[#68736c]">
                                            Community Library
                                        </p>
                                    </div>
                                </div>
                                <BookOpenCheck className="size-5 shrink-0 text-[#234b3c]" />
                            </div>
                        </div>
                        <div className="rounded-xl border border-[#e9e4da] bg-white p-5">
                            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#252d29]">
                                <BookOpen className="size-4 text-[#234b3c]" />
                                Book Information
                            </h2>
                            <Separator className="mb-4 bg-[#eee9e0]" />
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[#68736c]">
                                        Author
                                    </span>
                                    <span className="text-right font-medium">
                                        {bookDetails.author}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[#68736c]">
                                        Category
                                    </span>
                                    <span className="text-right font-medium">
                                        {bookDetails.category}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[#68736c]">
                                        Added to library
                                    </span>
                                    <span className="text-right font-medium">
                                        {addedDate}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[#68736c]">
                                        Available copies
                                    </span>
                                    <span className="font-semibold text-[#234b3c]">
                                        {bookDetails.copies}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <section className="flex flex-col gap-7 lg:col-span-8">
                        <div>
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <Badge className="rounded-full border border-[#d1ddd3] bg-[#e8ede9] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#234b3c] hover:bg-[#e8ede9]">
                                    {bookDetails.category}
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="rounded-full bg-[#f0eee8] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#68736c]">
                                    Community Collection
                                </Badge>
                            </div>
                            <h1 className="font-[Literata] text-3xl font-semibold leading-tight tracking-tight text-[#252d29] sm:text-4xl lg:text-[42px]">
                                {bookDetails.title}
                            </h1>
                            <p className="mt-3 text-base text-[#68736c]">
                                by{" "}
                                <span className="font-semibold text-[#234b3c]">
                                    {bookDetails.author}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#68736c]">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-[#23976b]" />
                                {isAvailable
                                    ? "Available for borrowing"
                                    : "Out of stock"}
                            </span>
                            <span className="flex items-center gap-2">
                                <BookOpen className="size-4 text-[#234b3c]" />
                                {bookDetails.copies}{" "}
                                {bookDetails.copies === 1
                                    ? "copy available"
                                    : "copies available"}
                            </span>
                            <span className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-[#234b3c]" />
                                Added {addedDate}
                            </span>
                        </div>
                        <div className="rounded-xl border border-[#e9e4da] bg-white p-5 sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`size-2.5 rounded-full ${
                                            isAvailable
                                                ? "bg-[#23976b]"
                                                : "bg-[#c97959]"
                                        }`}
                                    />
                                    <h2 className="text-sm font-semibold text-[#252d29]">
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
                                            ? "bg-[#dceee5] text-[#23724f] hover:bg-[#dceee5]"
                                            : "bg-[#f7e5dc] text-[#9b4d32] hover:bg-[#f7e5dc]"
                                    }`}>
                                    {isAvailable
                                        ? "Available"
                                        : "Out of stock"}
                                </Badge>
                            </div>
                            <p className="mt-1 text-xs text-[#68736c]">
                                {isAvailable
                                    ? "Ready for borrowing from the community library."
                                    : "Please check back later for availability."}
                            </p>
                            <Separator className="my-5 bg-[#eee9e0]" />
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-lg bg-[#f5f3ed] p-3">
                                    <Clock3 className="size-5 text-[#234b3c]" />
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#68736c]">
                                            Borrowing
                                        </p>
                                        <p className="mt-0.5 text-sm font-semibold text-[#252d29]">
                                            Community loan
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-[#f5f3ed] p-3">
                                    <MapPin className="size-5 text-[#234b3c]" />
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#68736c]">
                                            Collection
                                        </p>
                                        <p className="mt-0.5 text-sm font-semibold text-[#252d29]">
                                            Community library
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center gap-3">
                                <Button
                                    disabled={!isAvailable}
                                    className="h-12 flex-1 rounded-lg bg-[#234b3c] text-sm font-semibold text-white hover:bg-[#193b2f] disabled:opacity-50">
                                    <BookOpen className="mr-2 size-4" />
                                    Borrow This Book
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-12 flex-1 rounded-lg border-[#d1ddd3] bg-[#e8ede9] text-sm font-semibold text-[#234b3c] hover:bg-[#dce8df]">
                                    <BookOpenCheck className="mr-2 size-4" />
                                    Save to List
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    aria-label="Share this book"
                                    title="Share this book"
                                    className="size-12 shrink-0 rounded-lg border-[#e5e0d8] bg-white text-[#234b3c] hover:bg-[#f0eee8]">
                                    <Share2 className="size-4" />
                                </Button>
                            </div>
                        </div>

                        <section className="pt-1">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <h2 className="font-[Literata] text-2xl font-semibold text-[#252d29]">
                                    About This Book
                                </h2>
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#68736c]">
                                    {bookDetails.category}
                                </span>
                            </div>
                            <Separator className="mb-5 bg-[#e9e4da]" />
                            <p className="whitespace-pre-line text-[15px] leading-8 text-[#525f58]">
                                {bookDetails.description}
                            </p>
                        </section>

                        <div>
                            <Link href="/books"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#234b3c] transition-colors hover:text-[#c97959]">
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