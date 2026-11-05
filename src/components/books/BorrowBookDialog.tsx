"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen, CalendarDays, CheckCircle2, Clock, HandHeart, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface BorrowBookDialogProps {
    book: {
        _id: string;
        title: string;
        author: string;
        category: string;
        bookImage: string;
        copies: number;
    };
}

const BorrowBookDialog = ({ book }: BorrowBookDialogProps) => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [open, setOpen] = useState(false);
    const [pledged, setPledged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const user = session?.user;

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 21);

    const formatDate = (date: Date) =>
        date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    const handleBorrow = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user?.id) {
            toast.error("Please sign in to borrow this book.");
            return;
        }

        if (book.copies < 1) {
            toast.error("This book is currently unavailable.");
            return;
        }

        if (!pledged) {
            toast.error("Please accept the community borrowing pledge.");
            return;
        }

    try {
        setIsSubmitting(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookId: book._id,
                    userId: user.id,
                }),
            },
        );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Unable to borrow this book.",
            );
        }

            toast.success("Book borrowed successfully.");
            setOpen(false);
            setPledged(false);
            router.refresh();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.",);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(value) => {
                if (!isSubmitting) setOpen(value);
            }}>
            <DialogTrigger
                disabled={book.copies < 1 || isPending}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#234b3c] px-5 text-sm font-semibold text-white transition hover:bg-[#1b3b2f] disabled:cursor-not-allowed disabled:bg-[#aab5ad] dark:bg-[#dce8df] dark:text-[#17251f] dark:hover:bg-[#c6d6c9] dark:disabled:bg-[#3b5044] dark:disabled:text-[#879088]">
                <BookOpen className="size-4" />
                {book.copies > 0 ? "Borrow This Book" : "Not Available"}
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[560px] overflow-y-auto rounded-2xl border border-[#e5e0d8] bg-[#fbf9f3] p-0 text-[#252d29] dark:border-[#34443b] dark:bg-[#202f27] dark:text-[#f0f2ed] sm:max-w-[560px]">
                <div className="border-b border-[#e5e0d8] bg-[#f5f3ed] px-6 py-5 dark:border-[#34443b] dark:bg-[#26382e] sm:px-7">
                    <DialogHeader className="gap-1 text-left">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c97959] dark:text-[#e5a184]">
                            BookNook Community Library
                        </p>
                        <DialogTitle className="font-[Literata] text-2xl font-semibold text-[#234b3c] dark:text-[#dce8df]">
                            Confirm Your Borrowing
                        </DialogTitle>
                        <DialogDescription className="text-sm leading-6 text-[#68736c] dark:text-[#aab8ae]">
                            Review the borrowing details before confirming your request.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleBorrow} className="space-y-5 p-6 sm:p-7">
                    <div className="flex gap-4 rounded-xl border border-[#e5e0d8] bg-white p-4 dark:border-[#34443b] dark:bg-[#26382e]">
                        <div className="relative h-[104px] w-[70px] shrink-0 overflow-hidden rounded-md bg-[#f0eee8] dark:bg-[#1d2b23]">
                            <Image
                                src={book.bookImage}
                                alt='Book Cover'
                                fill
                                sizes="70px"
                                className="object-cover"
                            />
                        </div>
                        <div className="min-w-0 py-1">
                            <span className="inline-block rounded-full bg-[#e8ede9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#234b3c] dark:bg-[#314b3b] dark:text-[#dce8df]">
                                {book.category}
                            </span>
                            <h3 className="mt-2 line-clamp-2 font-[Literata] text-base font-semibold leading-5 text-[#252d29] dark:text-[#f0f2ed]">
                                {book.title}
                            </h3>
                            <p className="mt-1 text-sm text-[#68736c] dark:text-[#aab8ae]">
                                {book.author}
                            </p>
                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#234b3c] dark:text-[#dce8df]">
                                <CheckCircle2 className="size-3.5" />
                                {book.copies} {book.copies === 1 ? "copy" : "copies"} available
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-[#f0eee8] p-3 dark:bg-[#26382e]">
                            <div className="flex items-center gap-2 text-xs text-[#68736c] dark:text-[#aab8ae]">
                                <Clock className="size-4 text-[#234b3c] dark:text-[#dce8df]" />
                                Borrowing Period
                            </div>
                            <p className="mt-2 text-sm font-semibold text-[#252d29] dark:text-[#f0f2ed]">
                                21 Calendar Days
                            </p>
                        </div>
                        <div className="rounded-lg bg-[#f0eee8] p-3 dark:bg-[#26382e]">
                            <div className="flex items-center gap-2 text-xs text-[#68736c] dark:text-[#aab8ae]">
                                <CalendarDays className="size-4 text-[#234b3c] dark:text-[#dce8df]" />
                                Return By
                            </div>
                            <p className="mt-2 text-sm font-semibold text-[#252d29] dark:text-[#f0f2ed]">
                                {formatDate(returnDate)}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#dce8df] bg-[#edf3ee] p-4 dark:border-[#314b3b] dark:bg-[#26382e]">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#234b3c] dark:text-[#dce8df]">
                            <HandHeart className="size-4" />
                            Community Borrowing Pledge
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[#59685d] dark:text-[#aab8ae]">
                            I will take good care of this book, respect the borrowing period, and return it on time so another reader can enjoy it.
                        </p>
                        <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-xs font-medium leading-5 text-[#252d29] dark:text-[#f0f2ed]">
                            <input
                                type="checkbox"
                                checked={pledged}
                                onChange={(event) => setPledged(event.target.checked)}
                                className="mt-0.5 size-4 shrink-0 accent-[#234b3c]"
                            />
                            I agree to the community borrowing pledge.
                        </label>
                    </div>

                    <div className="space-y-3 border-t border-[#e5e0d8] pt-5 dark:border-[#34443b]">
                        <div>
                            <p className="text-sm font-semibold text-[#234b3c] dark:text-[#dce8df]">
                                Borrower Information
                            </p>
                            <p className="mt-1 text-xs text-[#68736c] dark:text-[#aab8ae]">
                                Your account details will be used for this borrowing record.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="borrower-name" className="text-xs font-semibold text-[#525f58] dark:text-[#aab8ae]">
                                    User Name
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="borrower-name"
                                        value={user?.name ?? ""}
                                        readOnly
                                        disabled={isPending}
                                        className="h-10 border-[#e5e0d8] bg-[#f0eee8] pr-9 text-sm text-[#525f58] shadow-none dark:border-[#3b5044] dark:bg-[#1d2b23] dark:text-[#aab8ae]"
                                    />
                                    <LockKeyhole className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-[#89928c] dark:text-[#879088]" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="borrower-email" className="text-xs font-semibold text-[#525f58] dark:text-[#aab8ae]">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="borrower-email"
                                        type="email"
                                        value={user?.email ?? ""}
                                        readOnly
                                        disabled={isPending}
                                        className="h-10 border-[#e5e0d8] bg-[#f0eee8] pr-9 text-sm text-[#525f58] shadow-none dark:border-[#3b5044] dark:bg-[#1d2b23] dark:text-[#aab8ae]"
                                    />
                                    <LockKeyhole className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-[#89928c] dark:text-[#879088]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-2 border-t border-[#e5e0d8] pt-4 dark:border-[#34443b] sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                            className="h-10 rounded-lg border-[#e5e0d8] bg-white px-5 text-sm text-[#525f58] hover:bg-[#f5f3ed] dark:border-[#34443b] dark:bg-[#26382e] dark:text-[#aab8ae] dark:hover:bg-[#314b3b]">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isPending || !user || !pledged || book.copies < 1}
                            className="h-10 rounded-lg bg-[#234b3c] px-5 text-sm font-semibold text-white hover:bg-[#1b3b2f] dark:bg-[#dce8df] dark:text-[#17251f] dark:hover:bg-[#c6d6c9]">
                            {isSubmitting ? "Confirming..." : "Confirm Borrow"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BorrowBookDialog;
