import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaArrowRight } from "react-icons/fa";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/assets/images/carousel-bg1.jpeg",
      imageIcon: "/assets/images/generator-1.png",
      heading: "Quality Generators",
      text: "Generators",
      buttonLabel: "Learn More",
      buttonLink: "#",
      imgAlt: "Image 1",
    },
    {
      image: "/assets/images/carousel-bg2.jpeg",
      heading: "Qualified Generator Service Center",
      imageIcon: "/assets/images/generator-2.png",
      text: "Generators",
      buttonLabel: "Learn More",
      buttonLink: "#",
      imgAlt: "Image 2",
    },
    {
      image: "/assets/images/carousel-bg3.jpeg",
      heading: "Qualified Generator Service Center",
      imageIcon: "/assets/images/generator-1.png",
      text: "Generators",
      buttonLabel: "Learn More",
      buttonLink: "#",
      imgAlt: "Image 2",
    },
    {
      image: "/assets/images/carousel-bg4.jpeg",
      heading: "Qualified Generator Service Center",
      imageIcon: "/assets/images/generator-2.png",
      text: "Generators",
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
              alt={slide.imgAlt}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-6 lg:space-y-0">
                  {/* Text Content */}
                  <div className="lg:w-1/2 text-center lg:text-left px-4">
                    {/* Reduce text size for smaller screens */}
                    <h6 className="text-white text-sm sm:text-base uppercase mb-1 lg:mb-2">
                      {slide.text}
                    </h6>
                    <h1 className="text-white py-2 mb-3 text-2xl sm:text-3xl lg:text-5xl font-extrabold">
                      {slide.heading}
                    </h1>
                    <button className="bg-blue-500 text-white font-semibold items-center mx-auto lg:mx-0 py-2 px-4 flex text-sm sm:text-base lg:text-lg hover:bg-blue-600">
                      {slide.buttonLabel}{" "}
                      <i className="ml-2">
                        <FaArrowRight />
                      </i>
                    </button>
                  </div>
                  {/* Image Icon */}
                  <div className="w-1/2 sm:w-1/3 lg:w-1/3">
                    <img
                      src={slide.imageIcon}
                      alt="Icon Image"
                      className="mx-auto lg:mx-0"
                    />
                  </div>
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

