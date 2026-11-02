"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteBookDialog = ({bookId, bookTitle} : {bookId: string; bookTitle: string}) => {
        const router = useRouter();
        const [isDelete, setIsDelete] = useState(false);

        const handleDeleteBook = async () => {
            setIsDelete(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
                    method: "DELETE",
                }); 

            const result = await res.json();
                if(!res.ok) {
                    throw new Error( result.message || "Failed to delete book.");
                }

                toast.success("Book deleted successfully!");
                router.refresh();
            } catch(error) {
                console.error("Error deleting book:", error);
                toast.error("Failed to delete book.");
            } finally {
                setIsDelete(false);
            }
        }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={
                    <Button type="button"
                        variant="outline"
                        className="h-9 rounded-lg border-[#f0d5c7] px-3 text-sm text-[#a45535] hover:bg-[#f8ede7] hover:text-[#a45535]">
                        <Trash2 className="size-4" />
                        Delete
                    </Button>
                }
            />

            <AlertDialogContent className="rounded-2xl border-[#e5e0d8] bg-[#fbf9f3]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-[Literata] text-xl text-[#252d29]">
                        Are you sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-[#68736c]">
                        This will permanently delete{" "}
                        <span className="font-semibold text-[#252d29]">
                            {bookTitle}
                        </span>{" "}
                        from the library. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isDelete}
                        className="rounded-lg border-[#e5e0d8]">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isDelete}
                        onClick={handleDeleteBook}
                        className="rounded-lg bg-[#a45535] text-white hover:bg-[#8e452b]">
                        {isDelete ? "Deleting..." : "Delete Book"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteBookDialog;
