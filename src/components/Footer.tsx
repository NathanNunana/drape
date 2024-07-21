import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="bg-dark text-white py-5 mt-5">
      <div className="container py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-center md:text-left">
          <div className="space-y-4">
            <h4 className="text-xl mb-4">Address</h4>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <FaMapMarkerAlt className="mr-3" />
              123 Street, New York, USA
            </p>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <FaPhoneAlt className="mr-3" />
              +012 345 67890
            </p>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <FaEnvelope className="mr-3" />
              info@example.com
            </p>
            <div className="flex justify-center md:justify-start gap-2 pt-2">
              <a className="btn btn-outline-light" href="#">
                <FaTwitter />
              </a>
              <a className="btn btn-outline-light" href="#">
                <FaFacebookF />
              </a>
              <a className="btn btn-outline-light" href="#">
                <FaYoutube />
              </a>
              <a className="btn btn-outline-light" href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl mb-4">Opening Hours</h4>
            <h6>Monday - Friday:</h6>
            <p>09.00 AM - 09.00 PM</p>
            <h6>Saturday - Sunday:</h6>
            <p>09.00 AM - 12.00 PM</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl mb-4">Services</h4>
            <a className="block hover:underline mb-2" href="">
              Diagnostic Test
            </a>
            <a className="block hover:underline mb-2" href="">
              Engine Servicing
            </a>
            <a className="block hover:underline mb-2" href="">
              Tires Replacement
            </a>
            <a className="block hover:underline mb-2" href="">
              Oil Changing
            </a>
            <a className="block hover:underline" href="">
              Vacuum Cleaning
            </a>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl mb-4">Newsletter</h4>
            <p className="mb-4">
              Dolor amet sit justo amet elitr clita ipsum elitr est.
            </p>
            <div className="relative max-w-xs mx-auto md:mx-0">
              <input
                className="form-control border-0 w-full py-3 px-4 placeholder:text-gray-500"
                type="email"
                placeholder="Your email"
              />
              <button
                type="button"
                className="absolute top-0 right-0 mt-2 px-4 py-2 bg-primary text-white"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-3 md:mb-0">
            &copy;{" "}
            <a className="border-b" href="#">
              Your Site Name
            </a>
            , All Rights Reserved.
            <br />
            Designed By{" "}
            <a className="border-b" href="https://htmlcodex.com">
              HTML Codex
            </a>
          </div>
          <div>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="">Home</a>
              <a href="">Cookies</a>
              <a href="">Help</a>
              <a href="">FQAs</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
