'use client'
import Link from "next/link";
import { UserRound } from "lucide-react";
import Image from "next/image";
import AuthUserPage from "./AuthUser";
import { authClient } from "@/lib/auth-client";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export function Header() {
  const { data: session } = authClient.useSession()
  const user = session?.user;
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-[#e5e0d8] bg-[#fbf9f3]/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-full max-w-[1320px] items-center justify-between gap-4 px-4 md:px-6 lg:px-12">
        <nav className="hidden items-center gap-0.5 md:flex"
          aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href}
              href={link.href}
              className={`relative px-2.5 py-2 text-[13px] font-medium transition-colors duration-200
                after:absolute after:inset-x-2.5 after:bottom-0 after:h-[2px]
                after:rounded-full after:bg-[#234b3c] after:transition-transform after:duration-200
                ${
                  link.active
                    ? "text-[#234b3c] after:scale-x-100"
                    : "text-[#68736c] after:scale-x-0 hover:text-[#234b3c] hover:after:scale-x-100"
                }`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/"
          className="absolute left-1/2 flex -translate-x-1/2 shrink-0 items-center gap-2.5">
          <Image
            src="/logo_icon.png"
            alt=""
            width={40}
            height={37}
            priority
            className="h-9 w-auto object-contain"
          />
          <span className="whitespace-nowrap font-heading text-2xl font-bold text-[#234b3c]">
            BookNook
          </span>
        </Link>

        <div className="ml-auto flex justify-center items-center gap-2">
          { !user && (
            <Link href="/profile"
              aria-label="My profile"
              className="hidden size-10 items-center justify-center rounded-lg text-[#234b3c] transition-colors hover:bg-[#f0eee8] sm:inline-flex">
              <UserRound className="size-[18px]" />
            </Link>
          ) }
            <div className="mt-2 flex justify-end border-t border-slate-100 pt-4">
              <AuthUserPage />
            </div>
        </div>
      </div>
    </header>
  );
}