import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const technicians = [
  {
    id: 1,
    name: "Full Name",
    designation: "Designation",
    image: "/assets/images/team-1.jpg",
    delay: "0.1s",
  },
  {
    id: 2,
    name: "Full Name",
    designation: "Designation",
    image: "/assets/images/team-2.jpg",
    delay: "0.3s",
  },
  {
    id: 3,
    name: "Full Name",
    designation: "Designation",
    image: "/assets/images/team-3.jpg",
    delay: "0.5s",
  },
  {
    id: 4,
    name: "Full Name",
    designation: "Designation",
    image: "/assets/images/team-4.jpg",
    delay: "0.7s",
  },
];

const Technicians: React.FC = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container mx-auto">
        <div className="text-center mb-5">
          <h6 className="text-primary text-lg font-semibold uppercase mb-2">
            Our Technicians
          </h6>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">
            Our Expert Technicians
          </h1>
        </div>
        <div className="flex flex-wrap -mx-4">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              className={`w-full lg:w-1/4 md:w-1/2 p-4 wow fadeInUp`}
              style={{ animationDelay: tech.delay }}
            >
              <div className="relative overflow-hidden bg-white shadow-sm">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="text-white mx-1">
                    <FaFacebookF size={20} />
                  </a>
                  <a href="#" className="text-white mx-1">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="text-white mx-1">
                    <FaInstagram size={20} />
                  </a>
                </div>
                <div className="bg-white text-center p-4">
                  <h5 className="font-bold mb-1">{tech.name}</h5>
                  <small>{tech.designation}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technicians;
