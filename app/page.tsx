import { createClient } from "@/utils/supabase/server";
import Shelf from "@/components/Shelf";

// import logo from "@/public/assets/logo.png";

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
    <div className="flex flex-col items-center min-h-screen">
      {/* <img src={logo.src} alt="shelf" className="h-12 w-12" /> */}
      <Shelf books={books} />
      <p className="text-lg font-sans text-brand-brown mb-2">
        your goal this year:
      </p>
      <p className="text-4xl font-sans text-brand-brown">
        {books.length > 0 ? `${books.length} / 7` : "start reading!"}
      </p>
    </div>
  );
}
