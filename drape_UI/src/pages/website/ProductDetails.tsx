import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../slice/productsSlice";

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const { product } = location.state as { product: Product }; // Type the location state
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="bg-gray-50">
        <div className="container mx-auto text-left mb-5 text-gray-500 px-8 lg:px-48 py-5">
          <p className="text-sm">
            <span className="text-red-500">Home</span> / <span className="text-gray-800"> Product </span> / {product.name}
          </p>
        </div>
      </div>
      <div className="container mx-auto p-4 px-8 lg:px-48">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <img
              className="w-full h-60 object-cover rounded-lg" // Adjust height and ensure the image covers the area
              src={typeof product.image === "string" ? product.image : ""}
              alt={product.name}
            />
          </div>
          <div className="md:w-1/2 p-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <h2 className="text-xl font-semibold mb-2">General Information:</h2>
            <ul className="list-disc pl-5 mb-4">
              <li className="text-gray-600"><strong>Base Type:</strong> {product.base_type}</li>
              <li className="text-gray-600"><strong>Color:</strong> {product.color}</li>
              <li className="text-gray-600"><strong>Warranty Duration:</strong> {product.warranty_duration} months</li>
            </ul>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <ul className="flex">
            <li className={`mr-6 ${activeTab === "description" ? "border-b-4 border-red-500" : ""}`}>
              <button
                className="py-2 px-4 text-xl font-semibold"
                onClick={() => handleTabClick("description")}
              >
                Description
              </button>
            </li>
            <li className={`mr-6 ${activeTab === "specifications" ? "border-b-4 border-red-500" : ""}`}>
              <button
                className="py-2 px-4 text-xl font-semibold"
                onClick={() => handleTabClick("specifications")}
              >
                Specifications
              </button>
            </li>
          </ul>
        </div>

        {/* Description Tab */}
        {activeTab === "description" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Generator Parameters:</h2>
            <table className="table-auto w-full mb-4">
              <tbody>
                {Object.entries(product.specifications.basic_generator_parameters).map(([key, value], index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{key.replace(/_/g, " ")}</td>
                    <td className="border border-gray-300 px-4 py-2">{value || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Engine Specifications:</h2>
            <table className="table-auto w-full mb-4">
              <tbody>
                {Object.entries(product.specifications.engine_specification).map(([key, value], index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{key.replace(/_/g, " ")}</td>
                    <td className="border border-gray-300 px-4 py-2">{value || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Alternator Specifications:</h2>
            <table className="table-auto w-full mb-4">
              <tbody>
                {Object.entries(product.specifications.alternator_specification).map(([key, value], index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{key.replace(/_/g, " ")}</td>
                    <td className="border border-gray-300 px-4 py-2">{value || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <div className="flex justify-between">
              {/* <p>{product.specifications.pdfDescription || 'No PDF Description available.'}</p> */}
              <button className="inline-flex items-center py-2 px-4 bg-red-500 text-white rounded-lg">
                Download
              </button>
            </div>
          </div>
        )}

        {/* Related Products Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Uncomment this block when related products are available */}
            {/* {product.relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

