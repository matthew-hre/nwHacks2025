import AddBookName from "@/components/AddBookName";

import { addBookNameToDb, addIsbnToDb } from "./actions";
import BarcodeScannerComponent from "@/components/BarcodeScanner";

export default async function FetchIsbns() {
  return (
    <>
      <AddBookName addIsbnToDb={addBookNameToDb} />
      <p className="text-xl font-sans text-brand-brown mb-2 w-full text-center py-8">
        or
      </p>
      <BarcodeScannerComponent addIsbnToDb={addIsbnToDb} />
    </>
  );
}
