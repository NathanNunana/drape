import React, { useState } from "react";
import {
  FaCarSide,
  FaCar,
  FaCog,
  FaOilCan,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";

const Service: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const services = [
    {
      id: 1,
      icon: <FaCarSide size={40} />,
      title: "Diagnostic Test",
      image: "/assets/images/service-1.jpg",
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet",
      features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
    },
    {
      id: 2,
      icon: <FaCar size={40} />,
      title: "Engine Servicing",
      image: "/assets/images/service-2.jpg",
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet",
      features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
    },
    {
      id: 3,
      icon: <FaCog size={40} />,
      title: "Tires Replacement",
      image: "/assets/images/service-3.jpg",
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet",
      features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
    },
    {
      id: 4,
      icon: <FaOilCan size={40} />,
      title: "Oil Changing",
      image: "/assets/images/service-4.jpg",
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet",
      features: ["Quality Servicing", "Expert Workers", "Modern Equipment"],
    },
  ];

  return (
    <div className="container-xxl service py-5">
      <div className="container mx-auto">
        <div className="text-center mb-5">
          <h6 className="text-primary text-lg font-semibold uppercase mb-2">
            Our Services
          </h6>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">
            Explore Our Services
          </h1>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4">
            <div className="nav flex flex-col ">
              {services.map((service) => (
                <button
                  key={service.id}
                  className={`nav-link flex items-center text-start p-4 mb-4 ${activeTab === service.id ? "bg-primary text-white" : "bg-gray-100 text-black"}`}
                  onClick={() => setActiveTab(service.id)}
                  type="button"
                >
                  <div className="mr-3">{service.icon}</div>
                  <h4 className="m-0">{service.title}</h4>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-2/3 px-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`tab-pane ${activeTab === service.id ? "block" : "hidden"}`}
              >
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                    <div className="relative w-full h-64">
                      <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={service.image}
                        alt={service.title}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-3">
                      15 Years Of Experience In Auto Servicing
                    </h3>
                    <p className="mb-4">{service.description}</p>
                    {service.features.map((feature, index) => (
                      <p key={index} className="flex items-center mb-2">
                        <FaCheck className="text-green-500 mr-2" /> {feature}
                      </p>
                    ))}
                    <a
                      href="#"
                      className="btn btn-primary flex items-center py-2 px-4 mt-4"
                    >
                      Read More <FaArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
