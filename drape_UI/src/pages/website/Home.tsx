import React from "react";
import {
  Carousel,
  ServiceSection,
  About,
  Fact,
  // Service,
  // Booking,
  // Testimonial,
} from "../../components";

const Home: React.FC = () => {
  return (
    <>
      <Carousel />
      <ServiceSection />
      <About />
      <Fact />
      {/* <Service /> */}
      {/* <Booking /> */}
      {/* <Testimonial /> */}
    </>
  );
};

export default Home;
