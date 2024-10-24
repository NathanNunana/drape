import React from "react";
import { FaSmile, FaBriefcase, FaClock, FaUsers } from "react-icons/fa";
import CountUp from "react-countup";

const Fact: React.FC = () => {
  const facts = [
    {
      icon: <FaSmile className="text-red-500 mb-3" size={40} />,
      count: 5543,
      description: "Happy Clients",
      delay: "0.1s",
    },
    {
      icon: <FaBriefcase className="text-red-500 mb-3" size={40} />,
      count: 10939,
      description: "Projects",
      delay: "0.3s",
    },
    {
      icon: <FaClock className="text-red-500 mb-3" size={40} />,
      count: 45.2,
      description: "Hours of Support",
      delay: "0.5s",
    },
    {
      icon: <FaUsers className="text-red-500 mb-3" size={40} />,
      count: 26,
      description: "Hard Workers",
      delay: "0.7s",
    },
  ];

  return (
    <div className="container-fluid bg-gray-50 py-10">
      <div className="container mx-auto px-8 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center"
              style={{ animationDelay: fact.delay }}
            >
              <div className="flex items-center justify-center mb-3">
                {fact.icon}
              </div>
              <h2 className="text-blue-900 mb-2 text-4xl font-bold">
                <CountUp end={fact.count} duration={2} />
              </h2>
              <p className="text-blue-900 mb-0 text-lg">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fact;

