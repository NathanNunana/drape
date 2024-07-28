import React, { useState } from "react";

const ManageMotor: React.FC = () => {
  const [motor, setMotor] = useState("");

  const handleSave = () => {
    // Logic to save the motor
    alert("Motor saved!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Motor</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Motor</label>
        <input
          type="text"
          value={motor}
          onChange={(e) => setMotor(e.target.value)}
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default ManageMotor;
