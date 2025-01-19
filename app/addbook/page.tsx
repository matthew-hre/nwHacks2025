import { createClient } from "@/utils/supabase/server";
import FetchIsbnsClient from "./FetchIsbnsClient";

export default async function FetchIsbns() {
  const fetchBooks = async () => {
    const supabase = await createClient(); // Initialize the Supabase client

    const {
      data: { user },
    } = await supabase.auth.getUser(); // Get the user ID

    const { data, error } = await supabase
      .from("user_id_isbn")
      .select(
        `
          books:isbn(
            book_name
          )
        `
      )
      .eq("id", user?.id); // Filter by the user ID

    if (error || !data) {
      return [];
    }

    if (data) {
      return data as { books?: { book_name?: string } }[];
    }
  };

  const books = await fetchBooks();
  console.log(books);

  if (!books || books.length === 0) {
    return <p>Error finding books.</p>;
  }

  return <FetchIsbnsClient books={books} />;
}
