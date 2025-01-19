import SearchByIsbn from "@/components/SearchByIsbn";
import AddBookName from "@/components/AddBookName";

export default async function FetchIsbns() {
  return (
    <>
      <SearchByIsbn />
      <AddBookName />
    </>
  );
}
