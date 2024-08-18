import React, { useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import ManageAboutUs from "./ManageAboutUs";
import ManageAddress from "./ManageAddress";
import ManageAnalytics from "./ManageAnalytics";
import ManageOpeningHours from "./ManageOpeningHours";
import ManageProducts from "./ManageProducts";
import ManageServices from "./ManageServices";
import ManageServiceTypes from "./ManageServicesTypes";
// import Users from "./Users";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({
    basicInfo: false,
    products: false,
    services: false,
  });

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <nav className="bg-gray-800 text-white w-full md:w-64 p-4 md:fixed md:h-full md:flex-col">
        <ul className="space-y-4">
          <li className="mb-4 md:mb-0">
            <div className="group">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleMenu("basicInfo")}
              >
                <span>Basic Info</span>
                {expandedMenus.basicInfo ? (
                  <FaChevronDown className="ml-2" />
                ) : (
                  <FaChevronRight className="ml-2" />
                )}
              </button>
              <ul
                className={`pl-4 mt-2 space-y-2 ${expandedMenus.basicInfo ? "block" : "hidden"}`}
              >
                <li>
                  <NavLink
                    to="/dashboard/about-us"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : "text-white"
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/address"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : "text-white"
                    }
                  >
                    Address
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : "text-white"
                    }
                  >
                    Analytics
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/opening-hours"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : "text-white"
                    }
                  >
                    Opening Hours
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          {/* <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white"
              }
            >
              Users
            </NavLink>
          </li> */}
          <li>
            <div className="group">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleMenu("products")}
              >
                <span>Products</span>
                {expandedMenus.products ? (
                  <FaChevronDown className="ml-2" />
                ) : (
                  <FaChevronRight className="ml-2" />
                )}
              </button>
              <ul
                className={`pl-4 mt-2 space-y-2 ${expandedMenus.products ? "block" : "hidden"}`}
              >
                <li>
                  <NavLink
                    to="/dashboard/products"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : "text-white"
                    }
                  >
                    Manage Products
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="group">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleMenu("services")}
              >
                <span>Services</span>
                {expandedMenus.services ? (
                  <FaChevronDown className="ml-2" />
                ) : (
                  <FaChevronRight className="ml-2" />
                )}
              </button>
              <ul
                className={`pl-4 mt-2 space-y-2 ${expandedMenus.services ? "block" : "hidden"}`}
              >
                <li>
                  <NavLink
                    to="/dashboard/services"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : "text-white"
                    }
                  >
                    Manage Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/services/types"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : "text-white"
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
      <div className="flex-grow p-4 md:ml-64 mt-16 md:mt-0">
        <Routes>
          <Route path="/about-us" element={<ManageAboutUs />} />
          <Route path="/address" element={<ManageAddress />} />
          <Route path="/analytics" element={<ManageAnalytics />} />
          <Route path="/opening-hours" element={<ManageOpeningHours />} />
          <Route path="/products" element={<ManageProducts />} />
          <Route path="/services" element={<ManageServices />} />
          <Route path="/services/types" element={<ManageServiceTypes />} />
          {/* <Route path="/users" element={<Users />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
