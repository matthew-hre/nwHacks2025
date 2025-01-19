"use client"; // This ensures the component is rendered on the client side

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client creation function

const AddBookName: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for user input
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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Search for a Book:</h1>
      <input
        type="text"
        placeholder="Enter book name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            marginTop: "10px",
            maxHeight: "200px",
            overflowY: "auto",
            width: "300px",
            margin: "0 auto",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => setSearchQuery(suggestion)} // Set the selected suggestion as the query
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddBookName;
