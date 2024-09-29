import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { ProductData } from "../pages/website/Products";

interface ProductProps {
  product: ProductData;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <>
      <motion.div
        key={product.id}
        className="p-4 bg-white shadow-sm rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <img
            className="w-full h-40 object-cover rounded-lg mb-4"
            src={product.image}
            alt={product.title}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white text-xl font-bold">
              {product.title}
            </h3>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <Link
          to={`/home/product/${product.id}`}
          className="inline-flex items-center py-2 px-4 bg-primary text-white rounded-lg w-full justify-center"
        >
          View Details
        </Link>
      </motion.div>
    </>
  );
};

export default Product;

