import React from "react";
import { motion } from "framer-motion";

// Define a type for your service data
interface ServiceData {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
}

// Sample data for the services
const serviceData: ServiceData[] = [
  {
    id: 1,
    title: "Diagnostic Test",
    description:
      "Identify issues quickly and accurately with our diagnostic tests.",
    image: "/assets/images/service-1.jpg",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 2,
    title: "Engine Servicing",
    description:
      "Ensure smooth performance with our comprehensive engine servicing.",
    image: "/assets/images/service-2.jpg",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 3,
    title: "Tires Replacement",
    description: "Replace tires efficiently to ensure a safer drive.",
    image: "/assets/images/service-3.jpg",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 4,
    title: "Oil Changing",
    description: "Keep your engine running smoothly with regular oil changes.",
    image: "/assets/images/service-4.jpg",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
];

const Services: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceData.map((service) => (
          <motion.div
            key={service.id}
            className="p-4 bg-white shadow-lg rounded-lg"
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
            <ul className="list-disc pl-5 mb-4">
              {service.features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex items-center py-2 px-4 bg-primary text-white rounded-lg"
            >
              Read More
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
