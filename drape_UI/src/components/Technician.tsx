import React from "react";

const technicians = [
  {
    id: 4,
    name: "Maxwell Anyison Kwasi",
    designation: "Brake Lathe Operator",
    image: "/assets/images/team-4.jpg",
  },
  {
    id: 1,
    name: "Anita Ameworwor",
    designation: "Administrative Officer",
    image: "/assets/images/team-1.jpg",
  },
  {
    id: 2,
    name: "Emmanuel Kusi",
    designation: "Automobile Mechanic",
    image: "/assets/images/team-2.jpg",
  },
  {
    id: 3,
    name: "Shadrack Kwame Appoh",
    designation: "Automobile Electrician",
    image: "/assets/images/team-3.jpg",
  },
  {
    id: 4,
    name: "Maxwell Anyison Kwasi",
    designation: "Brake Lathe Operator",
    image: "/assets/images/team-4.jpg",
  },

];

const Technicians: React.FC = () => {
  return (
    <div className="">
      <div className="bg-gray-50">
        <div className="container mx-auto text-left mb-5 text-gray-500 px-8 lg:px-48 py-5">
          <p className="text-sm">
            <span className="text-red-500">Home</span> / Our Team
          </p>
        </div>
      </div>
      <div className="">

        {/* Header */}
        <div className="mx-auto container text-left mb-5 px-8 lg:px-48">
          <h6 className="text-red-500 text-3xl font-semibold mb-6">
            <span className="text-gray-700">Our Technical</span> Team
          </h6>
          <p className="text-md font-light mb-4">
            We dedicate a lot of time and effort in ensuring that the people who
            join our team are dedicated and well motivated. We hire experienced
            people with the relevant qualifications to ensure that they deliver
            to meet the expectations of our stakeholders especially customers.
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-blue-50">
          <div className="container mx-auto flex flex-wrap-mx-4 justify-center py-20 px-8 lg:px-48">
            {technicians.map((tech) => (
              <div
                key={tech.id}
                className="w-full lg:w-1/4 md:w-1/2 p-4 wow fadeInUp"
              >
                <div className="bg-white text-center rounded-sm shadow-sm">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-48 object-cover rounded-t-sm"
                  />
                  <div className="p-4">
                    <h5 className="font-bold mb-1">{tech.name}</h5>
                    <p className="text-red-500">{tech.designation}</p>
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

export default Technicians;

