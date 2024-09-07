import React from "react";
// import { FaUser, FaBriefcase, FaStar } from "react-icons/fa";
import { Technician } from "../../components";

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-600">
          Discover who we are, what drives us, and how we’re committed to helping you.
        </p>
      </section>

      {/* Company Story */}
      <section className="my-12">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2 p-4">
            <img
              src="/assets/images/about-us.jpg"
              alt="Our Story"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 mb-4">
              Founded in [Year], our company has always been focused on bringing the best products and services to our customers. With years of experience, we have perfected our craft and built a brand that stands for quality, trust, and innovation.
            </p>
            <p className="text-gray-700 mb-4">
              From humble beginnings, our journey started with a small team and a big dream. Today, we are proud to serve thousands of customers worldwide, delivering not only products but solutions that meet their needs and exceed their expectations.
            </p>
            <p className="text-gray-700">
              We believe in continuous growth, adapting to new trends, and pushing the boundaries of what’s possible. Every step of our journey has been shaped by the commitment to provide value and build lasting relationships with our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-primary py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-8">Our Mission & Vision</h2>
        <div className="md:flex md:justify-center">
          <div className="md:w-1/3 p-4">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-4">
              To provide innovative, reliable, and high-quality products and services that enhance the lives of our customers, while contributing positively to the community and environment.
            </p>
          </div>
          <div className="md:w-1/3 p-4">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="mt-4">
              To be a globally recognized leader in our industry, known for pushing the boundaries of excellence and fostering long-term relationships with our customers and partners.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 text-center border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Integrity
            </h3>
            <p className="text-gray-600">
              We are committed to maintaining the highest ethical standards in all of our dealings, ensuring transparency and trustworthiness.
            </p>
          </div>
          <div className="p-6 text-center border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Innovation
            </h3>
            <p className="text-gray-600">
              We strive to stay ahead of the curve by embracing new ideas and technologies to deliver cutting-edge solutions to our customers.
            </p>
          </div>
          <div className="p-6 text-center border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Customer Focus
            </h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We listen, respond, and deliver value in every interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Technician />


      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Ready to Partner with Us?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Let us help you achieve your goals. Reach out to us today and let's build something great together.
        </p>
        <button className="py-3 px-8 bg-primary text-white font-semibold rounded-lg">
          Contact Us
        </button>
      </section>

    </div>
  );
};

export default About;
