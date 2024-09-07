import React, { useState } from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "../../components";

// Define a type for your service data
export interface ServiceData {
  id: number;
  title: string;
  description: string;
  category: string;
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
    category: "Generators",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 2,
    title: "Engine Servicing",
    description:
      "Ensure smooth performance with our comprehensive engine servicing.",
    image: "/assets/images/service-2.jpg",
    category: "Generators",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 3,
    title: "Tires Replacement",
    description: "Replace tires efficiently to ensure a safer drive.",
    image: "/assets/images/service-3.jpg",
    category: "Generators",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
  {
    id: 4,
    title: "Oil Changing",
    description: "Keep your engine running smoothly with regular oil changes.",
    category: "Generators",
    image: "/assets/images/service-4.jpg",
    features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
  },
];

const Services: React.FC = () => {

  const categories = ["All", "Generators", "Accessories", "Parts"];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0])

  const filteredServices = selectedCategory && selectedCategory !== "All"
    ? serviceData.filter(service => service.category === selectedCategory)
    : serviceData;

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        OUR SERVICES
      </motion.h1>

      {/* Category Filter */}
      <div className="mb-6 text-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 mx-2 rounded-full ${selectedCategory === category ? "bg-primary text-white" : "bg-white"
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
