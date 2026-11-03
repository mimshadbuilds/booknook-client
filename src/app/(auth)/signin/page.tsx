
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    BookOpen,
    Library,
    LockKeyhole,
    Mail,
    UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        setIsSubmitting(true);

        const { data, error } = await authClient.signIn.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || "Sign in failed. Please check your credentials.");
            return;
        }

        if (data) {
            toast.success("Welcome back to BookNook!");
            router.push("/");
            router.refresh();
        }

        setIsSubmitting(false);
    };

    const handleGoogleSignIn = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            toast.error("Google sign in failed. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-[#F7F5EF] px-4 py-6 sm:px-6 lg:py-10">
            <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[0.82fr_1.18fr]">
                <section className="flex h-full flex-col rounded-xl bg-[#F0EFE8] p-6 sm:p-8">
                    <div>
                        <Link href="/"
                            className="inline-flex items-center gap-2 text-2xl font-semibold text-[#234B3C]">
                            <BookOpen size={26} />
                            BookNook
                        </Link>

                        <div className="mt-10">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCE8DF] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#234B3C]">
                                <BookOpen size={12} />
                                Community fellowship
                            </span>

                            <h1 className="mt-4 max-w-sm font-serif text-3xl leading-tight text-[#234B3C] sm:text-4xl">
                                Welcome back to your reading community.
                            </h1>

                            <p className="mt-3 max-w-sm font-serif text-sm leading-relaxed text-[#525F58]">
                                Your next chapter starts here. Reconnect with
                                your neighborhood library and the stories you love.
                            </p>
                        </div>
                    </div>

                    <div className="mt-7 space-y-3">
                        <div className="flex gap-3 rounded-lg bg-white p-4">
                            <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#234B3C] text-white">
                                <BookOpen size={19} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-[#252D29]">
                                    Your Reading Shelf
                                </h3>
                                <p className="mt-1 text-xs leading-relaxed text-[#68736C]">
                                    Pick up where you left off and discover
                                    books waiting for you.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 rounded-lg bg-white p-4">
                            <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#85452D] text-white">
                                <UserRound size={19} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-[#252D29]">
                                    Your Community
                                </h3>
                                <p className="mt-1 text-xs leading-relaxed text-[#68736C]">
                                    Stay connected with fellow readers and
                                    your local book-sharing network.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 rounded-lg bg-white p-4">
                            <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#234B3C] text-white">
                                <Library size={19} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-[#252D29]">
                                    Your Borrowing Activity
                                </h3>
                                <p className="mt-1 text-xs leading-relaxed text-[#68736C]">
                                    Keep track of your borrowed books and
                                    manage your reading activity.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-7">
                        <div className="rounded-lg bg-[#E4E2DA] p-5">
                            <p className="font-serif text-base italic leading-relaxed text-[#252D29]">
                                “A book is a gift you can open again and again.”
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="grid size-9 place-items-center rounded-full bg-[#234B3C] text-white">
                                    <BookOpen size={17} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[#234B3C]">
                                        BookNook
                                    </p>
                                    <p className="text-[10px] text-[#68736C]">
                                        A community of readers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="space-y-3">
                    <section className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-8">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#85452D]">
                                Member access
                            </p>
                            <h2 className="mt-1 font-serif text-2xl text-[#234B3C] sm:text-3xl">
                                Welcome back
                            </h2>
                            <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#68736C]">
                                Sign in to access your library card, manage
                                your borrowed books, and continue exploring.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <label
                                        htmlFor="email"
                                        className="text-xs font-medium text-[#252D29]">
                                        Email Address <span className="text-[#85452D]">*</span>
                                    </label>
                                    <span className="hidden text-[9px] text-[#68736C] sm:block">
                                        Your registered email
                                    </span>
                                </div>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#68736C]" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className="h-11 rounded-lg border-[#E5E0D8] pl-10 text-sm shadow-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <label
                                        htmlFor="password"
                                        className="text-xs font-medium text-[#252D29]"
                                    >
                                        Password <span className="text-[#85452D]">*</span>
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-[10px] font-medium text-[#234B3C] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#68736C]" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        className="h-11 rounded-lg border-[#E5E0D8] pl-10 text-sm shadow-none"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-11 w-full rounded-md bg-[#234B3C] text-xs font-medium text-white hover:bg-[#193B2E]">
                                <BookOpen className="mr-2 size-4" />
                                {isSubmitting ? "Signing in..." : "Sign In to BookNook"}
                                {!isSubmitting && <ArrowRight className="ml-2 size-4" />}
                            </Button>
                        </form>

                        <div className="my-5 flex items-center gap-3">
                            <Separator className="flex-1" />
                            <span className="text-[9px] font-medium uppercase text-[#68736C]">
                                Or sign in with
                            </span>
                            <Separator className="flex-1" />
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleSignIn}
                            className="h-11 w-full rounded-md border-0 bg-[#EAE8E1] text-xs font-medium text-[#252D29] hover:bg-[#E1DFD7]"
                        >
                            <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
                                <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z" />
                                <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z" />
                                <path fill="#FBBC05" d="M12.6 27.5a12 12 0 0 1 0-7v-5.3H5.8a20 20 0 0 0 0 17.6l6.8-5.3Z" />
                                <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.2l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z" />
                            </svg>
                            Continue with Google
                        </Button>

                        <p className="mt-6 text-center text-xs text-[#68736C]">
                            New to BookNook?{" "}
                            <Link
                                href="/signup"
                                className="font-semibold text-[#234B3C] hover:underline"
                            >
                                Create a library account →
                            </Link>
                        </p>
                    </section>

                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { icon: "♧", title: "No Late Fines" },
                            { icon: "↔", title: "Easy Renewals" },
                            { icon: "♧", title: "Community Driven" },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center justify-center gap-1 rounded-md bg-[#F0EFE8] px-2 py-3 text-center"
                            >
                                <span className="text-sm text-[#234B3C]">
                                    {item.icon}
                                </span>
                                <span className="text-[9px] font-medium text-[#525F58]">
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
