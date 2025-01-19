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
    <div className="flex flex-col items-center w-full min-h-screen py-24 px-12 space-y-6">
      <img
        src={user?.user_metadata.avatar_url}
        alt="Avatar"
        className="rounded-full w-48 h-48"
      />
      <div className="flex flex-col w-full">
        <p className="text-2xl font-sans text-brand-brown w-full px-6">name</p>
        <h1 className="text-xl font-bold bg-white border-brand-brown border rounded-full pt-2 pb-1 px-4 w-full">
          {user?.user_metadata.full_name}
        </h1>
      </div>
      <div className="flex flex-col w-full">
        <p className="text-2xl font-sans text-brand-brown w-full px-6">email</p>
        <h1 className="text-xl font-bold bg-white border-brand-brown border rounded-full pt-2 pb-1 px-4 w-full">
          {user?.user_metadata.email}
        </h1>
      </div>
      {user ? (
        <>
          <form className="pt-8">
            <button
              formAction={signOut}
              className="
                bg-brand-brown
                text-white
                font-sans
                text-xl
                py-2
                px-4
                rounded-full
                "
            >
              Sign Out
            </button>
          </form>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
