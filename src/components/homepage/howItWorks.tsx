import Link from "next/link";
import { ArrowRight, Search, BadgeCheck, RotateCcw, Compass, Handshake, HeartHandshake } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Discover books you want to read.",
        description: "Search or browse neighborhood shelves, check availability, and find a title that belongs on your reading list.",
        note: "Explore the collection",
        icon: Search,
        noteIcon: Compass,
    },
    {
        number: "02",
        title: "Borrow available books from the community.",
        description: "Request a book from its owner and enjoy reading through a simple, neighborly lending process.",
        note: "Built on mutual trust",
        icon: BadgeCheck,
        noteIcon: Handshake,
    },
    {
        number: "03",
        title: "Return books and explore something new.",
        description: "Return the book when you are done and pass a good story along to another reader.",
        note: "Keep stories circulating",
        icon: RotateCcw,
        noteIcon: HeartHandshake,
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="w-full border-t border-[#c1c8c3]/50 bg-[#f5f3ed] px-4 py-16 dark:border-[#34443b] dark:bg-[#202f27] md:px-6 lg:px-12 lg:py-18">
            <div className="mx-auto max-w-[1320px]">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <span className="mb-3 inline-flex rounded-full bg-[#d9e5dc] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#3e4943] dark:bg-[#314b3b] dark:text-[#dce8df]">Community Principles</span>
                    <h2 className="font-heading text-3xl font-medium tracking-tight text-[#234b3c] dark:text-[#dce8df] md:text-4xl">How BookNook Works</h2>
                    <p className="mt-3 text-sm leading-6 text-[#525f58] dark:text-[#b0beb5]">An open, trust-based circulation model designed to keep inspiring books circulating through every home in our neighborhood.</p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        const NoteIcon = step.noteIcon;
                        return (
                            <article key={step.number} className="group flex min-h-[270px] flex-col justify-between rounded-2xl border border-[#c1c8c3]/40 bg-white p-6 shadow-[0_2px_8px_-2px_rgba(37,45,41,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-[#34443b] dark:bg-[#26382e] md:p-7">
                                <div>
                                    <div className="mb-6 flex items-center justify-between">
                                        <span className="flex size-12 items-center justify-center rounded-xl bg-[#f0eee8] font-heading text-xl font-bold text-[#234b3c] dark:bg-[#314b3b] dark:text-[#dce8df]">{step.number}</span>
                                        <Icon className="size-7 text-[#68736c] transition-colors group-hover:text-[#234b3c] dark:text-[#aab8ae] dark:group-hover:text-[#dce8df]" />
                                    </div>
                                    <h3 className="font-heading text-xl font-semibold leading-7 text-[#234b3c] dark:text-[#dce8df]">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-[#525f58] dark:text-[#b0beb5]">{step.description}</p>
                                </div>
                                <div className="mt-7 flex items-center gap-2 border-t border-[#e5e0d8]/70 pt-4 text-[11px] font-bold uppercase tracking-wide text-[#234b3c] dark:border-[#48594e] dark:text-[#a5d0bc]">
                                    <NoteIcon className="size-4" />
                                    {step.note}
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-10 flex justify-center">
                    <Link href="/books" className="inline-flex items-center gap-2 rounded-xl bg-[#234b3c] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1a382d] dark:bg-[#dce8df] dark:text-[#234b3c] dark:hover:bg-white">
                        Browse Books <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#234b3c] p-7 text-white shadow-md dark:bg-[#093426] md:flex-row md:items-center md:p-10">
                    <div className="max-w-2xl">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#c0ecd7]">Neighbors Lending to Neighbors</span>
                        <h3 className="mt-2 font-heading text-2xl font-semibold text-white md:text-3xl">Have a favorite volume gathering dust?</h3>
                        <p className="mt-3 text-sm leading-6 text-[#d9e5dc]">Donate a copy or list it as available for home lending. Every story given a second reader keeps the neighborhood connected.</p>
                    </div>
                    <Link href="/add-book" className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#fbf9f3] px-6 py-3 text-sm font-bold text-[#234b3c] shadow-sm transition hover:bg-white">
                        Contribute a Volume <ArrowRight className="size-4" />
                    </Link>
                </div> */}
            </div>
        </section>
    );
}
