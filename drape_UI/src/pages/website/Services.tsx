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
      <div className="container mx-auto px-8 lg:px-48">
        {/* Service Heading */}
        <motion.h2
          className="text-3xl mb-6 text-left font-semibold text-red-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-gray-700">Our</span> Services
        </motion.h2>
        <p className="text-gray-600 mb-8">
          Whether it's routine preventive maintenance or urgent corrective service, Drape is fully equipped with modern tools and technology to ensure your generator stays in optimal condition. Our skilled technicians bring years of experience to the table, adhering to industry best practices to deliver top-notch generator maintenance services. We perform thorough inspections, including oil and filter changes, cooling system checks, and battery testing, ensuring your generator remains reliable and efficient. Trust Drape to keep your power supply running smoothly, minimizing downtime and extending the lifespan of your equipment.
        </p>
        <div className="container mx-auto py-4">
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-rows-1 lg:grid-rows-1 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>);
};

export default Services;
