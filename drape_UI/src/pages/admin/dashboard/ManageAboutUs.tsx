import React, { useState } from "react";

const ManageAboutUs: React.FC = () => {
  const [motor, setMotor] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage About Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="motor" className="block text-gray-700">
              Motor
            </label>
            <input
              type="text"
              id="motor"
              value={motor}
              onChange={(e) => setMotor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="companyDescription" className="block text-gray-700">
              Company Description
            </label>
            <textarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 lg:w-1/2"
              rows={4}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full lg:w-1/2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ManageAboutUs;
