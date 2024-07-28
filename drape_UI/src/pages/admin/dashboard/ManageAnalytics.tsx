import React, { useState } from "react";

interface Analytics {
  name: string;
  value: string;
}

const ManageAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [newAnalytic, setNewAnalytic] = useState<Analytics>({
    name: "",
    value: "",
  });

  const handleAddAnalytic = () => {
    setAnalytics([...analytics, newAnalytic]);
    setNewAnalytic({ name: "", value: "" });
  };

  const handleRemoveAnalytic = (index: number) => {
    setAnalytics(analytics.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Logic to save the analytics
    alert("Analytics saved!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Analytics</h1>
      {analytics.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200 mb-2">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analytics.map((analytic, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{analytic.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {analytic.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleRemoveAnalytic(index)}
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
          value={newAnalytic.name}
          onChange={(e) =>
            setNewAnalytic({ ...newAnalytic, name: e.target.value })
          }
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2 mb-2 md:mb-0 md:mr-2"
        />
        <input
          type="text"
          placeholder="Value"
          value={newAnalytic.value}
          onChange={(e) =>
            setNewAnalytic({ ...newAnalytic, value: e.target.value })
          }
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button
        onClick={handleAddAnalytic}
        className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 w-full lg:w-1/2"
      >
        Add Analytic
      </button>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 w-full lg:w-1/2"
      >
        Save
      </button>
    </div>
  );
};

export default ManageAnalytics;
