import { motion } from "framer-motion";
import React from "react";
import { Service } from "../pages/slice/servicesSlice";

interface ServiceProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceProps> = ({ service }) => {
  return (
    <motion.div
      key={service.id}
      className="p-6 bg-white flex items-start gap-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon or Image on the Left */}
      <div className="flex-shrink-0 w-48 h-48 mr-6 mt-2">
        <img
          className="object-contain w-full h-full"
          src={service.image?.toString() ?? "No Image"}
          alt={service.title}
        />
      </div>

      {/* Service Details on the Right */}
      <div className="flex-grow border border-gray-100 p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Operation Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.operations.split(',').map((operation, index) => (
            <button
              key={index}
              className="border border-red-500 text-red-500 py-1 px-3 rounded-full text-xs hover:bg-red-500 hover:text-white transition-colors"
            >
              {operation.trim()}
            </button>
          ))}
        </div>

        {/* View Details Button */}
        <a
          href="#"
          className="inline-block text-red-500 border border-red-500 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors"
        >
          View Details
        </a>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

