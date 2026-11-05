"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("Newsletter sign-up is not connected to a subscription service yet.");
    }

    return (
        <section className="w-full bg-[#fbf9f3] px-4 py-16 dark:bg-[#17251f] md:px-6 lg:px-12 lg:py-10">
            <div className="mx-auto grid max-w-[1320px] overflow-hidden rounded-2xl border border-[#e5e0d8] bg-[#f0eee8] dark:border-[#34443b] dark:bg-[#202f27] md:grid-cols-[1.1fr_0.9fr]">
                <div className="p-7 md:p-10 lg:p-12">
                    <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8e4b32] dark:text-[#e5a184]"><Mail className="size-4" /> The BookNook Letter</span>
                    <h2 className="max-w-xl font-heading text-3xl font-medium leading-tight text-[#234b3c] dark:text-[#dce8df] md:text-4xl">A little more reading in your inbox.</h2>
                    <p className="mt-4 max-w-lg text-sm leading-6 text-[#525f58] dark:text-[#b0beb5]">Occasional notes from the shelves: new arrivals, community favorites, and reading inspiration worth sharing.</p>
                </div>
                <div className="flex flex-col justify-center border-t border-[#e5e0d8] bg-white p-7 dark:border-[#34443b] dark:bg-[#26382e] md:border-l md:border-t-0 md:p-10">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                        <input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="h-12 min-w-0 flex-1 rounded-lg border border-[#c1c8c3] bg-[#fbf9f3] px-4 text-sm text-[#252d29] outline-none transition placeholder:text-[#717974] focus:border-[#234b3c] focus:ring-2 focus:ring-[#234b3c]/10 dark:border-[#48594e] dark:bg-[#202f27] dark:text-[#f3f1eb]" />
                        <button type="submit" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#234b3c] px-5 text-sm font-bold text-white transition hover:bg-[#1a382d] dark:bg-[#dce8df] dark:text-[#234b3c] dark:hover:bg-white">Subscribe <ArrowRight className="size-4" /></button>
                    </form>
                    <p className="mt-3 text-xs leading-5 text-[#68736c] dark:text-[#aab8ae]">No clutter. Just thoughtful updates from your community library.</p>
                    <p aria-live="polite" className="mt-2 min-h-5 text-xs text-[#8e4b32] dark:text-[#e5a184]">{message}</p>
                </div>
            </div>
        </section>
    );
}
