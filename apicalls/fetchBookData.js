const fetchBookData = async (isbn) => {
    if (!isbn) {
      console.error("ISBN is required.");
      return null;
    }
  
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
  
    try {
      const response = await fetch(url);
  
      // Check if the response status is okay
      if (!response.ok) {
        throw new Error(`Failed to fetch book data. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Extract book data based on ISBN
      const bookData = data[`ISBN:${isbn}`];
      if (!bookData) {
        console.warn(`No data found for ISBN: ${isbn}`);
        return null;
      }
  
      return bookData;
    } catch (error) {
      console.error("Error fetching book data:", error);
      return null;
    }
  };
  
  export default fetchBookData;
  