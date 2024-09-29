import React, { useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

        {/* Hamburger Menu Icon for mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes className="text-2xl text-blue-500" />
            ) : (
              <FaBars className="text-2xl text-blue-500" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between space-x-8">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-lg"
                : "text-gray-700 hover:text-blue-500 font-medium text-lg"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-lg"
                : "text-gray-700 hover:text-blue-500 font-medium text-lg"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-lg"
                : "text-gray-700 hover:text-blue-500 font-medium text-lg"
            }
          >
            PRODUCTS
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-lg"
                : "text-gray-700 hover:text-blue-500 font-medium text-lg"
            }
          >
            SERVICES
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium text-lg"
                : "text-gray-700 hover:text-blue-500 font-medium text-lg"
            }
          >
            CONTACT
          </NavLink>

          <Link
            to="/quote"
            className="py-5 font-semibold flex items-center gap-1 bg-blue-500 text-white px-4 hover:bg-blue-600"
          >
            GET A QUOTE
            <FaArrowRight />
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
            <ul className="flex flex-col items-center py-5 space-y-4">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-medium text-lg"
                    : "text-gray-700 hover:text-blue-500 font-medium text-lg"
                }
                onClick={toggleMenu}
              >
                HOME
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-medium text-lg"
                    : "text-gray-700 hover:text-blue-500 font-medium text-lg"
                }
                onClick={toggleMenu}
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-medium text-lg"
                    : "text-gray-700 hover:text-blue-500 font-medium text-lg"
                }
                onClick={toggleMenu}
              >
                PRODUCTS
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-medium text-lg"
                    : "text-gray-700 hover:text-blue-500 font-medium text-lg"
                }
                onClick={toggleMenu}
              >
                SERVICES
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-medium text-lg"
                    : "text-gray-700 hover:text-blue-500 font-medium text-lg"
                }
                onClick={toggleMenu}
              >
                CONTACT
              </NavLink>

              <Link
                to="/quote"
                className="py-2 font-semibold flex items-center gap-1 bg-blue-500 text-white px-4 hover:bg-blue-600"
                onClick={toggleMenu}
              >
                GET A QUOTE
                <FaArrowRight />
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

