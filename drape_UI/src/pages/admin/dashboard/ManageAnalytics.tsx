import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchAnalytics,
  createAnalytic,
  updateAnalytic,
  deleteAnalytic,
} from "../../slice/analyticsSlice";

const ManageAnalytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { analytics, status, error } = useSelector(
    (state: RootState) => state.analytics,
  );

  const [currentAnalytic, setCurrentAnalytic] = useState({
    name: "",
    value: "",
  });
  const [editingAnalytic, setEditingAnalytic] = useState<{
    name: string;
    value: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const handleUploadAnalytic = async () => {
    if (currentAnalytic.name && currentAnalytic.value) {
      await dispatch(createAnalytic(currentAnalytic));
      setCurrentAnalytic({ name: "", value: "" });
    }
  };

  const handleRemoveAnalytic = (name: string) => {
    dispatch(deleteAnalytic(name));
  };

  const handleEditAnalytic = (analytic: { name: string; value: string }) => {
    setEditingAnalytic(analytic);
    setCurrentAnalytic(analytic);
  };

  const handleSaveEdit = async () => {
    if (editingAnalytic) {
      await dispatch(updateAnalytic(currentAnalytic));
      setEditingAnalytic(null);
      setCurrentAnalytic({ name: "", value: "" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Analytics</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
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
            {analytics.map((analytic) => (
              <tr key={analytic.name}>
                <td className="px-6 py-4 whitespace-nowrap">{analytic.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {analytic.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditAnalytic(analytic)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveAnalytic(analytic.name)}
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
          value={currentAnalytic.name}
          onChange={(e) =>
            setCurrentAnalytic({ ...currentAnalytic, name: e.target.value })
          }
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2 mb-2 md:mb-0 md:mr-2"
        />
        <input
          type="text"
          placeholder="Value"
          value={currentAnalytic.value}
          onChange={(e) =>
            setCurrentAnalytic({ ...currentAnalytic, value: e.target.value })
          }
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="flex">
        <button
          onClick={handleUploadAnalytic}
          className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 w-full lg:w-1/2"
        >
          Upload Analytic
        </button>
        {editingAnalytic && (
          <button
            onClick={handleSaveEdit}
            className="bg-yellow-500 text-white px-4 py-2 mb-4 w-full lg:w-1/2"
          >
            Save Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageAnalytics;
