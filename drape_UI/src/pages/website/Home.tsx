import React from "react";
import {
  Carousel,
  ServiceSection,
  About,
  Fact,
  Service,
  Booking,
  Technician,
  Testimonial,
} from "../../components";

const Home: React.FC = () => {
  return (
    <>
      <Carousel />
      <ServiceSection />
      <About />
      <Fact />
      <Service />
      <Booking />
      <Technician />
      <Testimonial />
    </>
  );
};

export default Home;
