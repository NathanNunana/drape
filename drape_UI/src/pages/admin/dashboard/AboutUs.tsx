import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Articles from "./Articles";
import Users from "./Users";
import Settings from "./Settings";
import AboutUs from "./AboutUs";
import AboutUsDropdown from "./AboutUsDropdown";
import ManageMotor from "./ManageMotor";
import ManageCompanyDescription from "./ManageCompanyDescription";
import ManageAddress from "./ManageAddress";
import ManageAnalytics from "./ManageAnalytics";
import ManageOpeningHours from "./ManageOpeningHours";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex">
          <li className="mx-4">
            <NavLink
              to="/dashboard/"
              className={({ isActive }) =>
                `text-white ${isActive ? "text-blue-500" : ""}`
              }
            >
              Manage Articles
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `text-white ${isActive ? "text-blue-500" : ""}`
              }
            >
              Manage Users
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `text-white ${isActive ? "text-blue-500" : ""}`
              }
            >
              Settings
            </NavLink>
          </li>
          <li className="mx-4 relative">
            <AboutUsDropdown />
          </li>
        </ul>
      </nav>
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about-us/*" element={<AboutUs />}>
            <Route path="motor" element={<ManageMotor />} />
            <Route
              path="company-description"
              element={<ManageCompanyDescription />}
            />
            <Route path="address" element={<ManageAddress />} />
            <Route path="analytics" element={<ManageAnalytics />} />
            <Route path="opening-hours" element={<ManageOpeningHours />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
