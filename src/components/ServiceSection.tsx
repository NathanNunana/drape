import React from "react";
import { FaCertificate, FaUsersCog, FaTools } from "react-icons/fa";

const ServiceSection: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-sm flex items-start">
            <i className="text-blue-500 text-4xl mr-4">
              <FaCertificate />
            </i>
            <div>
              <h5 className="text-xl font-semibold mb-2">Quality Servicing</h5>
              <p className="text-gray-700 mb-2">
                Diam dolor diam ipsum sit amet diam et eos erat ipsum
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Read More
              </a>
            </div>
          </div>
          <div className="bg-white p-6 shadow-sm flex items-start">
            <i className="text-blue-500 text-4xl mr-4">
              <FaUsersCog />
            </i>
            <div>
              <h5 className="text-xl font-semibold mb-2">Expert Workers</h5>
              <p className="text-gray-700 mb-2">
                Diam dolor diam ipsum sit amet diam et eos erat ipsum
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Read More
              </a>
            </div>
          </div>
          <div className="bg-white p-6 shadow-sm flex items-start">
            <i className="text-blue-500 text-4xl mr-4">
              <FaTools />
            </i>
            <div>
              <h5 className="text-xl font-semibold mb-2">Modern Equipment</h5>
              <p className="text-gray-700 mb-2">
                Diam dolor diam ipsum sit amet diam et eos erat ipsum
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
