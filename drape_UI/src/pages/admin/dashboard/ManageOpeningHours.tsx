import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchOpeningHours,
  fetchTypes,
  createOpeningHour,
  updateOpeningHour,
  deleteOpeningHour,
  createType,
  updateType,
  deleteType,
  OpeningHour,
  OpeningHourType,
} from "../../slice/openingHoursSlice";

const ManageOpeningHours: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { openingHours, types, status, error } = useSelector(
    (state: RootState) => state.openingHours,
  );

  const [newOpeningHour, setNewOpeningHour] = useState<OpeningHour>({
    duration: "",
    type: 0,
  });
  const [newType, setNewType] = useState<OpeningHourType>({
    name: "",
    title: "",
  });
  const [editingOpeningHour, setEditingOpeningHour] =
    useState<OpeningHour | null>(null);
  const [editingType, setEditingType] = useState<OpeningHourType | null>(null);

  useEffect(() => {
    dispatch(fetchOpeningHours());
    dispatch(fetchTypes());
  }, [dispatch]);

  const handleAddOpeningHour = async () => {
    await dispatch(createOpeningHour(newOpeningHour));
    setNewOpeningHour({ duration: "", type: 0 });
  };

  const handleAddType = async () => {
    await dispatch(createType(newType));
    setNewType({ name: "", title: "" });
  };

  const handleRemoveOpeningHour = (duration: string) => {
    dispatch(deleteOpeningHour(duration));
  };

  const handleRemoveType = (name: string) => {
    dispatch(deleteType(name));
  };

  const handleEditOpeningHour = (openingHour: OpeningHour) => {
    setEditingOpeningHour(openingHour);
    setNewOpeningHour(openingHour);
  };

  const handleEditType = (type: OpeningHourType) => {
    setEditingType(type);
    setNewType(type);
  };

  const handleSaveEditOpeningHour = async () => {
    if (editingOpeningHour) {
      await dispatch(updateOpeningHour(newOpeningHour));
      setEditingOpeningHour(null);
      setNewOpeningHour({ duration: "", type: 0 });
    }
  };

  const handleSaveEditType = async () => {
    if (editingType) {
      await dispatch(updateType(newType));
      setEditingType(null);
      setNewType({ name: "", title: "" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Opening Hours</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {openingHours.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200 mb-2">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {openingHours.map((openingHour, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {openingHour.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {openingHour.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditOpeningHour(openingHour)}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleRemoveOpeningHour(openingHour.duration)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex flex-wrap mb-2">
        <input
          type="text"
          placeholder="Duration"
          value={newOpeningHour.duration}
          onChange={(e) =>
            setNewOpeningHour({ ...newOpeningHour, duration: e.target.value })
          }
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2 mb-2 md:mb-0 md:mr-2"
        />
        <input
          type="number"
          placeholder="Type"
          value={newOpeningHour.type}
          onChange={(e) =>
            setNewOpeningHour({
              ...newOpeningHour,
              type: parseInt(e.target.value),
            })
          }
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      {editingOpeningHour ? (
        <button
          onClick={handleSaveEditOpeningHour}
          className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 w-full lg:w-1/2"
        >
          Save Edit
        </button>
      ) : (
        <button
          onClick={handleAddOpeningHour}
          className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 w-full lg:w-1/2"
        >
          Add Opening Hour
        </button>
      )}

      <h1 className="text-2xl font-bold mb-4">Manage Types</h1>
      {types.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200 mb-2">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {types.map((type, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{type.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditType(type)}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveType(type.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex flex-wrap mb-2">
        <input
          type="text"
          placeholder="Name"
          value={newType.name}
          onChange={(e) => setNewType({ ...newType, name: e.target.value })}
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2 mb-2 md:mb-0 md:mr-2"
        />
      </div>
      {editingType ? (
        <button
          onClick={handleSaveEditType}
          className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 w-full lg:w-1/2"
        >
          Save Edit
        </button>
      ) : (
        <button
          onClick={handleAddType}
          className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 w-full lg:w-1/2"
        >
          Add Type
        </button>
      )}
    </div>
  );
};

export default ManageOpeningHours;
