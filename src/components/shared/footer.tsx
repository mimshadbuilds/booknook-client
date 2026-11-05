import Image from "next/image";
import Link from "next/link";
import { BookOpen, LibraryBigIcon, Mail } from "lucide-react";
import { InstagramIcon, XSocialIcon } from "@/lib/utils";

const footerGroups = [
    {
        title: "Explore",
        links: [
            { label: "All Books", href: "/books" },
            { label: "New Arrivals", href: "/#new-arrivals" },
            { label: "Categories", href: "/#categories" },
            { label: "Reading Guides", href: "/books" },
        ],
    },
    {
        title: "Community",
        links: [
            { label: "Add a Book", href: "/add-book" },
            { label: "How it Works", href: "/#how-it-works" },
            { label: "My Books", href: "/my-books" },
            { label: "My Borrows", href: "/borrows" },
        ],
    },
    {
        title: "Legal & Support",
        links: [
            { label: "Borrowing Guidelines", href: "/borrows" },
            { label: "Privacy Policy", href: "mailto:hello@booknooklibrary.org?subject=Privacy%20Policy" },
            { label: "Terms of Service", href: "mailto:hello@booknooklibrary.org?subject=Terms%20of%20Service" },
            { label: "Help Center", href: "mailto:hello@booknooklibrary.org?subject=Help" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="w-full border-t border-[#e4e2dd] bg-[#f5f3ed] pt-10 pb-6 dark:border-[#34443b] dark:bg-[#202f27]">
            <div className="mx-auto max-w-[1320px] px-4 md:px-6 lg:px-12">
                <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        <Link href="/" className="inline-flex w-fit items-center gap-2 text-[#234b3c] dark:text-[#dce8df]">
                            <Image
                                src="/logo_icon.png"
                                alt=""
                                width={32}
                                height={32}
                                className="size-8 object-contain"
                            />
                            <span className="font-[Literata] text-xl font-semibold tracking-tight">
                                BookNook
                            </span>
                        </Link>
                        <p className="max-w-sm text-sm leading-6 text-[#525f58] dark:text-[#b0beb5]">
                            A community-curated mini online library fostering the love of reading and shared knowledge.
                        </p>
                        <div className="flex items-center gap-3 text-[#525f58] dark:text-[#b0beb5]">
                            <Link href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="rounded-full p-2 transition-colors hover:bg-[#eae8e2] hover:text-[#234b3c] dark:hover:bg-[#314b3b] dark:hover:text-[#dce8df]"><XSocialIcon className="size-5" /></Link>
                            <Link href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full p-2 transition-colors hover:bg-[#eae8e2] hover:text-[#234b3c] dark:hover:bg-[#314b3b] dark:hover:text-[#dce8df]"><InstagramIcon className="size-5" /></Link>
                            <Link href="https://goodreads.com" target="_blank" rel="noreferrer" aria-label="Goodreads" className="rounded-full p-2 transition-colors hover:bg-[#eae8e2] hover:text-[#234b3c] dark:hover:bg-[#314b3b] dark:hover:text-[#dce8df]"><LibraryBigIcon className="size-5" /></Link>
                        </div>
                    </div>

                    {footerGroups.map((group) => (
                        <div key={group.title} className="flex flex-col gap-3">
                            <h2 className="text-sm font-semibold text-[#252d29] dark:text-[#f0f2ed]">{group.title}</h2>
                            <ul className="flex flex-col gap-2">
                                {group.links.map((link) => (
                                    <li key={link.label} className="text-sm text-[#525f58] transition-colors hover:text-[#234b3c] dark:text-[#b0beb5] dark:hover:text-[#dce8df]">
                                        {link.href.startsWith("mailto:") ? (
                                            <a href={link.href}>{link.label}</a>
                                        ) : (
                                            <Link href={link.href}>{link.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e4e2dd] pt-5 text-center dark:border-[#34443b] md:flex-row md:text-left">
                    <p className="text-xs text-[#68736c] dark:text-[#aab8ae]">
                        © {new Date().getFullYear()} BookNook Community Library. All rights reserved.
                    </p>
                    <a href="mailto:hello@booknooklibrary.org" className="inline-flex items-center gap-2 text-xs text-[#68736c] transition-colors hover:text-[#234b3c] dark:text-[#aab8ae] dark:hover:text-[#dce8df]">
                        <Mail className="size-3.5" />
                        community@booknooklibrary.org
                    </a>
                </div>
            </div>
        </footer>
    );
}
