import { createClient } from "@/utils/supabase/server";
import Shelf from "@/components/Shelf";
import MemoPad from "@/components/MemoPad";
import { redirect } from "next/navigation";

// import logo from "@/public/assets/logo.png";

export default async function Home() {
  const supabase = await createClient();

  // Fetch the current user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
    <div className="flex flex-col items-center min-h-screen">
      <Shelf books={books} />
      <p className="text-lg font-sans text-brand-brown mb-2">
        Your goal this month:
      </p>
      <p className="text-4xl font-sans text-brand-brown">
        {books.length > 0 ? `${books.length} / 7` : "start reading!"}
      </p>
      <MemoPad books={books as { books: { book_name: string } }[]} />
    </div>
  );
}
