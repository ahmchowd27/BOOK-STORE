import React, { useState } from "react";
import BannerCard from "../shared/BannerCard";
import axios from "axios";
import BookCards from "../shared/BookCards"; // Import your BookCards component

export const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  // Render Backend URL
  const backendURL = "https://book-store-6gpl.onrender.com";

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${backendURL}/search-book`, {
        params: { title: searchQuery },
      });
      setSearchResults(response.data);
      setError("");
    } catch (err) {
      setSearchResults([]);
      setError("No books found or an error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-teal-100 px-4 lg:px-24 flex items-center">
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-12 py-40">
        {/* Right side */}
        <div className="md:w-1/2 h-full">
          <BannerCard />
        </div>

        {/* Left side */}
        <div className="md:w-1/2 space-y-8 bg-teal-100">
          <h1 className="lg:text-6xl text-5xl font-bold text-black mb-5 lg:leading-tight leading-snug">
            Buy and sell your books{" "}
            <span className="text-blue-700">for the best prices</span>
          </h1>
          <p>
            Find and read more books you'll love, and keep track of the books
            you want to read. Be part of the world's largest community of book
            lovers.
          </p>
          <div>
            <input
              type="search"
              placeholder="Search a book by title"
              className="py-2 px-2 rounded-s-sm border border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Display error message */}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      {/* Display BookCards if there are search results */}
      {searchResults.length > 0 && (
        <BookCards headline="Search Results" books={searchResults} />
      )}
    </div>
  );
};
