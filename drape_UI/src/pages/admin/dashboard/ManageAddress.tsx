import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  AddressState,
} from "../../slice/addressesSlice";

const ManageAddress: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addressState: AddressState = useSelector(
    (state: RootState) => state.addresses,
  );

  // Initialize the address state
  const [address, setAddress] = useState({
    street_name: "",
    digital_address: "",
    city: "",
    country: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addressState) {
      setAddress({
        street_name: addressState.street_name || "",
        digital_address: addressState.digital_address || "",
        city: addressState.city || "",
        country: addressState.country || "",
        email: addressState.email || "",
      });
    }
  }, [addressState]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const addressData = {
      street_name: address.street_name,
      digital_address: address.digital_address,
      city: address.city,
      country: address.country,
      email: address.email,
    };

    if (addressState.id) {
      dispatch(updateAddress({ id: addressState.id, ...addressData }));
    } else {
      dispatch(createAddress(addressData));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Address</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="street_name"
              className="block text-sm font-medium text-gray-700"
            >
              Street Name
            </label>
            <input
              type="text"
              id="street_name"
              value={address.street_name}
              onChange={(e) =>
                setAddress({ ...address, street_name: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="digital_address"
              className="block text-sm font-medium text-gray-700"
            >
              Digital Address
            </label>
            <input
              type="text"
              id="digital_address"
              value={address.digital_address}
              onChange={(e) =>
                setAddress({ ...address, digital_address: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={address.email}
              onChange={(e) =>
                setAddress({ ...address, email: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 mt-4 w-full lg:w-1/2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ManageAddress;
