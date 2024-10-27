import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../drape/store";
import {
  fetchAboutUs,
  createAboutUs,
  updateAboutUs,
} from "../../slice/aboutUsSlice";
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
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const aboutUsData = {
      id: aboutUs.id || 0,
      motto: motto,
      company_description: companyDescription,
      image: image || undefined,
    };

    try {
      if (aboutUs.id) {
        await dispatch(updateAboutUs(aboutUsData));
        toast.success("About Us updated successfully!");
      } else {
        await dispatch(createAboutUs(aboutUsData));
        toast.success("About Us created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save About Us. Please try again.");
    }
  };

  return (
    <>
      {/* <DashboardHeader title="About Us Management" /> */}
      <div className="container mx-auto p-6">
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="container grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Motto Field */}
            <div>
              <label htmlFor="motto" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
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
            className="bg-primary text-white px-6 py-3 w-full rounded-md mt-6 hover:bg-secondary transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default ManageAboutUs;
