import "./App.css";
import {
  Topbar,
  Navbar,
  Carousel,
  ServiceSection,
  Footer,
  About,
} from "./components";

function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Carousel />
      <ServiceSection />
      <About />
      <Footer />
    </>
  );
}

export default App;
