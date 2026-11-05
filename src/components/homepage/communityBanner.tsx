import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CommunityPage() {
    return (
        <section className="mx-auto max-w-[1320px] px-4 pb-16 md:px-6 lg:px-10 pt-20">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#234b3c] p-6 text-white shadow-md md:flex-row md:items-center md:p-10">
                <div className="max-w-2xl">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9e5dc]">
                        Neighbors Lending to Neighbors
                    </p>
                    <h2 className="mt-2 font-[Literata] text-2xl font-medium leading-tight tracking-tight md:text-[28px]">
                        Have a favorite volume gathering dust?
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#c0ecd7]">
                        Donate a copy or list it as available for home lending. Every story given a second reader keeps the neighborhood connected.
                    </p>
                </div>
                <Link
                    href="/add-book"
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#fbf9f3] px-5 py-3 text-sm font-semibold text-[#234b3c] shadow-sm transition-colors hover:bg-white"
                >
                    Contribute a Volume
                    <ArrowUpRight className="size-4" />
                </Link>
            </div>
        </section>
    );
}
