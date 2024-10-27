import React from "react";

const Booking: React.FC = () => {
  return (
    <div className="my-5 py-5">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="text-dark w-full lg:w-1/2">
            <h1 className="text-2xl text-primary lg:text-3xl font-bold mb-4">
              <span className="text-gray-700">Our Service</span> Package
            </h1>
            <p className="text-md font-light mb-4 mr-4">
              Ensure the longevity and performance of your generator with our convenient service package! As a valued customer, you have the opportunity to book periodic servicing to keep your generator in peak condition. Simply specify how frequently you’d like our technicians to service your generator throughout the warranty period. Our dedicated team will handle all the details, providing maintenance tailored to your schedule and ensuring your generator remains reliable when you need it most.
            </p>
          </div>
          <div className="lg:w-1/2 text-left flex flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl text-primary font-bold mb-4">
              <span className="text-gray-700">Book For</span> Service
            </h1>
            <form>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Your Email"
                  />
                </div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select A Service
                  </option>
                  <option value="Diagnostic Test">Diagnostic Test</option>
                  <option value="Engine Servicing">Engine Servicing</option>
                  <option value="Tires Replacement">Tires Replacement</option>
                  <option value="Oil Changing">Oil Changing</option>
                </select>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Service Date"
                />
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Special Request"
                ></textarea>
                <button
                  type="submit"
                  className="w-full text-sm py-2 bg-primary text-white rounded-lg hover:bg-secondary"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
