import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/Product";
import { ProductData } from "./Products";

// Define a type for your product data
interface ProductDetailData {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  generalInfo: { label: string; value: string }[];
  specifications: {
    basicDescription: { label: string; value: string }[];
    engineSpecifications: { label: string; value: string }[];
    alternatorSpecifications: { label: string; value: string }[];
  };
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
];


// Sample data for the products
const productDetailData: ProductDetailData[] = [
  {
    id: 1,
    title: "50 kVA 3 Phase FAW Power Generator",
    description:
      "A silent weather-resistant power generator with a 50kVA prime power rating.",
    image: "/assets/images/product-1.jpg",
    features: ["Canopy Type: Silent", "Fuel Consumption @ 75% Load: 9.21 l/h"],
    generalInfo: [
      { label: "Canopy Type", value: "Silent weather resistant enclosure" },
      { label: "Noise Rating", value: "Semi-silent" },
      { label: "Dry Weight", value: "1036kg" },
    ],
    specifications: {
      basicDescription: [
        { label: "PRIME POWER", value: "9kVA" },
        { label: "STANDBY POWER", value: "10kVA" },
        { label: "PHASE", value: "Single" },
      ],
      engineSpecifications: [
        { label: "ENGINE BRAND", value: "PERKINS" },
        { label: "ENGINE MODEL", value: "404D-15G" },
        { label: "NUMBER OF CYLINDERS", value: "3" },
        { label: "ENGINE RATED POWER", value: "1.496 l" },
        { label: "METHOD OF ASPIRATION", value: "Naturally aspirated" },
        { label: "COOLING METHOD", value: "Cooling radiator and fan" },
        { label: "GOVERNOR SYSTEM", value: "Electrical/Mechanical" },
        { label: "ENGINE SPEED", value: "1500rpm" },
      ],
      alternatorSpecifications: [
        { label: "ALTERNATOR BRAND", value: "Voltazz" },
        { label: "VOLTAGE", value: "230V" },
      ],
    },
  },
  // Add more products
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = productDetailData.find((p) => p.id === parseInt(id!));
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <img
            className="w-full h-auto rounded-lg"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <h2 className="text-xl font-semibold mb-2">General Information:</h2>
          <ul className="list-disc pl-5 mb-4">
            {product.generalInfo.map((info, index) => (
              <li key={index} className="text-gray-600">
                <strong>{info.label}:</strong> {info.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <ul className="flex">
          <li
            className={`mr-6 ${activeTab === "description" ? "border-b-2 border-primary" : ""}`}
          >
            <button
              className="py-2 px-4 text-xl font-semibold"
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
          </li>
          <li
            className={`mr-6 ${activeTab === "specifications" ? "border-b-2 border-primary" : ""}`}
          >
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
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Description:</h2>
            <table className="table-auto w-full mb-4">
              <tbody>
                {product.specifications.basicDescription.map((info, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{info.label}</td>
                    <td className="border border-gray-300 px-4 py-2">{info.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Engine Specifications:</h2>
            <table className="table-auto w-full mb-4">
              <tbody>
                {product.specifications.engineSpecifications.map((info, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{info.label}</td>
                    <td className="border border-gray-300 px-4 py-2">{info.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-2">Alternator Specifications:</h2>
            <table className="table-auto w-full mb-4">
              <tbody>
                {product.specifications.alternatorSpecifications.map((info, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{info.label}</td>
                    <td className="border border-gray-300 px-4 py-2">{info.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Specifications Tab */}
      {activeTab === "specifications" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <div className="flex justify-between">
            <p>9 kVA Single Phase PERKINS Powered Diesel Generator PDF</p>
            <button className="inline-flex items-center py-2 px-4 bg-primary text-white rounded-lg">
              Download
            </button>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {productData.map(product => <Product product={product} />)}
        </div>
      </div>
    </div >
  );
};

export default ProductDetails;

