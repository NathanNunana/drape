import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store"; // Adjust the import path as needed
import {
  fetchAboutUs,
  createAboutUs,
  updateAboutUs,
} from "../../slice/aboutUsSlice"; // Adjust the import path as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAboutUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const aboutUs = useSelector((state: RootState) => state.aboutUs);
  const [motto, setMotto] = useState(aboutUs.motto);
  const [companyDescription, setCompanyDescription] = useState(
    aboutUs.company_description
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(aboutUs.image || '');

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  useEffect(() => {
    setMotto(aboutUs.motto);
    setCompanyDescription(aboutUs.company_description);
    setImagePreview(aboutUs.image || '');
  }, [aboutUs]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0])); // Update image preview
    }
  };

  console.log(aboutUs, aboutUs.id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("motto", motto);
    formData.append("company_description", companyDescription);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      if (aboutUs.id) {
        await dispatch(updateAboutUs(formData));  // Pass FormData directly
        toast.success("About Us updated successfully!");
      } else {
        await dispatch(createAboutUs(formData));  // Pass FormData directly
        toast.success("About Us created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save About Us. Please try again.");
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">Manage About Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Motto Field */}
          <div>
            <label htmlFor="motto" className="block text-gray-700 text-lg font-semibold">
              Motto
            </label>
            <input
              type="text"
              id="motto"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          {/* Company Description Field */}
          <div>
            <label htmlFor="companyDescription" className="block text-gray-700 text-lg font-semibold">
              Company Description
            </label>
            <textarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              rows={4}
            />
          </div>
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="image" className="block text-gray-700 text-lg font-semibold">
            Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="About Us"
                className="w-full max-w-sm h-auto border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 w-full lg:w-1/2 rounded-md mt-6 hover:bg-blue-700 transition duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ManageAboutUs;
