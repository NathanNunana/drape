import React, { useState } from "react";

const Services: React.FC = () => {
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");

  const handleAddService = () => {
    setServices([...services, newService]);
    setNewService("");
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          onClick={handleAddService}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Service
        </button>
      </div>
      <ul>
        {services.map((service, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            {service}
            <button
              onClick={() => handleRemoveService(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
