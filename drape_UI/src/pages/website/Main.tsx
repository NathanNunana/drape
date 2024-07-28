import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Topbar, Navbar, Footer } from "../../components";

// lazy loading components
const Home = lazy(() => import("../website/Home"));
const Services = lazy(() => import("../website/Services"));
const About = lazy(() => import("../website/About"));
const ContactUs = lazy(() => import("../website/Contact"));

function Main() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default Main;
