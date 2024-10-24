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
import ProductsTable from "../../../components/ProductTable";
import DashboardHeader from "../../../components/DashboardHeader";

const ManageProducts: React.FC = () => {
  const initialProductState = {
    id: undefined,
    name: "",
    image: "",
    base_type: "",
    color: "",
    category: "",
    description: "",
    product_type: null,
    warranty_duration: null,
    specifications: {
      basic_generator_parameters: {
        model_number: null,
        output_power: null,
        diesel_oil_type: null,
        output_voltage: null,
        output_current: null,
        normal_frequency: null,
        rated_speed: null,
        steady_state_voltage_regulation_rate: null,
        voltage_fluctuation_rate: null,
        transient_voltage_regulation: null,
        voltage_settling_time: null,
        steady_state_frequency_control: null,
        frequency_jitter: null,
        transient_frequency_fluctuation: null,
        frequency_stabilization_time: null,
        fuel_consumption_mcr: null,
        noise_lp7m: null,
      },
      engine_specification: {
        diesel_engine_brand_provenance: null,
        diesel_engine_model_number: null,
        stand_by_power: null,
        cylinder_model_type: null,
        bore_stroke: null,
        compression_ratio: null,
        starting_system: null,
        cooling_system: null,
        fuel_system: null,
        speed_regulating_system: null,
        air_intake_method: null,
        displacement: null,
        engine_oil_capacity: null,
        rotation_rate: null,
      },
      alternator_specification: {
        alternator_brand_place_of_origin: null,
        motor_type: null,
        rated_power: null,
        rated_voltage: null,
        insulation_grade: null,
        protection_degree: null,
        connection_mode: null,
        adjustment_mode: null,
        output_frequency: null,
        output_factor: null,
      },
    },
  }

  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector((state: RootState) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<Product | Omit<Product, "id">>(initialProductState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, error]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    section?: keyof Product["specifications"],
  ) => {
    const { name, value } = e.target;

    if (section) {
      setCurrentProduct((prevProduct) => {
        const currentSpecifications = prevProduct.specifications || {};
        const currentSection = currentSpecifications[section] || {};

        return {
          ...prevProduct,
          specifications: {
            ...currentSpecifications,
            [section]: {
              ...currentSection,
              [name]: value, // update the property directly in the specified section
            },
          },
        };
      });
    } else {
      setCurrentProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    setCurrentProduct({ ...currentProduct, image });
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(image);
    }
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
    setImagePreview(typeof product.image === "string" ? product.image : null);
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

  const handleView = (product: Product) => {
    setViewProduct(product);
  };

  const handleCloseModal = () => {
    setViewProduct(null); // Close the modal
  };

  const resetForm = () => {
    setCurrentProduct(initialProductState);
    setImagePreview(null);
    setIsEditing(false);
    setIsModalOpen(false);
    setCurrentStage(0);
    setViewProduct(null);
  };

  const nextStage = () => setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));
  const prevStage = () => setCurrentStage((prev) => Math.max(prev - 1, 0));

  const stages = [
    {
      title: "Basic Info",
      content: (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={currentProduct.name ?? ""}
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
              value={currentProduct.base_type ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        </>
      ),
    },
    {
      title: "Specifications",
      content: (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Model Number</label>
            <input
              type="text"
              name="model_number"
              value={currentProduct.specifications?.basic_generator_parameters.model_number ?? ""}
              onChange={(e) => handleChange(e, "basic_generator_parameters")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Output Power</label>
            <input
              type="text"
              name="output_power"
              value={currentProduct.specifications?.basic_generator_parameters.output_power ?? ""}
              onChange={(e) => handleChange(e, "basic_generator_parameters")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Noise LP7m</label>
            <input
              type="text"
              name="noise_lp7m"
              value={currentProduct.specifications?.basic_generator_parameters.noise_lp7m ?? ""}
              onChange={(e) => handleChange(e, "basic_generator_parameters")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        </>
      ),
    },
    {
      title: "Engine Specification",
      content: (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Diesel Engine Model Number</label>
            <input
              type="text"
              name="diesel_engine_model_number"
              value={currentProduct.specifications?.engine_specification.diesel_engine_model_number ?? ""}
              onChange={(e) => handleChange(e, "engine_specification")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Starting System</label>
            <input
              type="text"
              name="starting_system"
              value={currentProduct.specifications?.engine_specification.starting_system ?? ""}
              onChange={(e) => handleChange(e, "engine_specification")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cooling System</label>
            <input
              type="text"
              name="cooling_system"
              value={currentProduct.specifications?.engine_specification.cooling_system ?? ""}
              onChange={(e) => handleChange(e, "engine_specification")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        </>
      ),
    },
    {
      title: "Alternator Specification",
      content: (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Motor Type</label>
            <input
              type="text"
              name="motor_type"
              value={currentProduct.specifications?.alternator_specification.motor_type ?? ""}
              onChange={(e) => handleChange(e, "alternator_specification")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rated Power</label>
            <input
              type="text"
              name="rated_power"
              value={currentProduct.specifications?.alternator_specification.rated_power ?? ""}
              onChange={(e) => handleChange(e, "alternator_specification")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rated Voltage</label>
            <input
              type="text"
              name="rated_voltage"
              value={currentProduct.specifications?.alternator_specification.rated_voltage ?? ""}
              onChange={(e) => handleChange(e, "alternator_specification")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        </>
      ),
    },
    {
      title: "Additional Details",
      content: (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={currentProduct.color ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={currentProduct.description ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product Type</label>
            <input
              type="number"
              name="product_type"
              value={currentProduct.product_type ?? 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Warranty Duration (Months)</label>
            <input
              type="number"
              name="warranty_duration"
              value={currentProduct.warranty_duration ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </>
      ),
    }
  ];

  return (
    <>
      <DashboardHeader title="Products Management" />
      <div className="p-4">
        <ToastContainer />
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="mb-4 p-2 bg-blue-600 text-white rounded-md"
        >
          Add Product
        </button>
        <ProductsTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
        <Modal isOpen={isModalOpen} onClose={resetForm}>
          <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Product" : "Add Product"}</h2>
          <form onSubmit={handleSubmit}>
            {stages[currentStage].content}
            <div className="flex w-full gap-2 justify-between mt-4">
              {currentStage > 0 && (
                <button type="button" onClick={prevStage} className="w-full p-2 bg-gray-300 rounded-md">
                  Previous
                </button>
              )}
              {currentStage < stages.length - 1 ? (
                <button type="button" onClick={nextStage} className="w-full p-2 bg-blue-600 text-white rounded-md">
                  Next
                </button>
              ) : (
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
                  Save
                </button>
              )}
            </div>
          </form>
        </Modal>

        <Modal isOpen={!!viewProduct} onClose={() => handleCloseModal()}>
          {viewProduct && (
            <div>
              <h2 className="text-lg font-bold mb-4">{viewProduct.name}</h2>
              <div className="mb-4">
                <img
                  src={viewProduct.image ? viewProduct.image.toString() : ""}
                  alt={`${viewProduct.name} Image`}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                />
              </div>
              <p><strong>Model Number:</strong> {viewProduct.specifications?.basic_generator_parameters.model_number}</p>
              <p><strong>Base Type:</strong> {viewProduct?.base_type}</p>
              <p><strong>Color:</strong> {viewProduct?.color}</p>
              <p><strong>Description:</strong> {viewProduct?.description}</p>
            </div>
          )}
        </Modal>

        <Modal isOpen={!!viewProduct} onClose={() => handleCloseModal()}>
          {viewProduct && (
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{viewProduct.name}</h2>
              <div className="mb-4">
                <img
                  src={viewProduct.image ? viewProduct.image.toString() : ""}
                  alt={`${viewProduct.name} Image`}
                  className="w-full h-48 object-cover mb-2 rounded-md border"
                />
              </div>

              {/* Basic Product Info */}
              <table className="w-full border border-gray-300 mb-6">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border p-3 font-semibold">Model Number:</td>
                    <td className="border p-3">{viewProduct.specifications?.basic_generator_parameters.model_number}</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Base Type:</td>
                    <td className="border p-3">{viewProduct.base_type}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border p-3 font-semibold">Color:</td>
                    <td className="border p-3">{viewProduct.color}</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Description:</td>
                    <td className="border p-3">{viewProduct.description}</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-xl font-semibold mb-2">Specifications</h3>
              <div className="flex flex-row space-x-6 mb-6">
                {/* Left Column - Basic Generator Parameters */}
                <div className="flex-1">
                  <h4 className="font-medium">Basic Generator Parameters</h4>
                  <table className="w-full border border-gray-300 mb-4">
                    <tbody>
                      {[
                        { label: "Output Power:", value: viewProduct.specifications?.basic_generator_parameters.output_power },
                        { label: "Diesel Oil Type:", value: viewProduct.specifications?.basic_generator_parameters.diesel_oil_type },
                        { label: "Output Voltage:", value: viewProduct.specifications?.basic_generator_parameters.output_voltage },
                        { label: "Output Current:", value: viewProduct.specifications?.basic_generator_parameters.output_current },
                        { label: "Normal Frequency:", value: viewProduct.specifications?.basic_generator_parameters.normal_frequency },
                        { label: "Rated Speed:", value: viewProduct.specifications?.basic_generator_parameters.rated_speed },
                        { label: "Steady State Voltage Regulation Rate:", value: viewProduct.specifications?.basic_generator_parameters.steady_state_voltage_regulation_rate },
                        { label: "Voltage Fluctuation Rate:", value: viewProduct.specifications?.basic_generator_parameters.voltage_fluctuation_rate },
                        { label: "Transient Voltage Regulation:", value: viewProduct.specifications?.basic_generator_parameters.transient_voltage_regulation },
                        { label: "Voltage Settling Time:", value: viewProduct.specifications?.basic_generator_parameters.voltage_settling_time },
                        { label: "Fuel Consumption (MCR):", value: viewProduct.specifications?.basic_generator_parameters.fuel_consumption_mcr },
                        { label: "Noise (LP7m):", value: viewProduct.specifications?.basic_generator_parameters.noise_lp7m }
                      ].map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="border p-2 font-semibold">{item.label}</td>
                          <td className="border p-2">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Right Column - Engine Specification */}
                <div className="flex-1">
                  <h4 className="font-medium">Engine Specification</h4>
                  <table className="w-full border border-gray-300 mb-4">
                    <tbody>
                      {[
                        { label: "Diesel Engine Brand Provenance:", value: viewProduct.specifications?.engine_specification.diesel_engine_brand_provenance },
                        { label: "Diesel Engine Model Number:", value: viewProduct.specifications?.engine_specification.diesel_engine_model_number },
                        { label: "Stand By Power:", value: viewProduct.specifications?.engine_specification.stand_by_power },
                        { label: "Cylinder Model Type:", value: viewProduct.specifications?.engine_specification.cylinder_model_type },
                        { label: "Bore Stroke:", value: viewProduct.specifications?.engine_specification.bore_stroke },
                        { label: "Compression Ratio:", value: viewProduct.specifications?.engine_specification.compression_ratio },
                        { label: "Starting System:", value: viewProduct.specifications?.engine_specification.starting_system },
                        { label: "Cooling System:", value: viewProduct.specifications?.engine_specification.cooling_system },
                        { label: "Fuel System:", value: viewProduct.specifications?.engine_specification.fuel_system }
                      ].map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="border p-2 font-semibold">{item.label}</td>
                          <td className="border p-2">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Alternator Specification */}
              <h4 className="font-medium mb-2">Alternator Specification</h4>
              <table className="w-full border border-gray-300">
                <tbody>
                  {[
                    { label: "Alternator Brand Place of Origin:", value: viewProduct.specifications?.alternator_specification.alternator_brand_place_of_origin },
                    { label: "Motor Type:", value: viewProduct.specifications?.alternator_specification.motor_type },
                    { label: "Rated Power:", value: viewProduct.specifications?.alternator_specification.rated_power },
                    { label: "Rated Voltage:", value: viewProduct.specifications?.alternator_specification.rated_voltage },
                    { label: "Insulation Grade:", value: viewProduct.specifications?.alternator_specification.insulation_grade },
                    { label: "Protection Degree:", value: viewProduct.specifications?.alternator_specification.protection_degree }
                  ].map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="border p-2 font-semibold">{item.label}</td>
                      <td className="border p-2">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      </div >
    </>
  );
};

export default ManageProducts;
