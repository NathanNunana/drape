import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUs } from "../pages/slice/aboutUsSlice";
import { RootState, AppDispatch } from "../drape/store";
import { FaArrowRight } from "react-icons/fa";

const AboutUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id, image, motto, company_description, status, error } = useSelector(
    (state: RootState) => state.aboutUs
  );

  console.log(image)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAboutUs());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-lg text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-5">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Section */}
          <div className="relative pt-4 lg:w-1/2">
            <div className="relative wow fadeIn" data-wow-delay="0.1s">
              <img
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                src={image || "/path/to/default-image.jpg"} // Fallback image path
                alt="About Us"
              />
              <div className="absolute top-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold">
                  {id} <span className="text-lg">ID</span>
                </h1>
                <h4 className="text-sm">Identifier</h4>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h6 className="text-primary text-uppercase mb-4">// About Us //</h6>
            <h1 className="mb-4 text-3xl lg:text-4xl font-bold">
              <span className="text-primary">Drape</span> Is The Best Place For
              Your Generator
            </h1>
            <p className="mb-4 text-lg">
              {company_description || "We provide high-quality generators to meet all your needs."}
            </p>
            <p className="mb-4 text-lg italic">
              {motto || "Our motto is to deliver excellence and reliability."}
            </p>

            {/* Features List */}
            <div className="mb-6">
              {[
                {
                  number: "01",
                  title: "Professional & Expert",
                  description: "Diam dolor diam ipsum sit amet diam et eos",
                  delay: "0.1s",
                },
                {
                  number: "02",
                  title: "Quality Servicing Center",
                  description: "Diam dolor diam ipsum sit amet diam et eos",
                  delay: "0.3s",
                },
                {
                  number: "03",
                  title: "Awards Winning Workers",
                  description: "Diam dolor diam ipsum sit amet diam et eos",
                  delay: "0.5s",
                },
              ].map((item, index) => (
                <div
                  className="wow fadeIn mb-4"
                  data-wow-delay={item.delay}
                  key={index}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="bg-gray-200 flex items-center justify-center rounded-full"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="font-bold text-secondary">
                        {item.number}
                      </span>
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">{item.title}</h6>
                      <p className="text-base">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Read More Button */}
            <button className="flex items-center font-semibold bg-blue-500 text-white py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-300">
              Read More
              <FaArrowRight className="ml-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
