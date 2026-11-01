import Image from "next/image";

interface IBook {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    bookImage: string;
    copies: number;
    createdAt: string;
}

const BookDetailsPage = async({ params} : { params: Promise<{ bookId: string }> }) => {
    const { bookId } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, { 
        cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch book details.");
    }
    const bookDetails: IBook = await res.json();
    console.log(bookDetails);
    return (
        <div>
            <li>
                <Image src={bookDetails.bookImage} alt={bookDetails.title} width={300} height={400} />
                <h2>{bookDetails.title}</h2>
                <p>Author: {bookDetails.author}</p>
                <p>Category: {bookDetails.category}</p>
                <p>Description: {bookDetails.description}</p>
                <p>Copies Available: {bookDetails.copies}</p>
            </li>
        </div>
    );
};

export default BookDetailsPage;