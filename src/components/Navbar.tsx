import React from "react";
import { FaArrowRight } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <a
          href="#"
          className="pl-10 flex items-center text-blue-500 text-xl font-semibold"
        >
          <i className="fas fa-car mr-3"></i>
          <span className="py-5 lg:py-0">Drape</span>
        </a>
        <div className="flex flex-row gap-5">
          <div className="hidden lg:flex items-center justify-between space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 font-medium text-sm"
            >
              HOME
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 font-medium text-sm"
            >
              ABOUT
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 font-medium text-sm"
            >
              SERVICES
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 font-medium text-sm"
            >
              CONTACT
            </a>
          </div>
          <a
            href="#"
            className="hidden py-5 font-semibold lg:flex lg:items-center lg:gap-1 bg-blue-500 text-white px-4 hover:bg-blue-600"
          >
            GET A QUOTE <i className="ml-2"><FaArrowRight /></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
