import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import Modal from "../../../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProductType, deleteProductType, fetchProductTypes, updateProductType } from "../../slice/productsTypesSlice";

const ManageProductTypes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productTypes } = useSelector(
    (state: RootState) => state.productTypes,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceType, setCurrentServiceType] = useState({
    id: 0,
    type_name: "",
  });

  useEffect(() => {
    dispatch(fetchProductTypes());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentServiceType({
      ...currentServiceType,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updateProductType(currentServiceType)).unwrap();
        toast.success("Service Type updated successfully!");
      } else {
        await dispatch(createProductType({
          type_name: currentServiceType.type_name,
        })).unwrap();
        toast.success("Service Type added successfully!");
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setIsModalOpen(false);
      setCurrentServiceType({ id: 0, type_name: "" });
    }
  };

  const handleEdit = (type: {
    id: number;
    type_name: string;
  }) => {
    setCurrentServiceType(type);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteProductType(id)).unwrap();
      toast.success("Service Type deleted successfully!");
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <>
      {/* <DashboardHeader title="Service Types Management" /> */}
      <div className="p-4">
        <button
          onClick={() => {
            setCurrentServiceType({ id: 0, type_name: "" });
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="bg-primary text-sm text-white px-4 py-2 rounded shadow-md hover:bg-secondary transition"
        >
          Add Service Type
        </button>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productTypes.map((type) => (
                <tr
                  key={type.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-gray-800">{type.type_name}</td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-yellow-500 text-sm text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition mr-2"
                      onClick={() => handleEdit(type)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-sm text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                      onClick={() => handleDelete(type.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">
            {isEditing ? "Edit Service Type" : "Add Service Type"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="type_name"
                value={currentServiceType.type_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className={`bg-primary w-full text-sm text-white px-4 py-2 rounded-md shadow-md hover:bg-secondary transition ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : ""
                }`}
            >
              {isEditing ? "Save Changes" : "Add Service Type"}
            </button>
          </form>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
};

export default ManageProductTypes;
