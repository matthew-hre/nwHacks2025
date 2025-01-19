"use client"; // Ensure this runs on the client side

interface FetchIsbnsProps {
  books: { books?: { book_name?: string } }[];
}

export default function FetchIsbnsClient({ books }: FetchIsbnsProps) {
  return (
    <div>
      <h2>{"Books You've Read:"}</h2>
      <ul>
        {books.map((record, index: number) => (
          <li key={index}>
            {record.books?.book_name || "Book name not found"}
          </li>
        ))}
      </ul>
    </div>
  );
}
