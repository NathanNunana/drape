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
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        OUR SERVICES
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
