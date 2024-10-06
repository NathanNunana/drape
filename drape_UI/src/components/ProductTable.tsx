import React, { useState } from 'react';
import { Product } from '../pages/slice/productsSlice';

interface TableProp {
  products: Product[];
  onEdit: (prod: Product) => void;
  onDelete: (id: number) => void;
  onView: (prod: Product) => void;
}

const ProductsTable: React.FC<TableProp> = ({ products, onEdit, onDelete, onView }) => {
  const [loading, setLoading] = useState(false);

  const confirmDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      setLoading(true);
      onDelete(id);
      setLoading(false);
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Model Number</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <React.Fragment key={product.id}>
              <tr>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.specifications?.basic_generator_parameters.model_number}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => onView(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(product.id!)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center">
              No products available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;

