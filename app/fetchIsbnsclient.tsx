"use client"; // Ensure this runs on the client side

interface FetchIsbnsProps {
  Books: any;
  userId: string;
}

export default function FetchIsbnsClient({ userId, Books }: FetchIsbnsProps) {

  return (
    <div>
      <h2>Books You've Read:</h2>
      <ul>
        {Books.map((record, index) => (
          <li key={index}>
            {record.books?.book_name || "Book name not found"}
          </li>
        ))}
      </ul>
    </div>
  );
}
