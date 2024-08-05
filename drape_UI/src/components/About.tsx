import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUs } from "../pages/slice/aboutUsSlice";
import { RootState, AppDispatch } from "../drape/store";
import { FaArrowRight } from "react-icons/fa";

const AboutUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id, file, motor, company_description, status, error } = useSelector(
    (state: RootState) => state.aboutUs,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAboutUs());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-5">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="relative pt-4 lg:w-1/2">
            <div className="relative wow fadeIn" data-wow-delay="0.1s">
              <img
                className="w-full min-h-[400px] lg:min-h-[500px] object-cover"
                src={file}
                alt="About Us"
              />
              <div className="absolute top-0 right-0 mt-[-16px] mr-[-16px] py-4 px-5 bg-[rgba(0,0,0,0.08)]">
                <h1 className="text-white text-4xl mb-0">
                  {id} <span className="text-2xl">ID</span>
                </h1>
                <h4 className="text-white">Identifier</h4>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h6 className="text-primary text-uppercase">// About Us //</h6>
            <h1 className="mb-4 text-4xl font-bold">
              <span className="text-primary">Drape</span> Is The Best Place For
              Your Generator
            </h1>
            <p className="mb-4">{company_description}</p>
            <p className="mb-4">{motor}</p>
            <div className="mb-3 pb-3">
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
                  <div className="flex">
                    <div
                      className="bg-gray-200 flex items-center justify-center mt-1"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="font-bold text-secondary">
                        {item.number}
                      </span>
                    </div>
                    <div className="pl-3">
                      <h6>{item.title}</h6>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="flex items-center font-semibold bg-blue-500 text-white py-3 px-5">
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
