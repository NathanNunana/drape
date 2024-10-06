import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  Service,
} from "../../slice/servicesSlice";
import { fetchServiceTypes } from "../../slice/servicesTypesSlice";
import Modal from "../../../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardHeader from "../../../components/DashboardHeader";

const ManageServices: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services } = useSelector((state: RootState) => state.services);
  const { serviceTypes } = useSelector(
    (state: RootState) => state.serviceTypes,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<
    Service | Omit<Service, "id">
  >({
    title: "",
    description: "",
    operations: "",
    service_type: 0,
  });

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchServiceTypes());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setCurrentService({ ...currentService, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCurrentService({ ...currentService, image: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const servicePayload = { ...currentService } as Service;

    if (isEditing && "id" in currentService) {
      dispatch(updateService(servicePayload))
        .unwrap()
        .then(() => {
          toast.success("Service updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update service.");
        });
    } else {
      dispatch(createService(servicePayload))
        .unwrap()
        .then(() => {
          toast.success("Service created successfully!");
        })
        .catch(() => {
          toast.error("Failed to create service.");
        });
    }
    setIsModalOpen(false);
    setCurrentService({
      title: "",
      description: "",
      operations: "",
      service_type: 0,
    });
  };

  const handleEdit = (service: typeof currentService) => {
    setCurrentService(service);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteService(id))
      .unwrap()
      .then(() => {
        toast.success("Service deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete service.");
      });
  };

  return (
    <>
      <DashboardHeader title="Services Management" />
      <div className="p-4">
        <button
          onClick={() => {
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
        >
          Add Service
        </button>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  File
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Description
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Operations
                </th>

                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Service Type
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-gray-600">
                    <img className="w-10 h-10" src={service.image ? service.image.toString() : "/default-image.png"} />
                  </td>
                  <td className="py-4 px-4 text-gray-800">{service.title}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {service.description}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {service.operations}
                  </td>

                  <td className="py-4 px-4 text-gray-600">
                    {serviceTypes.find((type) => type.id === service.service_type)
                      ?.name || "N/A"}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition mr-2"
                      onClick={() => handleEdit(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                      onClick={() => handleDelete(service.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Service" : "Add Service"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={currentService.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={currentService.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Operations</label>
              <input
                type="text"
                name="operations"
                value={currentService.operations}
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
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Service Type</label>
              <select
                name="service_type"
                value={currentService.service_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value={0}>Select Service Type</option>
                {serviceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            >
              {isEditing ? "Update Service" : "Add Service"}
            </button>
          </form>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
};

export default ManageServices;
