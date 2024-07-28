import React, { useState } from "react";

interface Address {
  street_name: string;
  digital_address: string;
  city: string;
  country: string;
  email: string;
}

const ManageAddress: React.FC = () => {
  const [address, setAddress] = useState<Address>({
    street_name: "",
    digital_address: "",
    city: "",
    country: "",
    email: "",
  });

  const handleSave = () => {
    // Logic to save the address
    alert("Address saved!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Address</h1>
      {/* <div className="mb-4 flex flex-co"> */}
      <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
        <label className="block text-sm font-medium text-gray-700">
          Street Name
        </label>
        <input
          type="text"
          value={address.street_name}
          onChange={(e) =>
            setAddress({ ...address, street_name: e.target.value })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {/* </div> */}
        <div className="w-full md:pr-2 mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700">
            Digital Address
          </label>
          <input
            type="text"
            value={address.digital_address}
            onChange={(e) =>
              setAddress({ ...address, digital_address: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      {/* <div className="mb-4 flex flex-wrap"> */}
      <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {/* </div> */}
        <div className="w-full md:pr-2 mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={address.email}
          onChange={(e) => setAddress({ ...address, email: e.target.value })}
          className="mt-1 block w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 w-full lg:w-1/2"
      >
        Save
      </button>
    </div>
  );
};

export default ManageAddress;
