import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="pl-10 flex items-center text-blue-500 text-xl font-semibold"
        >
          <i className="fas fa-car mr-3"></i>
          <span className="py-5 lg:py-0">Drape</span>
        </Link>
        <div className="flex flex-row gap-5">
          <div className="hidden lg:flex items-center justify-between space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-medium text-sm"
                  : "text-gray-700 hover:text-blue-500 font-medium text-sm"
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/home/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-medium text-sm"
                  : "text-gray-700 hover:text-blue-500 font-medium text-sm"
              }
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/home/services"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-medium text-sm"
                  : "text-gray-700 hover:text-blue-500 font-medium text-sm"
              }
            >
              SERVICES
            </NavLink>
            <NavLink
              to="/home/contact-us"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-medium text-sm"
                  : "text-gray-700 hover:text-blue-500 font-medium text-sm"
              }
            >
              CONTACT
            </NavLink>
          </div>
          <Link
            to="/home/quote"
            className="hidden py-5 font-semibold lg:flex lg:items-center lg:gap-1 bg-blue-500 text-white px-4 hover:bg-blue-600"
          >
            GET A QUOTE{" "}
            <i className="ml-2">
              <FaArrowRight />
            </i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
