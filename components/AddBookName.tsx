"use client"; // This ensures the component is rendered on the client side

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client creation function
import { redirect } from "next/navigation";

export default function AddBookName({
  addIsbnToDb,
}: {
  addIsbnToDb: (formData: FormData) => void;
}) {
  const [searchQuery, setSearchQuery] = useState(""); // State for user input
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedBook, setSelectedBook] = useState<string | null>(null); // State for selected book
  const [suggestions, setSuggestions] = useState<string[]>([]); // State for autofill suggestions
  const [error, setError] = useState(""); // State for error handling

  // Fetch suggestions from Supabase when the search query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      setError(""); // Clear any previous errors

      if (!searchQuery) {
        setSuggestions([]); // Clear suggestions if search query is empty
        return;
      }

      try {
        const supabase = createClient(); // Initialize Supabase client
        const { data, error } = await supabase
          .from("books")
          .select("book_name")
          .ilike("book_name", `%${searchQuery}%`); // Search for books containing the query

        if (error) {
          console.error("Error fetching suggestions:", error.message);
          setError("Failed to fetch suggestions.");
          return;
        }

        setSuggestions(data.map((book) => book.book_name)); // Map results to book names
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching suggestions.");
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery) {
      setError("Please enter a book name.");
      return;
    }

    const formData = new FormData();
    formData.append("bookName", searchQuery); // Append the search query to the form data

    await addIsbnToDb(formData); // Call the parent function to add the book to the DB

    redirect("/"); // Redirect to the home page after adding
  };

  return (
    <form className="text-center mt-12 px-8" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-4">Add a Book</h1>
      <h2 className="text-2xl font-bold mb-4">Search for a Book:</h2>
      <div className="flex flex-row items-center justify-center">
        <input
          type="text"
          name="bookName"
          placeholder="Enter book name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedBook(null); // Clear selected book when the query changes
          }}
          className="flex-1 rounded border border-brand-brown p-2 active:outline-none focus:outline-none"
        />
        <button className="p-2 ml-2 bg-brand-brown text-white border-none rounded cursor-pointer">
          Add Book
        </button>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {suggestions.length > 0 && (
        <ul className="list-none p-0 mt-2 max-h-52 overflow-y-auto w-full mx-auto border border-brand-brown rounded">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setSearchQuery(suggestion);
                setSelectedBook(suggestion); // Set the selected book
              }}
              className="p-2 cursor-pointer border-b border-brand-brown"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
