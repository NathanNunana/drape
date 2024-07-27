import React from "react";

const Booking: React.FC = () => {
  return (
    <div className="bg-gray-800 my-5 py-5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-5 text-white">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              Certified and Award Winning Car Repair Service Provider
            </h1>
            <p>
              Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd
              ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo
              rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod
              et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit.
              Sea dolore sanctus sed et. Takimata takimata sanctus sed.
            </p>
          </div>
          <div className="lg:w-1/2 bg-blue-600 text-center p-5 flex flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Book For A Service
            </h1>
            <form>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Your Email"
                  />
                </div>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select A Service
                  </option>
                  <option value="1">Service 1</option>
                  <option value="2">Service 2</option>
                  <option value="3">Service 3</option>
                </select>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Service Date"
                />
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Special Request"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
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
