import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import ManageAboutUs from "./ManageAboutUs";
import ManageAddress from "./ManageAddress";
import ManageAnalytics from "./ManageAnalytics";
import ManageOpeningHours from "./ManageOpeningHours";
import Users from "./Users";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex">
          <li className="mx-4">
            <NavLink
              to="/dashboard/about-us"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white"
              }
            >
              About Us
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink
              to="/dashboard/address"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white"
              }
            >
              Address
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white"
              }
            >
              Analytics
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink
              to="/dashboard/opening-hours"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white"
              }
            >
              Opening Hours
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white"
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/about-us" element={<ManageAboutUs />} />
          <Route path="/address" element={<ManageAddress />} />
          <Route path="/analytics" element={<ManageAnalytics />} />
          <Route path="/opening-hours" element={<ManageOpeningHours />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
