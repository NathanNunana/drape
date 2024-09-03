import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "../../slice/productsSlice";
import Modal from "../../../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector((state: RootState) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | Omit<Product, "id">>({
    name: "",
    image: "",
    base_type: "",
    color: "",
    noise_rating: "",
    integrated_diesel_tank_capacity: "",
    fuel_consumption: "",
    dimension: "",
    dry_weight: "",
    description: "",
    specification: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    setCurrentProduct({ ...currentProduct, image });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && "id" in currentProduct) {
        await dispatch(updateProduct(currentProduct)).unwrap();
        toast.success("Product updated successfully");
      } else {
        await dispatch(createProduct(currentProduct)).unwrap();
        toast.success("Product created successfully");
      }
      resetForm();
    } catch (err) {
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setImagePreview(typeof product.image === "string" ? product.image : null); // Set preview based on image type
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      name: "",
      image: "",
      base_type: "",
      color: "",
      noise_rating: "",
      integrated_diesel_tank_capacity: "",
      fuel_consumption: "",
      dimension: "",
      dry_weight: "",
      description: "",
      specification: "",
    });
    setImagePreview(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <button
        onClick={() => {
          setIsEditing(false);
          resetForm();
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
      >
        Add Product
      </button>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              {/* Table headers */}
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Image
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Name
              </th>

              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Base Type
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Color
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Noise Rating
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Integrated Diesel Tank Capacity
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Fuel Consumption
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Dimension
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Dry Weight
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Description
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Specification
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-gray-600">
                  <img className="w-10 h-10" src={product.image ? product.image.toString() : "/default-image.png"} />
                </td>
                <td className="py-4 px-4 text-gray-800">{product.name}</td>

                <td className="py-4 px-4 text-gray-600">{product.base_type}</td>
                <td className="py-4 px-4 text-gray-600">{product.color}</td>
                <td className="py-4 px-4 text-gray-600">
                  {product.noise_rating}
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {product.integrated_diesel_tank_capacity}
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {product.fuel_consumption}
                </td>
                <td className="py-4 px-4 text-gray-600">{product.dimension}</td>
                <td className="py-4 px-4 text-gray-600">
                  {product.dry_weight}
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {product.description}
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {product.specification}
                </td>
                <td className="py-4 px-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Product" : "Add Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full h-48 object-cover mt-2 rounded-md"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Base Type</label>
              <input
                type="text"
                name="base_type"
                value={currentProduct.base_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Color</label>
              <input
                type="text"
                name="color"
                value={currentProduct.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Noise Rating</label>
              <input
                type="text"
                name="noise_rating"
                value={currentProduct.noise_rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Integrated Diesel Tank Capacity</label>
              <input
                type="text"
                name="integrated_diesel_tank_capacity"
                value={currentProduct.integrated_diesel_tank_capacity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fuel Consumption</label>
              <input
                type="text"
                name="fuel_consumption"
                value={currentProduct.fuel_consumption}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Dimension</label>
              <input
                type="text"
                name="dimension"
                value={currentProduct.dimension}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Dry Weight</label>
              <input
                type="text"
                name="dry_weight"
                value={currentProduct.dry_weight}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={currentProduct.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                rows={4}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Specification</label>
              <textarea
                name="specification"
                value={currentProduct.specification}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
              >
                {isEditing ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ManageProducts;
