import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add a Book | BookNook",
    description: "Share a book with your neighborhood by adding it to the BookNook library.",
};

export default function AddBookLayout({ children }: LayoutProps<"/add-book">) {
    return children;
}
