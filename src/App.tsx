import "./App.css";
import {
  Topbar,
  Navbar,
  Carousel,
  ServiceSection,
  Footer,
  About,
  Fact,
  Service,
  Booking,
  Technician,
  Testimonial,
} from "./components";

function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Carousel />
      <ServiceSection />
      <About />
      <Fact />
      <Service />
      <Booking />
      <Technician />
      <Testimonial />
      <Footer />
    </>
  );
}

export default App;
