import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchServiceTypes,
  createServiceType,
  updateServiceType,
  deleteServiceType,
} from "../../slice/servicesTypesSlice";
import Modal from "../../../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardHeader from "../../../components/DashboardHeader";

const ManageServiceTypes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { serviceTypes } = useSelector(
    (state: RootState) => state.serviceTypes,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceType, setCurrentServiceType] = useState({
    id: 0,
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchServiceTypes());
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
        await dispatch(updateServiceType(currentServiceType)).unwrap();
        toast.success("Service Type updated successfully!");
      } else {
        await dispatch(createServiceType({
          name: currentServiceType.name,
          description: currentServiceType.description,
        })).unwrap();
        toast.success("Service Type added successfully!");
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setIsModalOpen(false);
      setCurrentServiceType({ id: 0, name: "", description: "" });
    }
  };

  const handleEdit = (type: {
    id: number;
    name: string;
    description: string;
  }) => {
    setCurrentServiceType(type);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteServiceType(id)).unwrap();
      toast.success("Service Type deleted successfully!");
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <>
      <DashboardHeader title="Service Types Management" />
      <div className="p-4">
        <button
          onClick={() => {
            setCurrentServiceType({ id: 0, name: "", description: "" });
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
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
                  Description
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceTypes.map((type) => (
                <tr
                  key={type.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-gray-800">{type.name}</td>
                  <td className="py-4 px-4 text-gray-600">{type.description}</td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition mr-2"
                      onClick={() => handleEdit(type)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
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
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Service Type" : "Add Service Type"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={currentServiceType.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={currentServiceType.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : ""
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

export default ManageServiceTypes;
