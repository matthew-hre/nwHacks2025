"use client"; // This ensures the component is rendered on the client side

import React, { useState } from "react"; // Import React and hooks
import fetchBookData from "../apicalls/fetchBookData"; // Import your API call function

const SearchByIsbn: React.FC = () => {
  const [isbn, setIsbn] = useState(""); // State for ISBN input
  const [bookTitle, setBookTitle] = useState(""); // State for book title
  const [error, setError] = useState(""); // State for error handling

  const handleFetchBook = async () => {
    setError(""); // Clear previous errors
    setBookTitle(""); // Clear previous book title

    if (!isbn) {
      setError("Please enter a valid ISBN number.");
      return;
    }

    try {
      const data = await fetchBookData(isbn); // Call the API function
      if (data?.title) {
        setBookTitle(data.title); // Set the book title
      } else {
        setError("No book found for the provided ISBN.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching book details.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Find a Book by ISBN</h1>
      <input
        type="text"
        placeholder="Enter ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      <br />
      <button
        onClick={handleFetchBook}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      {bookTitle && (
        <div style={{ marginTop: "20px" }}>
          <h2>Book Title: {bookTitle}</h2>
        </div>
      )}
    </div>
  );
};

export default SearchByIsbn;
