import { Routes, Route } from "react-router-dom";
import { Topbar, Navbar, Footer } from "../../components";
import { Home, Services, About, ContactUs } from "./index";

function Main() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/services" Component={Services} />
        <Route path="/about" Component={About} />
        <Route path="/contact-us" Component={ContactUs} />
      </Routes>
      <Footer />
    </>
  );
}

export default Main;
