import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCarSide,
  FaCar,
  FaCog,
  FaOilCan,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";

interface ServiceType {
  id: number;
  icon: JSX.Element;
  title: string;
  image: string;
  description: string;
  features: string[];
}

const services: ServiceType[] = [
  {
    id: 1,
    icon: <FaCarSide size={40} />,
    title: "Diagnostic Test",
    image: "/assets/images/service-1.jpg",
    description:
      "Our diagnostic test helps identify issues quickly and accurately.",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 2,
    icon: <FaCar size={40} />,
    title: "Engine Servicing",
    image: "/assets/images/service-2.jpg",
    description: "Comprehensive engine servicing to ensure smooth performance.",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 3,
    icon: <FaCog size={40} />,
    title: "Tires Replacement",
    image: "/assets/images/service-3.jpg",
    description: "Efficient tire replacement services for a safer drive.",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 4,
    icon: <FaOilCan size={40} />,
    title: "Oil Changing",
    image: "/assets/images/service-4.jpg",
    description: "Regular oil changes to keep your engine running smoothly.",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
];

const Service: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-6">
        <motion.h6
          className="text-primary text-lg font-semibold uppercase mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h6>
        <motion.h1
          className="text-3xl lg:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Services
        </motion.h1>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/3 px-4">
          <div className="flex flex-col">
            {services.map((service) => (
              <button
                key={service.id}
                className={`p-4 mb-4 flex items-center text-start ${
                  activeTab === service.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => setActiveTab(service.id)}
                type="button"
              >
                <div className="mr-3">{service.icon}</div>
                <h4 className="m-0">{service.title}</h4>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-2/3 px-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={`${
                activeTab === service.id ? "block" : "hidden"
              } transition-opacity duration-500`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                  <div className="relative w-full h-64">
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      src={service.image}
                      alt={service.title}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-4 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="mb-4">{service.description}</p>
                  {service.features.map((feature, index) => (
                    <p key={index} className="flex items-center mb-2">
                      <FaCheck className="text-green-500 mr-2" /> {feature}
                    </p>
                  ))}
                  <a
                    href="#"
                    className="inline-flex items-center py-2 px-4 mt-4 bg-primary text-white rounded-lg"
                  >
                    Read More <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
