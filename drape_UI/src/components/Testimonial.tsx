import React, { useState } from "react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Client Name",
    profession: "Profession",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    image: "/assets/images/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Client Name",
    profession: "Profession",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    image: "/assets/images/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Client Name",
    profession: "Profession",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    image: "/assets/images/testimonial-3.jpg",
  },
  {
    id: 4,
    name: "Client Name",
    profession: "Profession",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    image: "/assets/images/testimonial-4.jpg",
  },
  {
    id: 5,
    name: "Client Name",
    profession: "Profession",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    image: "/assets/images/testimonial-5.jpg",
  },
  {
    id: 6,
    name: "Client Name",
    profession: "Profession",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    image: "/assets/images/testimonial-6.jpg",
  },
];

const Testimonial: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3;
  const totalSlides = Math.ceil(testimonials.length / slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1,
    );
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-primary text-lg font-semibold uppercase mb-2">
            Testimonial
          </h6>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">
            What Our Clients Say
          </h1>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center">
            {testimonials
              .slice(
                currentSlide * slidesToShow,
                (currentSlide + 1) * slidesToShow,
              )
              .map((testimonial) => (
                <div key={testimonial.id} className="w-1/3 p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                    <img
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mb-4"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <h5 className="text-lg font-semibold mb-1">
                      {testimonial.name}
                    </h5>
                    <p className="text-sm text-gray-500 mb-4">
                      {testimonial.profession}
                    </p>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                </div>
              ))}
          </div>
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full"
            onClick={prevSlide}
          >
            &lt;
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
