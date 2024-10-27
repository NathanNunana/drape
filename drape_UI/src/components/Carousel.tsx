import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/assets/images/carousel-bg1.jpeg",
      heading: "Generator Diagnostic Tools",
      text: "Best Tools for Every Generator",
      buttonLabel: "Explore",
      buttonLink: "#",
    },
    {
      image: "/assets/images/carousel-bg2.jpeg",
      heading: "High-Quality Generator Parts",
      text: "We Supply Premium Parts",
      buttonLabel: "Shop Now",
      buttonLink: "#",
    },
    {
      image: "/assets/images/carousel-bg3.jpeg",
      heading: "High-Quality Generators",
      text: "We Supply High Quality Generators",
      buttonLabel: "Shop Now",
      buttonLink: "#",
    },
    {
      image: "/assets/images/carousel-bg4.jpeg",
      heading: "High-Quality Generators",
      text: "We Supply High Quality Generators",
      buttonLabel: "Shop Now",
      buttonLink: "#",
    },
  ];

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative h-96 sm:h-[28rem] lg:h-[40rem]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              className="w-full h-full object-cover"
              src={slide.image}
              alt={slide.heading}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center space-y-6">
                  <h1 className="text-white text-4xl lg:text-6xl font-extrabold mb-2">
                    {slide.heading}
                  </h1>
                  <p className="text-white text-lg font-medium">{slide.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 px-3 py-2 bg-gray-800 bg-opacity-50 text-white"
        onClick={goToPrevSlide}
      >
        <FaAngleLeft size={20} />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 px-3 py-2 bg-gray-800 bg-opacity-50 text-white"
        onClick={goToNextSlide}
      >
        <FaAngleRight size={20} />
      </button>
    </div>
  );
};

export default Carousel;

