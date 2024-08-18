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

const ManageOpeningHours: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { openingHours, types } = useSelector(
    (state: RootState) => state.openingHours,
  );
  const [isOpenHourModalOpen, setIsOpenHourModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isEditingOpeningHour, setIsEditingOpeningHour] = useState(false);
  const [isEditingType, setIsEditingType] = useState(false);
  const [currentOpeningHour, setCurrentOpeningHour] = useState<OpeningHour>({
    duration: "",
    type: 0,
  });
  const [currentType, setCurrentType] = useState<OpeningHourType>({
    name: "",
    title: "",
  });

  useEffect(() => {
    dispatch(fetchOpeningHours());
    dispatch(fetchTypes());
  }, [dispatch]);

  const handleOpeningHourChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setCurrentOpeningHour({
      ...currentOpeningHour,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentType({
      ...currentType,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOpeningHour = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingOpeningHour) {
      dispatch(updateOpeningHour(currentOpeningHour));
    } else {
      dispatch(createOpeningHour(currentOpeningHour));
    }
    setIsOpenHourModalOpen(false);
    setCurrentOpeningHour({ duration: "", type: 0 });
  };

  const handleSubmitType = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingType) {
      dispatch(updateType(currentType));
    } else {
      dispatch(createType(currentType));
    }
    setIsTypeModalOpen(false);
    setCurrentType({ name: "", title: "" });
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Opening Hours</h2>
      <button
        onClick={() => {
          setCurrentOpeningHour({ duration: "", type: 0 });
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
                key={openingHour.duration}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-gray-800">
                  {openingHour.duration}
                </td>
                <td className="py-4 px-4 text-gray-600">{openingHour.type}</td>
                <td className="py-4 px-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition mr-2"
                    onClick={() => handleEditOpeningHour(openingHour)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                    onClick={() =>
                      dispatch(deleteOpeningHour(openingHour.duration))
                    }
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
          setCurrentType({ name: "", title: "" });
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
                key={type.name}
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
                    onClick={() => dispatch(deleteType(type.name))}
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
        onClose={() => setIsOpenHourModalOpen(false)}
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
              <option value="">Select Type</option>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition ${
              isEditingOpeningHour ? "bg-yellow-500 hover:bg-yellow-600" : ""
            }`}
          >
            {isEditingOpeningHour ? "Save Changes" : "Add Opening Hour"}
          </button>
        </form>
      </Modal>

      {/* Type Modal */}
      <Modal isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)}>
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
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={currentType.title}
              onChange={handleTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition ${
              isEditingType ? "bg-yellow-500 hover:bg-yellow-600" : ""
            }`}
          >
            {isEditingType ? "Save Changes" : "Add Type"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageOpeningHours;
