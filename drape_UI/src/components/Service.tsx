import { motion } from "framer-motion";
import React from "react";
import { Service } from "../pages/slice/servicesSlice";

interface ServiceProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceProps> = ({ service }) => {
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
            src={service.image?.toString() ?? "No Image"}
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
        <p className="text-gray-700 mb-4">{service.operations}</p>
      </motion.div>
    </>
  );
};

export default ServiceCard;

