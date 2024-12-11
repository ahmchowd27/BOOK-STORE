import React, { useEffect, useState } from "react";
import BookCards from "../shared/BookCards";

const OtherBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Replace "YOUR_DEPLOYED_BACKEND_URL" with your actual backend URL
    const backendUrl = "https://book-store-azew.onrender.com";
    fetch(`${backendUrl}/all-books`)
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(5, 12)))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="mt-24">
      <BookCards books={books} headline={"Other Books"} />
    </div>
  );
};

export default OtherBooks;
