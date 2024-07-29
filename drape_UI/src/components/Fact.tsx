import React from "react";
import { FaCheck, FaUsersCog, FaUsers, FaCar } from "react-icons/fa";
import CountUp from "react-countup";

const Fact: React.FC = () => {
  const facts = [
    {
      icon: <FaCheck className="text-white mb-3" size={40} />,
      count: 1234,
      description: "Years Experience",
      delay: "0.1s",
    },
    {
      icon: <FaUsersCog className="text-white mb-3" size={40} />,
      count: 1234,
      description: "Expert Technicians",
      delay: "0.3s",
    },
    {
      icon: <FaUsers className="text-white mb-3" size={40} />,
      count: 1234,
      description: "Satisfied Clients",
      delay: "0.5s",
    },
    {
      icon: <FaCar className="text-white mb-3" size={40} />,
      count: 1234,
      description: "Complete Projects",
      delay: "0.7s",
    },
  ];

  return (
    <div className="container-fluid bg-dark my-5 py-5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="text-center wow fadeIn flex flex-col items-center"
              style={{ animationDelay: fact.delay }}
            >
              <div className="flex items-center justify-center mb-3">
                {fact.icon}
              </div>
              <h2 className="text-white mb-2 text-2xl">
                <CountUp end={fact.count} duration={2} />
              </h2>
              <p className="text-white mb-0 text-l">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fact;
