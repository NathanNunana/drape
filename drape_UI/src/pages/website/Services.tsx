import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "../../components";
import { fetchServices } from "../slice/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../drape/store";
import { toast } from "react-toastify";

const Services: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { services, error, status } = useSelector((state: RootState) => state.services)

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, error]);

  return (
    <div>
      <div className="bg-gray-50">
        <div className="container mx-auto text-left mb-5 text-gray-500 px-8 lg:px-48 py-5">
          <p className="text-sm">
            <span className="text-red-500">Home</span> / Our Services
          </p>
        </div>
      </div>
      <div className="mx-auto bg-gray-50">
      </div>
      <div className="container mx-auto p-4">
        <motion.h1
          className="text-3xl mb-6 text-center font-semibold text-red-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-gray-700">Our</span> Services
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
