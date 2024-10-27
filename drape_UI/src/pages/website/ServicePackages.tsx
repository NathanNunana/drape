
import React from "react";
import { Booking } from "../../components";

const ServicePackages: React.FC = () => {
  return (
    <div>
      <div className="bg-gray-50">
        <div className="container mx-auto text-left mb-5 text-gray-500 px-8 lg:px-48 py-5">
          <p className="text-sm">
            <span className="text-primary">Home</span> / Service Packages
          </p>
        </div>
      </div>
      <div className="mx-auto container px-8 lg:px-48">
        {/* Header */}
        <Booking />
      </div>
    </div>
  );
};

export default ServicePackages;

