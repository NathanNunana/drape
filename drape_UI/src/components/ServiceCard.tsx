import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  features,
}) => {
  return (
    <motion.div
      className="p-4 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-48 mb-4">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          src={image}
          alt={title}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <ul className="list-disc list-inside mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-1">
            <FaCheck className="text-green-500 mr-2" /> {feature}
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="inline-flex items-center py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        Read More
      </a>
    </motion.div>
  );
};

export default ServiceCard;
