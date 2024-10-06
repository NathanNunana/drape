import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  Address,
} from "../../slice/addressesSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardHeader from "../../../components/DashboardHeader";

const ManageAddress: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select the address state from the Redux store
  const addressState = useSelector((state: RootState) => state.addresses);

  // Initialize local state for address form
  const [address, setAddress] = useState<Address>({
    id: 0,
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
    if (addressState.addresses.length > 0) {
      const latestAddress = addressState.addresses[addressState.addresses.length - 1];
      setAddress(latestAddress);
    }
  }, [addressState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddress((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (address.id) {
        await dispatch(updateAddress(address));
        toast.success("Address updated successfully!");
      } else {
        await dispatch(createAddress(address));
        toast.success("Address created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    }
  };

  return (
    <>
      <DashboardHeader title="Address Management" />
      <div className="container mx-auto p-4">
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
        <ToastContainer />
      </div>
    </>
  );
};

export default ManageAddress;
