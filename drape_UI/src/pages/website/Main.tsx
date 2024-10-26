import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Topbar, Navbar, Footer } from "../../components";
import { TopLoader } from "../../components/Loaders";

// lazy loading components
const Home = lazy(() => import("./Home"));
const Services = lazy(() => import("./Services"));
const Products = lazy(() => import("./Products"));
const ProductDetails = lazy(() => import("./ProductDetails"));
const About = lazy(() => import("./About"));
const ContactUs = lazy(() => import("./Contact"));
const Team = lazy(() => import("./Team"));
const ServicePackages = lazy(() => import("./ServicePackages"))

function Main() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Topbar />
      <Navbar />
      <main>
        <Suspense fallback={TopLoader()}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/our-services" element={<Services />} />
            <Route path="/our-team" element={<Team />} />
            <Route path="/service-packages" element={<ServicePackages />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Suspense >
      </main>
      <Footer />
    </div >
  );
}

export default Main;
