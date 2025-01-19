import React from "react";

export default function MemoPad({
  books,
}: {
  books: { books: { book_name: string } }[];
}) {
  console.log(books);

  return (
    <div className="text-left mt-5 relative">
      <div className="z-5 absolute top-2 left-2 space-y-3">
        {
          books?.map((book, index) => (
            <p key={index} className="text-2xl font-sans text-brand-brown">
              {book.books.book_name}
            </p>
          )) // Map the books to display the book names
        }
      </div>
      <img
        src="/assets/misc/memopad.png"
        alt="Memo Pad"
        className="max-w-full h-auto mx-auto block"
      />
    </div>
  );
}
