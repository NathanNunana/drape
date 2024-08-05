import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store"; // Adjust the import path as needed
import {
  fetchAboutUs,
  createAboutUs,
  updateAboutUs,
} from "../../slice/aboutUsSlice"; // Adjust the import path as needed

const ManageAboutUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const aboutUs = useSelector((state: RootState) => state.aboutUs);

  const [motor, setMotor] = useState(aboutUs.motor);
  const [companyDescription, setCompanyDescription] = useState(
    aboutUs.company_description,
  );

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  useEffect(() => {
    setMotor(aboutUs.motor);
    setCompanyDescription(aboutUs.company_description);
  }, [aboutUs.motor, aboutUs.company_description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData = {
      motor,
      company_description: companyDescription,
    };

    if (aboutUs.id) {
      dispatch(updateAboutUs({ id: aboutUs.id, ...updateData }));
    } else {
      dispatch(createAboutUs(updateData));
    }
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
