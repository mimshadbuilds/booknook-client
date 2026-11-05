"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import AuthUserPage from "./AuthUser";

const links = [
    { label: "Home", href: "/" },
    { label: "All Books", href: "/books" },
    { label: "Add Book", href: "/add-book", private: true },
    { label: "My Books", href: "/my-books", private: true },
    { label: "My Borrows", href: "/borrows", private: true },
];

export function Header() {
    const pathname = usePathname();
    const { data: session } = authClient.useSession();
    const { resolvedTheme, setTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const user = session?.user;
    const isDark = resolvedTheme === "dark";

    const visibleLinks = links.filter(
        (link) => !link.private || user
    );

    const isActive = (href: string) =>
        href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e5e0d8] bg-[#f7f5ef]/95 backdrop-blur-xl transition-colors dark:border-[#34443b] dark:bg-[#17251f]/95">
            <div className="mx-auto grid h-20 max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-6 lg:px-10">
                <nav className="hidden items-center gap-1 justify-self-start lg:flex"
                    aria-label="Main navigation">
                    {visibleLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={`rounded-lg px-3 py-2.5 text-[13px] font-semibold underline-offset-8 transition-colors ${
                                isActive(link.href)
                                    ? "text-[#234b3c] underline decoration-2 decoration-[#234b3c] dark:text-[#e0eee4] dark:decoration-[#dce8df]"
                                    : "text-[#68736c] hover:bg-[#eeece5] hover:text-[#234b3c] dark:text-[#b0beb5] dark:hover:bg-[#26382e] dark:hover:text-[#e0eee4]"
                            }`}>                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link href="/" className="flex shrink-0 items-center justify-self-center gap-2.5">
                    <Image src="/logo_icon.png"
                        alt=""
                        width={40}
                        height={37}
                        priority
                        className="h-9 w-auto object-contain"
                    />
                    <span className="font-heading text-2xl font-bold tracking-tight text-[#234b3c] dark:text-[#dce8df]">
                        BookNook
                    </span>
                </Link>

                <div className="flex shrink-0 items-center justify-self-end gap-2">
                    <div className="hidden sm:flex">
                        <AuthUserPage />
                    </div>

                    <button type="button"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        className="flex size-10 items-center justify-center rounded-xl border border-[#e5e0d8] text-[#234b3c] transition-colors hover:bg-[#eeece5] dark:border-[#3b5044] dark:text-[#dce8df] dark:hover:bg-[#26382e] lg:hidden">
                        {mobileMenuOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}

                    </button>
                    <button type="button"
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                        title={`Switch to ${isDark ? "light" : "dark"} mode`}
                        className="flex size-9 items-center justify-center rounded-lg text-[#234b3c] transition-colors hover:bg-[#f1f0e9] dark:border-[#3b5044] dark:text-[#dce8df] dark:hover:bg-[#1e2e25]">
                        {isDark ? (
                            <Sun className="size-[18px]" />
                        ) : (
                            <Moon className="size-[18px]" />
                        )}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-[#e5e0d8] bg-[#f7f5ef] px-4 py-4 dark:border-[#34443b] dark:bg-[#17251f] lg:hidden">
                    <nav className="mx-auto flex max-w-[1320px] flex-col gap-1">
                        {visibleLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`rounded-lg px-4 py-3 text-sm font-semibold underline-offset-8 transition-colors ${
                                isActive(link.href)
                                    ? "text-[#234b3c] underline decoration-2 decoration-[#234b3c] dark:text-[#e0eee4] dark:decoration-[#dce8df]"
                                    : "text-[#68736c] hover:bg-[#eeece5] dark:text-[#b0beb5] dark:hover:bg-[#26382e]"
                                }`}>                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-3 border-t border-[#e5e0d8] pt-3 dark:border-[#34443b] sm:hidden">
                            <AuthUserPage />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}