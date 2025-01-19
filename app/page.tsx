import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOut } from "./login/actions";

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {user ? (
        <>
          <form>
            <button formAction={signOut}>Sign Out</button>
          </form>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
