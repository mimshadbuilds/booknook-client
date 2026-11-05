import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Books | BookNook",
    description: "Browse, search, and discover books shared by your neighborhood community.",
};

export default function BooksLayout({ children }: LayoutProps<"/books">) {
    return children;
}
