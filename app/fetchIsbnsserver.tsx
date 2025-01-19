
import { createClient } from "@/utils/supabase/server";
import FetchIsbnsClient from "./fetchIsbnsclient";

interface FetchIsbnsProps {
  userId: string;
}

export default async function FetchIsbns({ userId }: FetchIsbnsProps) {
  const fetchBooks = async () => {
      const supabase = await createClient(); // Initialize the Supabase client

      const { data, error } = await supabase
        .from("user_id_isbn")
        .select(`
          books:isbn(
            book_name
          )
        `)
        .eq("id", userId); // Filter by the user ID

      if (error) {
        return error;
      }

      if (data) {
        return data;
      }
    };

    const Books = await fetchBooks();
    console.log(Books);
    
  if (!Books) 
    
    {

      return <p>Error finding books.</p>;

    }

  return (
    <FetchIsbnsClient
    userId={userId}
    Books={Books}
    />
  );
}
