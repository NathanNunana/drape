import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaArrowRight } from 'react-icons/fa';

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/assets/images/carousel-bg-1.jpg",
      heading: "Quality Generators",
      text: "Car Servicing",
      buttonLabel: "Learn More",
      buttonLink: "#",
      imgAlt: "Image 1",
    },
    {
      image: "/assets/images/carousel-bg-2.jpg",
      heading: "Qualified Generator Service Center",
      text: "Car Servicing",
      buttonLabel: "Learn More",
      buttonLink: "#",
      imgAlt: "Image 2",
    },
  ];

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative h-64 sm:h-96 lg:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              className="w-full h-full object-cover"
              src={slide.image}
              alt={slide.imgAlt}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="container text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
                  <div className="col-10 lg:col-7 mb-4 lg:mb-0">
                    <h6 className="text-white text-lg uppercase mb-3">
                      {slide.text}
                    </h6>
                    <h1 className="text-white py-2 mb-7 text-5xl lg:text-5xl lg:mb-6 font-extrabold">
                      {slide.heading}
                    </h1>
                    <button
                      className="bg-blue-500 text-white items-center mx-auto justify-center py-4 flex text-lg px-8 mt-5 hover:bg-blue-600"
                    >
                      {slide.buttonLabel}{" "}
                      <i className="ml-2"><FaArrowRight /></i>

                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 bg-opacity-50 text-white"
        onClick={goToPrevSlide}
      >
        <span className="">
          <FaAngleLeft />
        </span>
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 bg-opacity-50 text-white"
        onClick={goToNextSlide}
      >
        <span className="">
          <FaAngleRight />
        </span>
      </button>
    </div>
  );
};

export default Carousel;
