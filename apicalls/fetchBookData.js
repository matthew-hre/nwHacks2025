const fetchBookData = async (isbn) => {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching book data: ${response.statusText}`);
    }

    const data = await response.json();
    return data[`ISBN:${isbn}`] || {};
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
};

export default fetchBookData;
