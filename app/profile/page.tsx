/* eslint-disable @next/next/no-img-element */
import { signOut } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Profile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-24 space-y-4">
      <img
        src={user?.user_metadata.avatar_url}
        alt="Avatar"
        className="rounded-full w-48 h-48"
      />
      <h1 className="text-4xl font-bold">{user?.user_metadata.full_name}</h1>
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
