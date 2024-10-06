import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../../components/Product";
import { fetchProducts, Product } from "../slice/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../drape/store";
import { toast } from "react-toastify";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector((state: RootState) => state.products);
  const categories = ["All", "Generators", "Accessories", "Parts"];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, error]);

  const filteredProducts =
    // selectedCategory && selectedCategory !== "All"
    //   ? products.filter((product: Product) => product.category === selectedCategory)
    products;

  return (
    <div className="container mx-auto p-4 flex-grow">
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
            className={`px-4 py-2 mx-2 rounded-full ${selectedCategory === category ? "bg-primary text-white" : "bg-white"}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="container text-center w-screen pt-10">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;

