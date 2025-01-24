import React, { useState, useEffect } from 'react';
import reviews from '../data/reviewData.json';

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(reviews.length / 4));
    }, 3000); // Geser setiap 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-6">
        1 Juta+ Pelamar Telah Bergabung di PT Kami
      </h2>
      <div className="relative overflow-hidden max-w-6xl mx-auto">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: Math.ceil(reviews.length / 4) }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="flex flex-shrink-0 w-full px-4"
              style={{ flexBasis: '100%' }}
            >
              {reviews
                .slice(slideIndex * 4, slideIndex * 4 + 4)
                .map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg text-center mx-4 flex-1" 
                  >
                    <p className="text-gray-600 mb-6 italic leading-relaxed">"{review.review}"</p>
                    <div className="flex items-center justify-center gap-2 mt-44 ">
                      <div className="w-12 h-12 rounded-full bg-gray-200 "></div>
                      <div>
                        <h3 className="font-bold text-lg">{review.name}</h3>
                        <p className="text-blue-600">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
