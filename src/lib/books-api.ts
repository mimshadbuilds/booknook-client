export interface IBooks {
    id: string;
    title: string;
    author: string;
    category: string;
    image: string;
    copies: number;
    shelf?: string;
    borrows?: number;
}

export const getBooks = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch books.");
    }

    const result = await res.json();

    return Array.isArray(result) ? result : result.data ?? [];
};

export const getHomeBooks = async (): Promise<IBooks[]> => {
    try {
        const res = await getBooks();
        const rows: Record<string, unknown>[] = Array.isArray(res) ? res : [];

        return rows
            .map((book) => ({
                id: String(book._id ?? book.id ?? ""),
                title: String(book.title ?? ""),
                author: String(book.author ?? ""),
                category: String(book.category ?? "Others"),
                image: String(book.bookImage ?? book.image ?? ""),
                copies: Number(book.copies ?? 0),
                shelf: typeof book.shelf === "string" ? book.shelf : undefined,
                borrows: Number(book.borrows ?? 0),
            }))
            .filter((book) => book.id && book.title);
    } catch {
        return [];
    }
};
