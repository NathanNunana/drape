import React, { useState } from "react";
import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import ManageAboutUs from "./ManageAboutUs";
import ManageAddress from "./ManageAddress";
import ManageAnalytics from "./ManageAnalytics";
import ManageOpeningHours from "./ManageOpeningHours";
import ManageProducts from "./ManageProducts";
import ManageServices from "./ManageServices";
import ManageServiceTypes from "./ManageServicesTypes";
import {
  FaChevronDown,
  FaChevronRight,
  FaUserFriends,
  FaFileAlt,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";

// Define type for expanded menu state
type ExpandedMenus = {
  basicInfo: boolean;
  products: boolean;
  services: boolean;
};

const Dashboard: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenus>({
    basicInfo: false,
    products: false,
    services: false,
  });

  const toggleMenu = (menuKey: keyof ExpandedMenus) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-primary text-white shadow-md">
        <div className="flex items-center space-x-4">
          <p>Drape Dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaUserCircle className="cursor-pointer hover:text-gray-200" />
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white p-4 shadow-md flex-shrink-0 border-r border-gray-200">
          {/* Sidebar Menu */}
          <nav className="space-y-4 mt-4">
            <ul className="space-y-4">
              {/* Basic Info Menu */}
              <li>
                <div className="flex flex-col">
                  <button
                    className="flex items-center justify-between w-full p-3 text-primary hover:bg-primary_light rounded-lg"
                    onClick={() => toggleMenu("basicInfo")}
                  >
                    <div className="flex items-center space-x-2">
                      <FaUserFriends />
                      <span>Basic Info</span>
                    </div>
                    {expandedMenus.basicInfo ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                  <ul className={`${expandedMenus.basicInfo ? "block" : "hidden"} ml-6 mt-2 space-y-1`}>
                    <li>
                      <NavLink
                        to="/dashboard/about-us"
                        className={({ isActive }) =>
                          `block p-2 rounded-md hover:bg-primary_light ${isActive ? "bg-primary_light text-primary font-semibold" : "text-gray-600"
                          }`
                        }
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/address"
                        className={({ isActive }) =>
                          `block p-2 rounded-md hover:bg-primary_light ${isActive ? "bg-primary_light text-primary font-semibold" : "text-gray-600"
                          }`
                        }
                      >
                        Address
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/analytics"
                        className={({ isActive }) =>
                          `block p-2 rounded-md hover:bg-primary_light ${isActive ? "bg-primary_light text-primary font-semibold" : "text-gray-600"
                          }`
                        }
                      >
                        Analytics
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/opening-hours"
                        className={({ isActive }) =>
                          `block p-2 rounded-md hover:bg-primary_light ${isActive ? "bg-primary_light text-primary font-semibold" : "text-gray-600"
                          }`
                        }
                      >
                        Opening Hours
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Products Menu */}
              <li>
                <div className="flex flex-col">
                  <button
                    className="flex items-center justify-between w-full p-3 text-primary hover:bg-primary-light rounded-lg"
                    onClick={() => toggleMenu("products")}
                  >
                    <div className="flex items-center space-x-2">
                      <FaFileAlt />
                      <span>Products</span>
                    </div>
                    {expandedMenus.products ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                  <ul className={`${expandedMenus.products ? "block" : "hidden"} ml-6 mt-2 space-y-1`}>
                    <li>
                      <NavLink
                        to="/dashboard/products"
                        className={({ isActive }) =>
                          `block p-2 rounded-md hover:bg-primary_light ${isActive ? "bg-primary_light text-primary font-semibold" : "text-gray-600"
                          }`
                        }
                      >
                        Manage Products
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Services Menu */}
              <li>
                <div className="flex flex-col">
                  <button
                    className="flex items-center justify-between w-full p-3 text-primary hover:bg-primary-light rounded-lg"
                    onClick={() => toggleMenu("services")}
                  >
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt />
                      <span>Services</span>
                    </div>
                    {expandedMenus.services ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                  <ul className={`${expandedMenus.services ? "block" : "hidden"} ml-6 mt-2 space-y-1`}>
                    <li>
                      <NavLink
                        to="/dashboard/services"
                        className={({ isActive }) =>
                          `block p-2 rounded-md hover:bg-primary_light ${isActive ? "bg-primary_light text-primary font-semibold" : "text-gray-600"
                          }`
                        }
                      >
                        Manage Services
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/services/types"
                        className={({ isActive }) =>
                          `block p-2 rounded-md hover:bg-primary_light ${isActive ? "bg-primary_light text-primary font-semibold" : "text-gray-600"
                          }`
                        }
                      >
                        Service Types
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 overflow-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/about-us" />} />
            <Route path="/about-us" element={<ManageAboutUs />} />
            <Route path="/address" element={<ManageAddress />} />
            <Route path="/analytics" element={<ManageAnalytics />} />
            <Route path="/opening-hours" element={<ManageOpeningHours />} />
            <Route path="/products" element={<ManageProducts />} />
            <Route path="/services" element={<ManageServices />} />
            <Route path="/services/types" element={<ManageServiceTypes />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
