"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    BookOpen,
    Image as ImageIcon,
    Mail,
    MapIcon,
    UserRound,
} from "lucide-react";
import {
    Form,
    TextField,
    Input as HeroInput,
    Label,
    FieldError,
} from "@heroui/react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        setIsSubmitting(false)

            const { data, error } = await authClient.signUp.email({
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                image: (formData.get("image") as string) || undefined,
                callbackURL: "/",
            });

        if (error) {
            toast.error(error.message || "Sign up failed. Please try again.");
            return;
        }

        if (data) {
            toast.success( "Sign Up was Successful!" );
            router.push('/');
        }

    }
        const handleGoogleSignUp = async() => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || "Google sign-up failed.");
        }
    }
    

return (
    <main className="min-h-screen bg-[#F7F5EF] px-4 py-6 sm:px-6 lg:py-10">
        <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            <section className="flex h-full flex-col rounded-xl bg-[#F0EFE8] p-6 sm:p-8">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#DCE8DF] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#234B3C]">
                        <BookOpen size={12} />
                        Community fellowship
                    </span>

                    <h1 className="mt-4 max-w-sm font-serif text-3xl leading-tight text-[#234B3C] sm:text-4xl">
                        Become a BookNook Membar
                    </h1>

                    <p className="mt-3 max-w-sm font-serif text-sm leading-relaxed text-[#525F58]">
                        A trust-based community lending network where
                        neighborly stewardship keeps literature circulating freely.
                    </p>
                </div>

                <div className="mt-7 space-y-3">
                    <div className="flex gap-3 rounded-lg bg-white p-4">
                        <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#234B3C] text-white">
                            <BookOpen size={19} />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-medium text-[#252D29]">
                                    Borrow Freely
                                </h3>
                                <span className="rounded-full bg-[#DCE8DF] px-2 py-0.5 text-[10px] text-[#234B3C]">
                                    21 Days
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-[#68736C]">
                                Generous 21-day loan periods with effortless extensions.
                                No punitive fines, simply gentle, neighborly reminders.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 rounded-lg bg-white p-4">
                        <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#85452D] text-white">
                            <UserRound size={19} />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-medium text-[#252D29]">
                                    Contribute & Preserve
                                </h3>
                                <span className="rounded-full bg-[#F8DDD0] px-2 py-0.5 text-[10px] text-[#85452D]">
                                    Stewardship
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-[#68736C]">
                                Donate extra copies from your shelves and retain
                                lifetime ownership records. Trace who reads your
                                personal book over the seasons.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 rounded-lg bg-white p-4">
                        <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#234B3C] text-white">
                            <MapIcon size={19} />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-medium text-[#252D29]">
                                    Neighborhood Kiosks
                                </h3>
                                <span className="rounded-full bg-[#DCE8DF] px-2 py-0.5 text-[10px] text-[#234B3C]">
                                    Local reading
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-[#68736C]">
                                Pick up and drop off books at local reading corners,
                                front-porch cabinets, and community book spaces.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 pt-7">
                    <div className="rounded-lg bg-[#E4E2DA] p-5">
                        <p className="font-serif text-base italic leading-relaxed text-[#252D29]">
                            “The simplest, warmest way to share good books
                            with the people living right on your block.”
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="grid size-9 place-items-center rounded-full bg-[#234B3C] text-white">
                                <UserRound size={17} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-[#234B3C]">
                                    Mimshad
                                </p>
                                <p className="text-[10px] text-[#68736C]">
                                    BookNook Member
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="space-y-3">
                <section className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-7 flex items-start justify-between gap-3">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#85452D]">
                                New member entry
                            </p>
                            <h2 className="mt-1 font-serif text-2xl text-[#234B3C] sm:text-3xl">
                                Create your account
                            </h2>
                            <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#68736C]">
                                Join your local BookNook collective in under a minute.
                                Create your account and become part of the reading community.
                            </p>
                        </div>

                        <span className="hidden shrink-0 rounded-sm bg-[#F0EFE8] px-2 py-1 text-[9px] font-medium text-[#525F58] sm:inline-flex">
                            <BookOpen size={11} className="mr-1" />
                            Member card ID: auto-issue
                        </span>
                    </div>

                    <Form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <label htmlFor="name" className="text-xs font-medium text-[#252D29]">
                                    Full Name <span className="text-[#85452D]">*</span>
                                </label>
                                <span className="hidden text-[9px] text-[#68736C] sm:block">
                                    As you would like it on your bookplate
                                </span>
                            </div>
                            <div className="relative">
                                <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#68736C]" />
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    required
                                    className="h-11 rounded-lg border-[#E5E0D8] pl-10 text-sm shadow-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <label htmlFor="email" className="text-xs font-medium text-[#252D29]">
                                    Email Address <span className="text-[#85452D]">*</span>
                                </label>
                                <span className="hidden text-[9px] text-[#68736C] sm:block">
                                    For due reminders only
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
                                <label htmlFor="image" className="text-xs font-medium text-[#252D29]">
                                    Profile Photo URL <span className="font-normal text-[#68736C]">(Optional)</span>
                                </label>
                                <span className="hidden text-[9px] text-[#234B3C] sm:block">
                                    ✦ Use sample avatar
                                </span>
                            </div>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#68736C]" />
                                <Input
                                    id="image"
                                    name="image"
                                    type="url"
                                    placeholder="https://images.example.com/patron.jpg"
                                    className="h-11 rounded-lg border-[#E5E0D8] pl-10 text-sm shadow-none"
                                />
                            </div>
                        </div>

                        <TextField
                            name="password"
                            type="password"
                            isRequired
                            className="flex flex-col gap-2"
                            validate={(value) => {
                                if (value.length < 6) {
                                    return "Password must be at least 6 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[a-z]/.test(value)) {
                                    return "Password must contain at least one lowercase letter";
                                }
                                return null;
                            }}>
                            <div className="flex items-center justify-between gap-2">
                                <Label className="text-xs font-medium text-[#252D29]">
                                     Password *
                                </Label>
                                <span className="text-[9px] text-[#68736C]">
                                    Security check
                                </span>
                            </div>
                            <HeroInput
                                placeholder="Create a password"
                                autoComplete="new-password"
                                className="h-11 rounded-lg border border-[#E5E0D8] px-3 text-sm shadow-none"
                            />
                            <FieldError />
                        </TextField>

                        <div className="rounded-md bg-[#F3F2EC] p-3">
                            <p className="mb-2 text-[9px] font-medium uppercase tracking-wide text-[#525F58]">
                                Circulation security requirements:
                            </p>
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-[#525F58]">
                                <span>○ 6+ characters</span>
                                <span>○ 1+ uppercase</span>
                                <span>○ 1+ lowercase</span>
                            </div>
                        </div>

                        <label className="flex items-start gap-2 text-[10px] leading-relaxed text-[#68736C]">
                            <input
                                type="checkbox"
                                required
                                className="mt-0.5 size-3.5 shrink-0 accent-[#234B3C]"
                            />
                            <span>
                                By registering, you agree to BookNook&apos;s{" "}
                                <Link href="/community-guidelines" className="font-medium text-[#234B3C] underline">
                                    Community Guidelines
                                </Link>{" "}
                                and circulation guidelines.
                            </span>
                        </label>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 w-full rounded-md bg-[#234B3C] text-xs font-medium text-white hover:bg-[#193B2E]">
                            <BookOpen className="mr-2 size-4" />
                            {isSubmitting ? "Creating account..." : "Create Library Account"}
                        </Button>
                    </Form>

                    <div className="my-4 flex items-center gap-3">
                        <Separator className="flex-1" />
                        <span className="text-[9px] font-medium uppercase text-[#68736C]">
                            Or sign up with
                        </span>
                        <Separator className="flex-1" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignUp}
                        className="h-11 w-full rounded-md border-0 bg-[#EAE8E1] text-xs font-medium text-[#252D29] hover:bg-[#E1DFD7]">
                        Continue with Google
                    </Button>

                    <p className="mt-5 text-center text-xs text-[#68736C]">
                        Already have a account?{" "}
                        <Link href="/sign-in"
                            className="font-semibold text-[#234B3C] hover:underline">
                            Log in →
                        </Link>
                    </p>
                </section>

                <div className="grid grid-cols-3 gap-2">
                    {[
                        { icon: "♧", title: "No Late Fines" },
                        { icon: "↔", title: "Instant Renewals" },
                        { icon: "♧", title: "Community Driven" },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col items-center justify-center gap-1 rounded-md bg-[#F0EFE8] px-2 py-3 text-center">
                            <span className="text-sm text-[#234B3C]">{item.icon}</span>
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