import React, { useState } from "react";

const Products: React.FC = () => {
  const [products, setProducts] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState("");

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct("");
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          onClick={handleAddProduct}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </div>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            {product}
            <button
              onClick={() => handleRemoveProduct(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
