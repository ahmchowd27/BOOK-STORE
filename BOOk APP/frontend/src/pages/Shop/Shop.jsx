import React, { useContext, useEffect, useState } from "react";
import { Card, Spinner } from "flowbite-react";
import { AuthContext } from "../../contexts/AuthProvider";

export default function Shop() {
  const { loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  // Replace "YOUR_DEPLOYED_BACKEND_URL" with your backend's deployed URL
  const backendUrl = "https://book-store-azew.onrender.com";

  // Fetching data
  useEffect(() => {
    fetch(`${backendUrl}/all-books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, [loading]);

  // Loader
  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <div className="my-28 px-4 lg:px-24">
      <h2 className="text-3xl font-bold text-center mb-16 z-40">
        All Books are Available Here
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {books.map((book) => (
          <Card key={book._id}>
            <img src={book.imageURL} alt="" className="h-96" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>{book.bookTitle}</p>
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order....
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Buy Now
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
