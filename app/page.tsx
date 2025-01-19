import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOut } from "./login/actions";
import FetchIsbns from "./fetchIsbnsserver"; // Import FetchIsbns

export default async function Home() {
  const supabase = await createClient();

  // Fetch the current user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {user ? (
        <>
          <p>
            Welcome, <strong>{user.email}</strong>!
          </p>
          <p>
            Your User ID is: <strong>{user.id}</strong>
          </p>
          {/* Render FetchIsbns and pass user.id */}
          <FetchIsbns userId={user.id} />
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
