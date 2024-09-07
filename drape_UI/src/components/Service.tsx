import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { ServiceData } from "../pages/website/Services";

interface ServiceProps {
  service: ServiceData;
}

const Service: React.FC<ServiceProps> = ({ service }) => {
  return (
    <>
      <motion.div
        key={service.id}
        className="p-4 bg-white shadow-sm rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <img
            className="w-full h-40 object-cover rounded-lg mb-4"
            src={service.image}
            alt={service.title}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white text-xl font-bold">
              {service.title}
            </h3>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-700 mb-4">{service.description}</p>
        <Link
          to={`/home/product/${service.id}`}
          className="inline-flex items-center py-2 px-4 bg-primary text-white rounded-lg w-full justify-center"
        >
          View Details
        </Link>
      </motion.div>
    </>
  );
};

export default Service;

