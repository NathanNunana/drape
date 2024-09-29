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
    <div
      className="relative bg-cover bg-center text-white py-10"
      style={{
        backgroundImage: `url('/assets/images/footer.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Address Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Address</h4>
            <p className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="mr-3" />
              123 Street, New York, USA
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-3" />
              +012 345 67890
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-3" />
              info@example.com
            </p>
            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start space-x-4 pt-2">
              <a
                className="p-2 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors"
                href="#"
              >
                <FaTwitter />
              </a>
              <a
                className="p-2 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors"
                href="#"
              >
                <FaFacebookF />
              </a>
              <a
                className="p-2 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors"
                href="#"
              >
                <FaYoutube />
              </a>
              <a
                className="p-2 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors"
                href="#"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-2">
            <h4 className="text-xl font-semibold mb-4">Opening Hours</h4>
            <h6>Monday - Friday:</h6>
            <p>09:00 AM - 09:00 PM</p>
            <h6>Saturday - Sunday:</h6>
            <p>09:00 AM - 12:00 PM</p>
          </div>

          {/* Services Section */}
          <div className="space-y-2">
            <h4 className="text-xl font-semibold mb-4">Services</h4>
            <a className="block hover:underline mb-2" href="#">
              Diagnostic Test
            </a>
            <a className="block hover:underline mb-2" href="#">
              Engine Servicing
            </a>
            <a className="block hover:underline mb-2" href="#">
              Tires Replacement
            </a>
            <a className="block hover:underline mb-2" href="#">
              Oil Changing
            </a>
            <a className="block hover:underline" href="#">
              Vacuum Cleaning
            </a>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">
              Stay updated with our latest news and offers.
            </p>
            <div className="relative max-w-xs mx-auto md:mx-0">
              <input
                className="form-control border-0 w-full py-3 px-4 text-gray-700 placeholder-gray-500"
                type="email"
                placeholder="Your email"
              />
              <button
                type="button"
                className="absolute top-0 bottom-0 right-0 mt-0 px-4 py-2 bg-primary text-white"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative container mx-auto py-4">
        <hr className="border-gray-600 mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-3 md:mb-0">
            &copy;{" "}
            <a className="border-b hover:text-primary" href="#">
              Your Site Name
            </a>
            , All Rights Reserved.
            <br />
            Designed by{" "}
            <a className="border-b hover:text-primary" href="https://htmlcodex.com">
              Nathan & Sebastian
            </a>
          </div>
          <div>
            <div className="flex justify-center md:justify-end space-x-4">
              <a className="hover:text-primary" href="#">Home</a>
              <a className="hover:text-primary" href="#">Cookies</a>
              <a className="hover:text-primary" href="#">Help</a>
              <a className="hover:text-primary" href="#">FQAs</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

