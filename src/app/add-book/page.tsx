'use client'
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Check, ImagePlus, LoaderCircle, Minus, Plus, UserRound, } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

const categories = [ "Fiction", "Science", "History", "Psychology", "Romance", "Adventure", "Programming", "Kids", "Others" ];

const AddBookPage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [category, setCategory] = useState("");
    const [copies, setCopies] = useState(1);
    const [description, setDescription] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            ...Object.fromEntries(formData.entries()),
            copies: Number(formData.get("copies")),
            addedByName: user?.name ?? null,
            addedByEmail: user?.email ?? null,
        };

        try {
            setIsSubmitting(true);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json().catch(() => ({}));

            if (res.ok) {
                toast.success("Book successfully added.");
                router.push("/books");
                return;
            }

            toast.error(
                result?.msg || result?.message || "Failed to add book."
            );
        } catch (err) {
            console.error("Error adding book:", err);
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleClearForm() {
        const form = document.getElementById(
            "add-book-form"
        ) as HTMLFormElement | null;

        form?.reset();

        setCategory("");
        setCopies(1);
        setDescription("");
        toast.success("Form cleared.");
    }

    return (
        <div className="min-h-screen bg-[#fbf9f3] pb-16 pt-10 text-[#252d29]">
            <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="mb-5 flex items-center gap-2 text-sm text-[#68736c]">
                        <Link
                            href="/"
                            className="transition-colors hover:text-[#234b3c]">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="font-medium text-[#234b3c]">
                            Add a book
                        </span>
                    </div>
                    <Link href="/books"
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#59685d] transition-colors hover:text-[#234b3c]">
                        <ArrowLeft className="size-4" />
                        Back to books
                    </Link>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c97959]">
                                Grow the collection
                            </p>
                            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#234b3c] sm:text-4xl">
                                Share a good read.
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#68736c] sm:text-base">
                                Add a book to the BookNook collection and help
                                your community discover its next favorite story.
                            </p>
                        </div>
                        <div className="hidden items-center gap-2 rounded-xl border border-[#e5e0d8] bg-white/70 px-4 py-3 sm:flex">
                            <BookOpen className="size-5 text-[#234b3c]" />
                            <div>
                                <p className="text-sm font-semibold text-[#234b3c]">
                                    Community library
                                </p>
                                <p className="text-xs text-[#68736c]">
                                    Every book finds a reader
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <form id="add-book-form"
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-6">
                        <section className="rounded-2xl border border-[#e5e0d8] bg-white p-5 shadow-sm sm:p-8">
                            <div className="mb-7 flex items-start gap-3">
                                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#dce8df] text-[#234b3c]">
                                    <BookOpen className="size-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#234b3c]">
                                        Book information
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-[#68736c]">
                                        Provide the essential details so readers
                                        can discover your book.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="title"
                                        className="text-sm font-semibold">
                                        Book title
                                        <span className="ml-1 text-[#c97959]">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g. The Great Gatsby"
                                        required
                                        maxLength={150}
                                        className="h-12 rounded-lg border-[#dedfd8] bg-[#fdfcf9] px-4 focus-visible:border-[#234b3c] focus-visible:ring-[#234b3c]/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="author"
                                        className="text-sm font-semibold">
                                        Author
                                        <span className="ml-1 text-[#c97959]">
                                        *
                                        </span>
                                    </Label>
                                    <Input
                                        id="author"
                                        name="author"
                                        placeholder="Enter the author's name"
                                        required
                                        maxLength={120}
                                        className="h-12 rounded-lg border-[#dedfd8] bg-[#fdfcf9] px-4 focus-visible:border-[#234b3c] focus-visible:ring-[#234b3c]/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="category"
                                        className="text-sm font-semibold">
                                        Category
                                        <span className="ml-1 text-[#c97959]">
                                        *
                                        </span>
                                    </Label>

                                    <Select
                                        value={category}
                                        onValueChange={(value) => setCategory(value ?? "")}
                                        required>
                                        <SelectTrigger id="category"
                                            className="h-12 w-full rounded-lg border-[#dedfd8] bg-[#fdfcf9] px-4 focus:ring-[#234b3c]/20">
                                            <SelectValue placeholder="Choose a book category" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {categories.map((item) => (
                                                <SelectItem
                                                    key={item}
                                                    value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input
                                        type="hidden"
                                        name="category"
                                        value={category}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-3">
                                        <Label
                                            htmlFor="description"
                                            className="text-sm font-semibold">
                                            Book description
                                            <span className="ml-1 text-[#c97959]">
                                                *
                                            </span>
                                        </Label>
                                        <span className="text-xs text-[#8a938c]">
                                            {description.length}/600
                                        </span>
                                    </div>
                                    <Textarea id="description"
                                        name="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        placeholder="What is this book about? Write a short description to help readers discover it."
                                        required
                                        maxLength={600}
                                        rows={6}
                                        className="min-h-36 resize-y rounded-lg border-[#dedfd8] bg-[#fdfcf9] px-4 py-3 leading-7 focus-visible:border-[#234b3c] focus-visible:ring-[#234b3c]/20"
                                    />
                                </div>
                                <Separator className="bg-[#ece9e1]" />
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="bookImage"
                                        className="text-sm font-semibold">
                                        Book cover image URL
                                        <span className="ml-1 text-[#c97959]">
                                            *
                                        </span>
                                    </Label>
                                    <p className="text-xs leading-5 text-[#68736c]">
                                        Paste a direct URL to the book cover
                                        image.
                                    </p>
                                    <div className="relative">
                                        <ImagePlus className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#879088]" />
                                        <Input
                                            id="bookImage"
                                            name="bookImage"
                                            type="url"
                                            placeholder="https://example.com/book-cover.jpg"
                                            required
                                            className="h-12 rounded-lg border-[#dedfd8] bg-[#fdfcf9] pl-10 pr-4 focus-visible:border-[#234b3c] focus-visible:ring-[#234b3c]/20"
                                        />
                                    </div>
                                </div>
                                <Separator className="bg-[#ece9e1]" />
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="copies"
                                        className="text-sm font-semibold">
                                        Number of copies
                                    </Label>
                                    <p className="text-xs leading-5 text-[#68736c]">
                                        How many copies are available for
                                        community members to borrow?
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center rounded-lg border border-[#dedfd8] bg-[#fdfcf9]">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                disabled={copies <= 1}
                                                onClick={() =>
                                                    setCopies((value) =>
                                                        Math.max(1, value - 1)
                                                    )
                                                }
                                                aria-label="Decrease copies"
                                                className="size-11 rounded-r-none text-[#234b3c] hover:bg-[#dce8df]">
                                                <Minus className="size-4" />
                                            </Button>
                                            <span className="min-w-12 text-center text-sm font-bold text-[#234b3c]">
                                                {copies}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                disabled={copies >= 10}
                                                onClick={() =>
                                                    setCopies((value) =>
                                                        Math.min(10, value + 1)
                                                    )
                                                }
                                                aria-label="Increase copies"
                                                className="size-11 rounded-l-none text-[#234b3c] hover:bg-[#dce8df]">
                                                <Plus className="size-4" />
                                            </Button>
                                        </div>
                                        <span className="text-xs text-[#68736c]">
                                            {copies}{" "}
                                            {copies === 1 ? "copy" : "copies"}{" "}
                                            available
                                        </span>
                                    </div>
                                    <input
                                        type="hidden"
                                        name="copies"
                                        value={copies}
                                    />
                                </div>
                                <div className="rounded-xl bg-[#ebe9e2] p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-medium text-[#252d29]">
                                    Contributor Record
                                </h3>

                                <span className="rounded-full bg-white px-3 py-1 text-xs text-[#68736c]">
                                    Locked to Current Session
                                </span>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm text-[#68736c]">
                                        Logged-in Contributor
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.name ?? ""}
                                        readOnly
                                        className="h-11 w-full rounded-lg border border-[#e0ded6] bg-white px-3 text-sm text-[#252d29] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-[#68736c]">
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email ?? ""}
                                        readOnly
                                        className="h-11 w-full rounded-lg border border-[#e0ded6] bg-white px-3 text-sm text-[#252d29] outline-none"
                                    />
                                </div>
                            </div>

                            <p className="mt-3 text-xs leading-5 text-[#68736c]">
                                Your contributor information is taken from your logged-in account.
                            </p>
                        </div>
                            </div>
                        </section>
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleClearForm}
                                disabled={isSubmitting}
                                className="rounded-lg text-[#68736c] hover:bg-[#f0eee8] hover:text-[#252d29]">
                                Clear form
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !category}
                                className="h-12 rounded-lg bg-[#234b3c] px-7 font-semibold text-white shadow-sm transition-colors hover:bg-[#1b3b2f] disabled:cursor-not-allowed disabled:opacity-70">
                                {isSubmitting ? (
                                    <>
                                        <LoaderCircle className="mr-2 size-4 animate-spin" />
                                        Adding book...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 size-4" />
                                        Add book to collection
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <aside className="space-y-5 lg:sticky lg:top-28">
                        <section className="overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-sm">
                            <div className="bg-[#234b3c] px-5 py-5 text-white">
                                <div className="mb-3 grid size-10 place-items-center rounded-xl bg-white/10">
                                    <UserRound className="size-5" />
                                </div>
                                <h2 className="font-heading text-lg font-bold">
                                    Your contribution
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-white/75">
                                    Every book you add creates a new
                                    opportunity for someone to discover a
                                    story.
                                </p>
                            </div>
                            <div className="space-y-4 p-5">
                                <div className="flex items-start gap-3">
                                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#dce8df] text-[#234b3c]">
                                        <Check className="size-4" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#234b3c]">
                                            Help readers discover
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-[#68736c]">
                                            Clear details make books easier
                                            to find.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f6e5dc] text-[#a85e43]">
                                        <ImagePlus className="size-4" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#234b3c]">
                                            Choose a clear cover
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-[#68736c]">
                                            A direct image URL helps readers
                                            recognize the book.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#dce8df] text-[#234b3c]">
                                        <BookOpen className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#234b3c]">
                                            Grow the collection
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-[#68736c]">
                                            More books mean more shared
                                            reading experiences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="rounded-2xl border border-[#e5e0d8] bg-[#f2f0e8] p-5">
                            <h2 className="font-heading text-base font-bold text-[#234b3c]">
                                Before you submit
                            </h2>

                            <ul className="mt-4 space-y-3">
                                {[
                                    "Check the book title and author's name.",
                                    "Choose the correct category.",
                                    "Write a helpful description.",
                                    "Make sure the image URL is correct.",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5 text-sm leading-5 text-[#59685d]">
                                        <Check className="mt-0.5 size-4 shrink-0 text-[#234b3c]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <div className="rounded-xl border border-[#e5e0d8] bg-white/70 p-4">
                            <div className="flex items-start gap-3">
                                <BookOpen className="mt-0.5 size-5 shrink-0 text-[#c97959]" />
                                <p className="text-xs leading-6 text-[#68736c]">
                                    By adding a book, you help make reading
                                    more accessible and bring your community
                                    closer together.
                                </p>
                            </div>
                        </div>
                    </aside>
                </form>
            </div>
        </div>
    );
};

export default AddBookPage;