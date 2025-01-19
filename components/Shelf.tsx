"use client"; // Ensure this runs on the client side

interface ShelfProps {
  books: { books?: { book_name?: string } }[];
}

export default function Shelf({ books }: ShelfProps) {
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
