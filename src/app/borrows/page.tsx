import MyBorrowsList from '@/components/borrows/MyBorrowsList';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata = {
    title: "My Borrows | BookNook",
    description: "View and manage the books you have borrowed from the BookNook community.",
};

export interface IBorrow {
    _id: string;
    bookId: string;
    userId: string;
    borrowedAt: string;
    returnedAt: string | null;
    status: "borrowed" | "returned";
    book: {
        title: string;
        author: string;
        category: string;
        bookImage: string;
    } | null;
}

const MyBorrowsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows?userId=${user?.id ?? ""}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error("Failed to fetch borrows.");
    }

    const borrows: IBorrow[] = await res.json();
    console.log(borrows)

    return <MyBorrowsList borrows={borrows} />;
};

export default MyBorrowsPage;