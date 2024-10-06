import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Topbar, Navbar, Footer } from "../../components";

// lazy loading components
const Home = lazy(() => import("../website/Home"));
const Services = lazy(() => import("../website/Services"));
const Products = lazy(() => import("../website/Products"));
const ProductDetails = lazy(() => import("../website/ProductDetails"));
const About = lazy(() => import("../website/About"));
const ContactUs = lazy(() => import("../website/Contact"));

function Main() {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <Topbar />
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default Main;
