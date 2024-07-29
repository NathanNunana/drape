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

const Services: React.FC = () => {
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

export default Services;
