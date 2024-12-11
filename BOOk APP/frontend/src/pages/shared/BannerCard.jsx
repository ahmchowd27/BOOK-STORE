import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// Import banner card styles
import "./bannerCard.css";

// Import required modules
import { EffectCards } from "swiper/modules";

function BannerCard() {
  const [randomBooks, setRandomBooks] = useState([]);

  // Replace with your backend API URL
  const backendUrl = "https://book-store-azew.onrender.com";

  // Fetch book data from backend API and select random 5
  useEffect(() => {
    fetch(`${backendUrl}/all-books`)
      .then((response) => response.json())
      .then((data) => {
        // Shuffle the books and select 5 random ones
        const shuffledBooks = data.sort(() => 0.5 - Math.random());
        setRandomBooks(shuffledBooks.slice(0, 5)); // Pick 5 random books
      })
      .catch((error) => console.error("Error fetching book data:", error));
  }, []);

  return (
    <div className="banner-card">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {randomBooks.map((book, index) => (
          <SwiperSlide
            key={index}
            style={{
              backgroundImage: `url(${book.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "18px",
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCard;
