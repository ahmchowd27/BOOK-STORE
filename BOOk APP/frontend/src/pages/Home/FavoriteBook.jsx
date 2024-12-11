import React from "react";
import favBook from "../../assets/favoritebook.jpg";
import { Link } from "react-router-dom";

const FavoriteBook = () => {
  // Hardcoded statistics (replace these values if needed)
  const stats = {
    bookCount: 800,
    registeredUsers: 550,
    pdfDownloads: 1200,
  };

  return (
    <div className="px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="md:w-1/2">
        <img
          src={favBook}
          alt="Favorite Book"
          className="rounded md:w-10/12"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/400x400")
          } // Fallback image
        />
      </div>
      <div className="space-y-6 md:w-1/2">
        <h2 className="text-5xl my-5 font-bold md:w-3/4 leading-snug">
          Find Your Favorite <span className="text-blue-600">Book Here!</span>
        </h2>
        <p className="mb-10 text-lg md:w-5/6">
          Discover a curated collection of books that cater to every reader's
          taste. Dive into our ever-growing catalog and download your favorites
          with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14">
          <div>
            <h3 className="text-3xl font-bold">{stats.bookCount}+</h3>
            <p className="text-base">Book Listings</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">{stats.registeredUsers}+</h3>
            <p className="text-base">Registered Users</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">{stats.pdfDownloads}+</h3>
            <p className="text-base">PDF Downloads</p>
          </div>
        </div>
        <Link to="/shop" className="block mt-8">
          <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FavoriteBook;
