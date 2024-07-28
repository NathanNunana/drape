import React, { useState } from "react";

interface OpeningHour {
  duration: string;
  type: number;
}

const ManageOpeningHours: React.FC = () => {
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const [newOpeningHour, setNewOpeningHour] = useState<OpeningHour>({
    duration: "",
    type: 0,
  });

  const handleAddOpeningHour = () => {
    setOpeningHours([...openingHours, newOpeningHour]);
    setNewOpeningHour({ duration: "", type: 0 });
  };

  const handleRemoveOpeningHour = (index: number) => {
    setOpeningHours(openingHours.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Logic to save the opening hours
    alert("Opening hours saved!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Opening Hours</h1>
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
                    onClick={() => handleRemoveOpeningHour(index)}
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
      <button
        onClick={handleAddOpeningHour}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Opening Hour
      </button>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default ManageOpeningHours;
