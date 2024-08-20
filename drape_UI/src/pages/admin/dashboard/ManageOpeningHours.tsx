import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchOpeningHours,
  createOpeningHour,
  updateOpeningHour,
  deleteOpeningHour,
  fetchTypes,
  createType,
  updateType,
  deleteType,
  OpeningHour,
  OpeningHourType,
} from "../../slice/openingHoursSlice";
import Modal from "../../../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOpeningHours: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { openingHours, types, status, error } = useSelector(
    (state: RootState) => state.openingHours
  );

  const [isOpenHourModalOpen, setIsOpenHourModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isEditingOpeningHour, setIsEditingOpeningHour] = useState(false);
  const [isEditingType, setIsEditingType] = useState(false);
  const [currentOpeningHour, setCurrentOpeningHour] = useState<OpeningHour>({
    id: 0,
    duration: "",
    type: 0,
  });
  const [currentType, setCurrentType] = useState<OpeningHourType>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    dispatch(fetchOpeningHours());
    dispatch(fetchTypes());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(error || "An error occurred");
    }
  }, [status, error]);

  const handleOpeningHourChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentOpeningHour((prev) => ({
      ...prev,
      [name]: name === "type" ? Number(value) : value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOpeningHour = (e: React.FormEvent) => {
    e.preventDefault();
    const action = isEditingOpeningHour
      ? updateOpeningHour(currentOpeningHour)
      : createOpeningHour(currentOpeningHour);

    dispatch(action).then(() => {
      toast.success(
        isEditingOpeningHour
          ? "Opening hour updated successfully!"
          : "Opening hour added successfully!"
      );
      closeOpeningHourModal();
    });
  };

  const handleSubmitType = (e: React.FormEvent) => {
    e.preventDefault();
    const action = isEditingType ? updateType(currentType) : createType(currentType);

    dispatch(action).then(() => {
      toast.success(
        isEditingType ? "Type updated successfully!" : "Type added successfully!"
      );
      closeTypeModal();
    });
  };

  const handleEditOpeningHour = (openingHour: OpeningHour) => {
    setCurrentOpeningHour(openingHour);
    setIsEditingOpeningHour(true);
    setIsOpenHourModalOpen(true);
  };

  const handleEditType = (type: OpeningHourType) => {
    setCurrentType(type);
    setIsEditingType(true);
    setIsTypeModalOpen(true);
  };

  const handleDeleteOpeningHour = (id: number) => {
    dispatch(deleteOpeningHour(id)).then(() =>
      toast.success("Opening hour deleted successfully!")
    );
  };

  const handleDeleteType = (id: number) => {
    dispatch(deleteType(id)).then(() =>
      toast.success("Type deleted successfully!")
    );
  };

  const closeOpeningHourModal = () => {
    setIsOpenHourModalOpen(false);
    setCurrentOpeningHour({ id: 0, duration: "", type: 0 });
  };

  const closeTypeModal = () => {
    setIsTypeModalOpen(false);
    setCurrentType({ id: 0, name: "" });
  };

  return (
    <div className="p-4">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-4">Manage Opening Hours</h2>
      <button
        onClick={() => {
          setCurrentOpeningHour({ id: 0, duration: "", type: 0 });
          setIsEditingOpeningHour(false);
          setIsOpenHourModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition mb-4"
      >
        Add Opening Hour
      </button>
      <div className="overflow-x-auto mt-4 mb-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Duration
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Type
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {openingHours.map((openingHour) => (
              <tr
                key={openingHour.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-gray-800">
                  {openingHour.duration}
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {types.find((type) => type.id === openingHour.type)?.name || openingHour.type}
                </td>
                <td className="py-4 px-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition mr-2"
                    onClick={() => handleEditOpeningHour(openingHour)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                    onClick={() => handleDeleteOpeningHour(openingHour.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mb-4">Manage Types</h2>
      <button
        onClick={() => {
          setCurrentType({ id: 0, name: "" });
          setIsEditingType(false);
          setIsTypeModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition mb-4"
      >
        Add Type
      </button>
      <div className="overflow-x-auto">
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
            {types.map((type) => (
              <tr
                key={type.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-gray-800">{type.name}</td>
                <td className="py-4 px-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition mr-2"
                    onClick={() => handleEditType(type)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                    onClick={() => handleDeleteType(type.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Opening Hour Modal */}
      <Modal
        isOpen={isOpenHourModalOpen}
        onClose={closeOpeningHourModal}
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditingOpeningHour ? "Edit Opening Hour" : "Add Opening Hour"}
        </h2>
        <form onSubmit={handleSubmitOpeningHour}>
          <div className="mb-4">
            <label className="block text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={currentOpeningHour.duration}
              onChange={handleOpeningHourChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={currentOpeningHour.type}
              onChange={handleOpeningHourChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value={0}>Select a type</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeOpeningHourModal}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
            >
              {isEditingOpeningHour ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Type Modal */}
      <Modal
        isOpen={isTypeModalOpen}
        onClose={closeTypeModal}
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditingType ? "Edit Type" : "Add Type"}
        </h2>
        <form onSubmit={handleSubmitType}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={currentType.name}
              onChange={handleTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeTypeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
            >
              {isEditingType ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageOpeningHours;
