import SearchByIsbn from "@/components/SearchByIsbn";
import AddBookName from "@/components/AddBookName";

import { addIsbnToDb } from "./actions";

export default async function FetchIsbns() {
  return (
    <>
      <SearchByIsbn />
      <AddBookName addIsbnToDb={addIsbnToDb} />
    </>
  );
}
