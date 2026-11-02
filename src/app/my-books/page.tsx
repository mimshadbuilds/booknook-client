import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyBooksList from "@/components/books/MyBooksList";

export interface IBook {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    bookImage: string;
    copies: number;
    createdAt?: string;
}

const MyBooksPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-books/${(user?.email ?? "")}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch your books.");
    }

    const books: IBook[] = await res.json();

    return <MyBooksList books={books} />;
};

export default MyBooksPage;