import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-[#e5e0d8] bg-[#f0eee8] px-4 py-12 md:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-[#234b3c]">
            <Image
              src="/logo_icon.png"
              alt=""
              width={32}
              height={30}
              className="h-[30px] w-auto object-contain"
            />
            <span className="font-[Literata] text-2xl font-semibold">
              BookNook
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#525f58]">A neighborhood library built on shared stories, thoughtful reading, and trust between readers.</p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#252d29]">Explore</h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#525f58]"><Link href="/books" className="hover:text-[#234b3c]">All Books</Link><Link href="/add-book" className="hover:text-[#234b3c]">Share a Book</Link><Link href="/my-borrows" className="hover:text-[#234b3c]">My Borrows</Link></div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#252d29]">Stay connected</h2>
          <div className="mt-3 flex flex-col gap-3 text-sm text-[#525f58]"><a className="inline-flex items-center gap-2 hover:text-[#234b3c]" href="mailto:hello@booknook.example"><Mail size={16} /> hello@booknook.example</a><a className="inline-flex items-center gap-2 hover:text-[#234b3c]" href="https://instagram.com" target="_blank" rel="noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> Instagram</a></div>
        </div>
      </div>
      <div className="mx-auto mt-9 max-w-[1320px] border-t border-[#d8d3c9] pt-5 text-xs text-[#69736d]">© {new Date().getFullYear()} BookNook Community Library. Built around a love of reading.</div>
    </footer>
  );
}
