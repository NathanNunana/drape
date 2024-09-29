import React, { useState } from "react";
import { motion } from "framer-motion";
import Product from "../../components/Product";

export interface ProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  generalInfo: { label: string; value: string }[]; // For specifications
}

const productData: ProductData[] = [
  {
    id: 1,
    title: "50 kVA 3 Phase FAW Power Generator",
    description:
      "A silent weather-resistant power generator with a 50kVA prime power rating.",
    image: "/assets/images/service-1.jpg",
    category: "Generators",
    features: ["Canopy Type: Silent", "Fuel Consumption @ 75% Load: 9.21 l/h"],
    generalInfo: [
      { label: "Canopy Type", value: "Silent weather resistant enclosure" },
      { label: "Noise Rating", value: "Semi-silent" },
      { label: "Dry Weight", value: "1036kg" },
    ],
  },
  {
    id: 1,
    title: "50 kVA 3 Phase FAW Power Generator",
    description:
      "A silent weather-resistant power generator with a 50kVA prime power rating.",
    image: "/assets/images/product-1.jpg",
    category: "Generators",
    features: ["Canopy Type: Silent", "Fuel Consumption @ 75% Load: 9.21 l/h"],
    generalInfo: [
      { label: "Canopy Type", value: "Silent weather resistant enclosure" },
      { label: "Noise Rating", value: "Semi-silent" },
      { label: "Dry Weight", value: "1036kg" },
    ],
  },
  {
    id: 1,
    title: "50 kVA 3 Phase FAW Power Generator",
    description:
      "A silent weather-resistant power generator with a 50kVA prime power rating.",
    image: "/assets/images/product-1.jpg",
    category: "Generators",
    features: ["Canopy Type: Silent", "Fuel Consumption @ 75% Load: 9.21 l/h"],
    generalInfo: [
      { label: "Canopy Type", value: "Silent weather resistant enclosure" },
      { label: "Noise Rating", value: "Semi-silent" },
      { label: "Dry Weight", value: "1036kg" },
    ],
  },
  {
    id: 1,
    title: "50 kVA 3 Phase FAW Power Generator",
    description:
      "A silent weather-resistant power generator with a 50kVA prime power rating.",
    image: "/assets/images/product-1.jpg",
    category: "Generators",
    features: ["Canopy Type: Silent", "Fuel Consumption @ 75% Load: 9.21 l/h"],
    generalInfo: [
      { label: "Canopy Type", value: "Silent weather resistant enclosure" },
      { label: "Noise Rating", value: "Semi-silent" },
      { label: "Dry Weight", value: "1036kg" },
    ],
  },

  // Add more products with categories
];
const Products: React.FC = () => {
  const categories = ["All", "Generators", "Accessories", "Parts"];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0])

  const filteredProducts = selectedCategory && selectedCategory !== "All"
    ? productData.filter(product => product.category === selectedCategory)
    : productData;

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        OUR PRODUCTS
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
        {filteredProducts.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

