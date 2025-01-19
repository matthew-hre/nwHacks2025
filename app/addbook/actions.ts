import { createClient } from "@/utils/supabase/server";

export async function addBookNameToDb(formData: FormData) {
  "use server";

  const bookName = formData.get("bookName") as string;

  console.log("bookName", bookName);

  if (!bookName) {
    return;
  }

  processIsbn(bookName);
}

export async function addIsbnToDb(formData: FormData) {
  "use server";

  const isbn = formData.get("isbn") as string;

  console.log("isbn", isbn);

  if (!isbn) {
    return;
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // check if the book already exists in the user's shelf
  const { data: userBooks } = await supabase
    .from("user_id_isbn")
    .select("isbn")
    .eq("id", user?.id)
    .eq("isbn", isbn);

  if (userBooks && userBooks.length > 0) {
    return;
  }

  // check if the book is in the books table

  const { data: books } = await supabase
    .from("books")
    .select("book_name")
    .eq("book_isbn", isbn);

  if (books && books.length > 0) {
    const { error } = await supabase.from("user_id_isbn").insert([
      {
        id: user?.id,
        isbn: isbn,
      },
    ]);

    if (error) {
      console.error("Error adding book to user's shelf:", error.message);
      return;
    }

    return;
  }

  // if the book doesn't exist in our DB, we need to add it to the books table first

  const apiKey = process.env.ISBN_API_KEY; // Store your API key in environment variables for security
  const apiUrl = `https://api2.isbndb.com/book/${isbn}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["Authorization"] = apiKey;
  }

  const response = await fetch(apiUrl, {
    headers,
  });

  const bookData = await response.json();

  if (bookData.error) {
    console.error("Error fetching book data:", bookData.error);
    return;
  }

  const book = bookData.book;
  const bookName = book.title;
  const author = book.authors[0];

  const { error } = await supabase.from("books").insert([
    {
      book_isbn: isbn,
      book_name: bookName,
      book_author: author,
    },
  ]);

  if (error) {
    console.error("Error adding book to database:", error.message);
    return;
  }

  const { error: error2 } = await supabase.from("user_id_isbn").insert([
    {
      id: user?.id,
      isbn: isbn,
    },
  ]);

  if (error2) {
    console.error("Error adding book to user's shelf:", error2.message);
    return;
  }

  return;
}

export async function processIsbn(bookName: string) {
  "use server";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("books")
    .select("book_isbn")
    .eq("book_name", bookName);

  if (data && data.length > 0) {
    // the book already exists in our DB, so we can just add the user's ID and the book's ISBN to the user_id_isbn table
    const isbn = data[0].book_isbn;

    const { error } = await supabase.from("user_id_isbn").insert([
      {
        id: user?.id,
        isbn: isbn,
      },
    ]);

    if (error) {
      console.error("Error adding book to user's shelf:", error.message);
      return;
    }

    return;
  }

  // if the book doesn't exist in our DB, we need to add it to the books table first
  const apiKey = process.env.ISBN_API_KEY; // Store your API key in environment variables for security
  const apiUrl = `https://api2.isbndb.com/books/${encodeURIComponent(
    bookName,
  )}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["Authorization"] = apiKey;
  }

  const response = await fetch(apiUrl, {
    headers,
  });

  const bookData = await response.json();

  if (bookData.error) {
    console.error("Error fetching book data:", bookData.error);
    return;
  }

  const book = bookData.books.find(
    (book: { title: string; isbn13: string; authors: string[] }) =>
      book.title === bookName,
  );
  const isbn = book.isbn13;

  const author = book.authors[0];

  const { error } = await supabase.from("books").insert([
    {
      book_isbn: isbn,
      book_name: bookName,
      book_author: author,
    },
  ]);

  if (error) {
    console.error("Error adding book to database:", error.message);
    return;
  }

  const { error: error2 } = await supabase.from("user_id_isbn").insert([
    {
      id: user?.id,
      isbn: isbn,
    },
  ]);

  if (error2) {
    console.error("Error adding book to user's shelf:", error2.message);
    return;
  }
}
