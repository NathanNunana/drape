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
  const [currentProduct, setCurrentProduct] = useState<
    Product | Omit<Product, "id">
  >({
    name: "",
    image: null,
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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, error]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] || null;
    setCurrentProduct({ ...currentProduct, image });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        if ("id" in currentProduct) {
          await dispatch(updateProduct(currentProduct)).unwrap();
          toast.success("Product updated successfully");
        } else {
          console.error("Product ID is missing for update");
        }
      } else {
        await dispatch(createProduct(currentProduct)).unwrap();
        toast.success("Product created successfully");
      }
      setIsModalOpen(false);
      setCurrentProduct({
        name: "",
        image: null,
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
    } catch (err) {
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <button
        onClick={() => {
          setIsEditing(false);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-md">
                No Image
              </div>
            )}
            <h3 className="text-lg font-bold mt-4">{product.name}</h3>
            <p className="text-gray-600"><strong>Base Type:</strong> {product.base_type}</p>
            <p className="text-gray-600"><strong>Color:</strong> {product.color}</p>
            <p className="text-gray-600"><strong>Noise Rating:</strong> {product.noise_rating}</p>
            <p className="text-gray-600"><strong>Diesel Tank Capacity:</strong> {product.integrated_diesel_tank_capacity}</p>
            <p className="text-gray-600"><strong>Fuel Consumption:</strong> {product.fuel_consumption}</p>
            <p className="text-gray-600"><strong>Dimension:</strong> {product.dimension}</p>
            <p className="text-gray-600"><strong>Dry Weight:</strong> {product.dry_weight}</p>
            <p className="text-gray-600"><strong>Description:</strong> {product.description}</p>
            <p className="text-gray-600"><strong>Specification:</strong> {product.specification}</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition"
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
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
              <label className="block text-gray-700">File</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
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
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
              >
                {isEditing ? "Update" : "Add"}
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
