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
  const categories = ["Generators", "Accessories", "Parts"];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, error]);

  // Toggle category selection
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1); // Reset to page 1 when categories change
  };

  // Filter products based on selected categories and search term
  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return matchesSearch && matchesCategory;
  });

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <div className="container mx-auto text-left mb-5 text-gray-500 px-8 lg:px-48 py-5">
          <p className="text-sm">
            <span className="text-red-500">Home</span> / Our Products
          </p>
        </div>
      </div>

      <div>
        <div className="container mx-auto p-4 flex-grow px-8 lg:px-48">
          <motion.h1
            className="text-3xl mb-6 text-left font-semibold text-red-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gray-700">Our</span> Products
          </motion.h1>

          {/* Search Bar and Filter */}
          <div className="flex mb-6 items-center">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

  
            {/* Filter Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 ml-4 bg-white border border-gray-300 rounded-lg shadow-sm"
              >
                Filter Categories
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                >
                  <div className="py-1">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <input
                          type="checkbox"
                          className="form-checkbox mr-2"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>



          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full min-h-[300px]">
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center">
                  <img src="assets/images/notfound.png" alt="No Item" className="mb-4" />
                  <p className="text-gray-700 font-semibold text-center">No products available.</p>
                </div>
              </div>
            )}
          </div>



          {/* Pagination */}
          <div className="mt-8 flex justify-center space-x-2">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === page + 1 ? "bg-red-500 text-white" : "bg-white border border-gray-300"}`}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

