import RewardsClient from "./RewardsClient";
import { createClient } from "@/utils/supabase/server";

export default async function RewardsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: books } = await supabase
    .from("user_id_isbn")
    .select("isbn")
    .eq("id", user?.id);

  return <RewardsClient books={books ?? []} />;
}
