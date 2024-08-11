import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchAnalytics,
  createAnalytic,
  updateAnalytic,
  deleteAnalytic,
} from "../../slice/analyticsSlice";
import Modal from "../../../components/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const handleUploadAnalytic = async () => {
    if (currentAnalytic.name && currentAnalytic.value) {
      await dispatch(createAnalytic(currentAnalytic));
      setCurrentAnalytic({ name: "", value: "" });
      setIsModalOpen(false);
    }
  };

  const handleRemoveAnalytic = (name: string) => {
    dispatch(deleteAnalytic(name));
  };

  const handleEditAnalytic = (analytic: { name: string; value: string }) => {
    setEditingAnalytic(analytic);
    setCurrentAnalytic(analytic);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editingAnalytic) {
      await dispatch(updateAnalytic(currentAnalytic));
      setEditingAnalytic(null);
      setCurrentAnalytic({ name: "", value: "" });
      setIsModalOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnalytic) {
      handleSaveEdit();
    } else {
      handleUploadAnalytic();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Analytics</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}
      <button
        onClick={() => {
          setEditingAnalytic(null);
          setCurrentAnalytic({ name: "", value: "" });
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition mb-4"
      >
        Add Analytic
      </button>
      {analytics.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-300">
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
                <tr key={analytic.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {analytic.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {analytic.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditAnalytic(analytic)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveAnalytic(analytic.name)}
                      className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {editingAnalytic ? "Edit Analytic" : "Add Analytic"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={currentAnalytic.name}
              onChange={(e) =>
                setCurrentAnalytic({ ...currentAnalytic, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Value</label>
            <input
              type="text"
              placeholder="Value"
              value={currentAnalytic.value}
              onChange={(e) =>
                setCurrentAnalytic({
                  ...currentAnalytic,
                  value: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className={`${
              editingAnalytic
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded-md shadow-md transition`}
          >
            {editingAnalytic ? "Save Edit" : "Upload Analytic"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageAnalytics;
