import React from "react";
import { FaUser, FaBriefcase, FaStar } from "react-icons/fa";
import { Technician } from "../../components";

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      {/* Company Information Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
        <p className="text-lg text-gray-700 mb-4">
          We are a passionate team dedicated to providing top-notch solutions
          that empower businesses and individuals alike. With a focus on
          innovation and customer satisfaction, we strive to make a positive
          impact in our industry and beyond.
        </p>
        <p className="text-lg text-gray-700">
          Founded in 2021, our company has rapidly grown to become a leader in
          our field, thanks to our talented team and commitment to excellence.
          Our services range from cutting-edge technology solutions to creative
          digital marketing strategies, all designed to meet the unique needs of
          our clients.
        </p>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white p-8 shadow-l mb-12">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          Our Mission, Vision, and Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaBriefcase className="text-blue-600 text-5xl mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Mission
              </h3>
              <p className="text-gray-700">
                Our mission is to deliver innovative solutions that drive growth
                and success for our clients. We are committed to excellence,
                creativity, and integrity in everything we do.
              </p>
            </div>
          </div>
          {/* Vision */}
          <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaStar className="text-yellow-600 text-5xl mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Vision
              </h3>
              <p className="text-gray-700">
                Our vision is to be a global leader in our industry, recognized
                for our groundbreaking solutions and exceptional service. We aim
                to create lasting value for our clients and make a meaningful
                difference in the world.
              </p>
            </div>
          </div>
          {/* Values */}
          <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaUser className="text-green-600 text-5xl mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Values
              </h3>
              <p className="text-gray-700">
                We believe in integrity, innovation, and collaboration. Our
                values guide us in every decision and interaction, ensuring that
                we consistently deliver high-quality results while fostering a
                positive work environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Technician />
    </div>
  );
};

export default About;
