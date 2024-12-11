import React, { useEffect, useState } from "react";
import BookCards from "../shared/BookCards";

const BestSeller = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  // Render Backend URL
  const backendURL = "https://book-store-azew.onrender.com";

  useEffect(() => {
    // Fetch books from the backend
    fetch(`${backendURL}/all-books`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch books.");
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data.slice(0, 8)); // Limit to top 8 books
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching books:", err.message);
        setError("Unable to load best seller books. Please try again later.");
      });
  }, []);

  return (
    <>
      {error ? (
        <p className="text-red-500 text-center my-4">{error}</p>
      ) : (
        <BookCards books={books} headline="Best Seller Books" />
      )}
    </>
  );
};

export default BestSeller;
