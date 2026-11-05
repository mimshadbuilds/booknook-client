
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    BookOpen,
    Image as ImageIcon,
    LockKeyhole,
    Mail,
    Pencil,
    Save,
    UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type ProfileUser = {
    name: string;
    email: string;
    image?: string | null;
};

export default function ProfilePanel({ user }: { user: ProfileUser }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [image, setImage] = useState(user.image ?? "");
    const [isSaving, setIsSaving] = useState(false);

    const initials = user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        setIsSaving(true);

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
                ...(image.trim() ? { image: image.trim() } : {}),
            });

            if (error) {
                toast.error(error.message || "Unable to update your profile.");
                return;
            }

            toast.success("Profile updated successfully.");
            setIsOpen(false);
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDialogChange = (open: boolean) => {
        setIsOpen(open);

        if (!open) {
            setName(user.name);
            setImage(user.image ?? "");
        }
    };

    return (
        <main className="min-h-screen bg-[#F7F5EF] dark:bg-[#17251f]">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#234B3C] dark:text-[#dce8df] transition hover:text-[#85452D] dark:hover:text-[#e5a184]"
                >
                    <ArrowLeft size={14} />
                    Back to Library Catalog
                </Link>

                <section className="mx-auto max-w-xl">
                    <div className="overflow-hidden rounded-xl bg-white dark:bg-[#202f27] shadow-sm">
                        <div className="relative flex h-28 items-center justify-center bg-gradient-to-r from-[#E9E8E0] to-[#DCE8DF] dark:from-[#26382e] dark:to-[#314b3b]">
                            <span className="absolute right-5 top-4 flex items-center gap-1 text-[9px] uppercase tracking-wide text-[#68736C] dark:text-[#aab8ae]">
                                <LockKeyhole size={10} />
                                Community patron
                            </span>

                            <Avatar className="absolute -bottom-9 size-20 border-4 border-white dark:border-[#202f27] shadow-sm">
                                <AvatarImage
                                    src={user.image ?? undefined}
                                    alt={user.name}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-[#234B3C] text-xl text-white dark:bg-[#314b3b]">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="px-6 pb-8 pt-12 text-center">
                            <h1 className="font-serif text-3xl font-semibold text-[#252D29] dark:text-[#f0f2ed]">
                                {user.name}
                            </h1>

                            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#DCE8DF] dark:bg-[#314b3b] px-3 py-1 text-[10px] font-medium text-[#234B3C] dark:text-[#dce8df]">
                                <span className="size-1.5 rounded-full bg-[#234B3C] dark:bg-[#dce8df]" />
                                BookNook Community Patron
                            </div>

                            <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#F3F2EC] dark:bg-[#26382e] px-3 py-2 text-xs text-[#525F58] dark:text-[#aab8ae]">
                                <Mail size={13} />
                                <span className="break-all">{user.email}</span>
                            </div>

                            <div className="mx-auto my-6 max-w-32">
                                <Separator />
                            </div>

                            <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                <Button
                                    onClick={() => setIsOpen(true)}
                                    className="h-10 bg-[#234B3C] text-xs text-white hover:bg-[#193B2E] dark:bg-[#dce8df] dark:text-[#17251f] dark:hover:bg-[#c6d6c9]"
                                >
                                    <Pencil size={14} className="mr-2" />
                                    Edit Profile
                                </Button>

                                <Link
                                    href="/"
                                    className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[#E5E0D8] dark:border-[#34443b] bg-[#F0EFE8] dark:bg-[#26382e] px-4 text-xs font-medium text-[#252D29] dark:text-[#f0f2ed] transition-colors hover:bg-[#E7E5DD] dark:hover:bg-[#314b3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234B3C] dark:focus-visible:ring-[#dce8df]"
                                >
                                    <BookOpen size={14} />
                                    Return to Home
                                </Link>
                            </div>
                        </div>
                    </div>

                    <p className="mt-5 text-center text-[11px] text-[#68736C] dark:text-[#aab8ae]">
                        Your BookNook community account is ready.
                    </p>
                </section>
            </div>

            <Dialog open={isOpen} onOpenChange={handleDialogChange}>
                <DialogContent className="max-h-[90vh] overflow-y-auto border-0 border-t-4 border-t-[#234B3C] dark:border-t-[#dce8df] bg-white dark:bg-[#202f27] p-0 sm:max-w-lg">
                    <div className="p-6 sm:p-8">
                        <DialogHeader className="text-left">
                            <p className="text-[9px] font-semibold uppercase tracking-widest text-[#68736C] dark:text-[#aab8ae]">
                                Patron records
                            </p>
                            <DialogTitle className="font-serif text-3xl text-[#252D29] dark:text-[#f0f2ed]">
                                Edit Profile
                            </DialogTitle>
                            <DialogDescription className="text-xs leading-relaxed text-[#68736C] dark:text-[#aab8ae]">
                                Update your personal details and community
                                library profile information.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSave} className="mt-7 space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-semibold uppercase tracking-wide text-[#525F58] dark:text-[#aab8ae]">
                                        Profile Photo
                                    </label>
                                    <span className="text-[9px] text-[#68736C] dark:text-[#aab8ae]">
                                        Live preview
                                    </span>
                                </div>

                                <div className="rounded-lg bg-[#F3F2EC] dark:bg-[#26382e] p-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-14 shrink-0">
                                            <AvatarImage
                                                src={image || undefined}
                                                alt={name}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="bg-[#234B3C] text-white dark:bg-[#314b3b]">
                                                {name
                                                    .split(" ")
                                                    .map((part) => part[0])
                                                    .join("")
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="relative flex-1">
                                            <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#68736C] dark:text-[#aab8ae]" />
                                            <Input
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                                type="url"
                                                placeholder="https://example.com/photo.jpg"
                                                className="h-10 border-[#E5E0D8] dark:border-[#3b5044] bg-white dark:bg-[#202f27] pl-9 text-xs shadow-none"
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-[10px] text-[#68736C] dark:text-[#aab8ae]">
                                        Enter a direct image URL. A square image is recommended.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="profile-name"
                                    className="text-[10px] font-semibold uppercase tracking-wide text-[#525F58] dark:text-[#aab8ae]"
                                >
                                    Full Name <span className="text-[#85452D] dark:text-[#e5a184]">*</span>
                                </label>
                                <div className="relative">
                                    <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#68736C] dark:text-[#aab8ae]" />
                                    <Input
                                        id="profile-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="h-10 border-[#E5E0D8] dark:border-[#3b5044] pl-9 text-xs shadow-none"
                                    />
                                </div>
                                <p className="text-[10px] text-[#68736C] dark:text-[#aab8ae]">
                                    This name appears throughout your BookNook account.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-semibold uppercase tracking-wide text-[#525F58] dark:text-[#aab8ae]">
                                        Email Address
                                    </label>
                                    <span className="rounded-full bg-[#F0EFE8] dark:bg-[#26382e] px-2 py-0.5 text-[9px] text-[#68736C] dark:text-[#aab8ae]">
                                        Read only
                                    </span>
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#68736C] dark:text-[#aab8ae]" />
                                    <Input
                                        value={user.email}
                                        readOnly
                                        disabled
                                        className="h-10 border-[#E5E0D8] dark:border-[#3b5044] bg-[#F3F2EC] dark:bg-[#26382e] pl-9 text-xs shadow-none"
                                    />
                                    <LockKeyhole className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-[#68736C] dark:text-[#aab8ae]" />
                                </div>
                                <p className="text-[10px] leading-relaxed text-[#68736C] dark:text-[#aab8ae]">
                                    Your email is linked to your account and cannot
                                    be changed from this form.
                                </p>
                            </div>

                            <DialogFooter className="flex flex-row justify-end gap-2 border-t border-[#E5E0D8] dark:border-[#34443b] pt-5">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    disabled={isSaving}
                                    className="h-10 border-[#E5E0D8] dark:border-[#34443b] bg-[#F0EFE8] dark:bg-[#26382e] text-xs text-[#525F58] dark:text-[#aab8ae]"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="h-10 bg-[#234B3C] text-xs text-white hover:bg-[#193B2E] dark:bg-[#dce8df] dark:text-[#17251f] dark:hover:bg-[#c6d6c9]"
                                >
                                    {isSaving ? (
                                        "Saving..."
                                    ) : (
                                        <>
                                            <Save size={14} className="mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    );
}
