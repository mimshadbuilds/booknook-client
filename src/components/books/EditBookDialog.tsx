'use client'
import { FormEvent, useState } from 'react';
import { IBooks } from './BooksCard';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [ "Fiction", "Science", "History", "Psychology", "Romance", "Adventure", "Programming", "Kids", "Others" ];

const EditBookDialog = ({ book }: { book: IBooks }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleEditBook(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;  
        const formData = new FormData(form);

        const updatedData = {
            title: String(formData.get("title") ?? "").trim(),
            author: String(formData.get("author") ?? "").trim(),
            category: String(formData.get("category") ?? ""),
            description: String(formData.get("description") ?? "").trim(),
            bookImage: String(formData.get("bookImage") ?? "").trim(),
            copies: Number(formData.get("copies")),
        };
        setIsSubmitting(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        const result = await res.json();

        if(res.ok){
            toast.success("Book updated successfully!");
            setIsOpen(false);
            router.refresh();
        } else {
            toast.error("Failed to update book.");
        }
        setIsSubmitting(false);
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={
                    <Button type="button"
                        variant="outline"
                        className="h-9 rounded-lg border-[#d1ddd3] px-3 text-sm text-[#234b3c] hover:bg-[#e8ede9]">
                        <Pencil className="size-4" />
                        Edit
                    </Button>
                } />

            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-[#e5e0d8] bg-[#fbf9f3] sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="font-[Literata] text-2xl text-[#252d29]">
                        Edit Book
                    </DialogTitle>
                    <DialogDescription className="text-[#68736c]">
                        Update the book information below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleEditBook} className="space-y-4">
                    <div className="space-y-1.5">
                        <label htmlFor="title" className="text-sm font-medium">
                            Book Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            defaultValue={book.title}
                            required
                            className="h-11 w-full rounded-lg border border-[#d5cebe] bg-white px-3 text-sm outline-none focus:border-[#234b3c] focus:ring-2 focus:ring-[#234b3c]/15"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="author" className="text-sm font-medium">
                            Author Name
                        </label>
                        <input
                            id="author"
                            name="author"
                            defaultValue={book.author}
                            required
                            className="h-11 w-full rounded-lg border border-[#d5cebe] bg-white px-3 text-sm outline-none focus:border-[#234b3c] focus:ring-2 focus:ring-[#234b3c]/15"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="category" className="text-sm font-medium">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={book.category}
                            required
                            className="h-11 w-full rounded-lg border border-[#d5cebe] bg-white px-3 text-sm outline-none focus:border-[#234b3c] focus:ring-2 focus:ring-[#234b3c]/15">
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="bookImage" className="text-sm font-medium">
                            Book Image URL
                        </label>
                        <input
                            id="bookImage"
                            name="bookImage"
                            type="url"
                            defaultValue={book.image}
                            required
                            className="h-11 w-full rounded-lg border border-[#d5cebe] bg-white px-3 text-sm outline-none focus:border-[#234b3c] focus:ring-2 focus:ring-[#234b3c]/15"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="copies" className="text-sm font-medium">
                            Available Copies
                        </label>
                        <input
                            id="copies"
                            name="copies"
                            type="number"
                            min="0"
                            step="1"
                            defaultValue={book.copies}
                            required
                            className="h-11 w-full rounded-lg border border-[#d5cebe] bg-white px-3 text-sm outline-none focus:border-[#234b3c] focus:ring-2 focus:ring-[#234b3c]/15"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="description"
                            className="text-sm font-medium">
                            Short Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            // defaultValue={book.description}
                            required
                            rows={5}
                            className="w-full resize-y rounded-lg border border-[#d5cebe] bg-white px-3 py-2.5 text-sm leading-6 outline-none focus:border-[#234b3c] focus:ring-2 focus:ring-[#234b3c]/15"
                        />
                    </div>

                    <div className="flex flex-col-reverse justify-end gap-2 pt-2 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isSubmitting}
                            onClick={() => setIsOpen(false)}
                            className="h-11 rounded-lg border-[#e5e0d8] px-5">
                            <X className="size-4" />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 rounded-lg bg-[#234b3c] px-5 text-white hover:bg-[#1b3b2f]">
                            <Save className="size-4" />
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookDialog;