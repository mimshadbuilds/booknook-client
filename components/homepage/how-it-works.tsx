import Link from "next/link";
import { ArrowRight, BookOpen, Handshake, Search, Undo2 } from "lucide-react";

const steps = [
    { number: "01", icon: Search, title: "Discover books you want to read.", description: "Search or browse the neighborhood shelves and find something that speaks to you." },
    { number: "02", icon: Handshake, title: "Borrow from the community.", description: "Choose an available book and borrow it with a spirit of trust and mutual care." },
    { number: "03", icon: Undo2, title: "Return it and pass the story on.", description: "Bring the book back so another reader can discover a new favorite." },
];

export function HowItWorksPage() {
    return (
    <section className="px-4 pb-16 pt-5 md:px-6 md:pb-24 lg:px-12">
        <div className="mx-auto max-w-[1320px] overflow-hidden rounded-2xl bg-[#234b3c] px-6 py-10 text-white md:px-10 md:py-14 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="max-w-md">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#c8ddcf]">Community principles</p>
                <h2 className="font-[Literata] text-3xl font-semibold leading-tight md:text-4xl">How BookNook Works</h2>
                <p className="mt-4 text-sm leading-6 text-white/75 md:text-base">An open, trust-based library that keeps good stories moving from one home to another.</p>
                <Link href="/books" className="mt-7 inline-flex items-center rounded-lg bg-[#fbf9f3] px-4 py-2 text-sm font-medium text-[#234b3c] transition-colors hover:bg-white">
                    Start exploring <ArrowRight className="ml-2 size-4" />
                </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
                {steps.map((step) => { const Icon = step.icon; return <article key={step.number} className="rounded-xl border border-white/15 bg-white/5 p-5"><div className="flex items-center justify-between"><span className="font-[Literata] text-2xl text-[#c8ddcf]">{step.number}</span><Icon className="size-5 text-[#e3b19b]" /></div><h3 className="mt-8 font-[Literata] text-lg font-medium leading-6">{step.title}</h3><p className="mt-3 text-sm leading-6 text-white/70">{step.description}</p></article>; })}
            </div>
        </div>
        <div className="mt-9 flex items-center gap-2 border-t border-white/15 pt-5 text-xs text-white/65">
            <BookOpen size={15} /> No late fees. No deposits. Just neighborly trust.
        </div>
        </div>
    </section>
    );
}
