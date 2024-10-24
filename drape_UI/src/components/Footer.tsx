import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="">

      {/* Newsletter Section */}
      <div className="text-center py-28 bg-blue-50">
        <h3 className="text-2xl font-semibold mb-4">Join Our Newsletter</h3>
        <p className="mb-5 text-md">Join Our news letters today</p>
        <div className="max-w-md mx-auto relative">
          <input
            type="email"
            className="w-full py-2 px-4 text-gray-700 border rounded-md"
            placeholder="enter email"
          />
          <button className="absolute top-0 bottom-0 right-0 mt-0 mb-0 px-6 py-2 bg-red-500 text-white rounded-r-md">
            Subscribe
          </button>
        </div>
      </div>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto text-gray-700 px-8 lg:px-48">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            {/* TPSL Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">TPSL</h4>
              <p>P. O. Box YK 534 Bono - Sunyani Ghana</p>
              <p className="flex items-center mt-2">
                <FaPhoneAlt className="mr-2" />
                233207781224
              </p>
              <p className="flex items-center mt-2">
                <FaEnvelope className="mr-2" />
                admin@drape.com
              </p>
            </div>

            {/* Useful Links Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-red-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Take a Survey
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Our Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Customer Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Job Opening
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Service Packages
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Products
                  </a>
                </li>
              </ul>
            </div>

            {/* Products Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-red-500">
                    RS 30DT Automatic Transmission Cleaning Machine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    RS A7 CCD Wheel Alignment Machine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    RS 250E Two Post Electric Car Lift
                  </a>
                </li>
              </ul>
              <h4 className="text-lg font-semibold mt-6 mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-red-500">
                    Top Mounting Replacement
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Ball Joint Replacement
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Steering Rack Replacement
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Networks Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Social Networks</h4>
              <p>Find us on our social media Platforms</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="text-center text-gray-500 mt-10">
            <hr className="mb-4" />
            <p>&copy; Drape, All Rights Reserved. <br /> Designed by <a href="#" className="text-red-500">Nathan Kulewoshie</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

