import React from "react";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-800 shadow-sm p-4">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <hr className="border-gray-300 my-2" />
      <p className="text-gray-200">Welcome to your dashboard!</p>
    </header>
  );
};

export default DashboardHeader;

