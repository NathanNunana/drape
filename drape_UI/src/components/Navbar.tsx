import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 py-5">
      <div className="flex items-center justify-between container mx-auto px-8 lg:px-32">
        <Link to="/" className="text-red-600 text-2xl font-extrabold">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </Link>

        {/* Hamburger Menu Icon for mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-2xl text-red-600">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 items-center">
          {['Home', 'Our Services', 'Products', 'Our Team', 'Service Packages', 'About Us', 'Contact'].map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.replace(/\s+/g, '-').toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-normal text-sm border-b-2 border-red-600 tracking-wide"
                  : "text-gray-800 hover:text-red-600 font-normal text-sm tracking-wide"
              }
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md p-5">
          <ul className="flex flex-col items-center space-y-4">
            {['Home', 'Our Services', 'Products', 'Blog', 'Our Team', 'Service Packages', 'About Us', 'Contact'].map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-gray-800 hover:text-red-600 font-semibold text-lg tracking-wide"
                onClick={toggleMenu}
              >
                {item}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

