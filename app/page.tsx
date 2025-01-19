import { createClient } from "@/utils/supabase/server";
import Shelf from "@/components/Shelf";
import MemoPad from "@/components/MemoPad";

export default async function Home() {
  const supabase = await createClient();

  // Fetch the current user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fetchBooks = async () => {
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

  if (!books) {
    return <p>Error finding books.</p>;
  }

  return (
    <div>
      <Shelf books={books} />
      <MemoPad /> {/* Add MemoPad here */}
    </div>
  );
}
