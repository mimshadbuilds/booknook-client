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