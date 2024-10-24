import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div>
      <div className="bg-gray-50">
        <div className="container mx-auto text-left mb-5 text-gray-500 px-8 lg:px-48 py-5">
          <p className="text-sm">
            <span className="text-red-500">Home</span> / About Us
          </p>
        </div>
      </div>
      <div className="">
        {/* Breadcrumb */}

        <div className="mx-auto container px-8 lg:px-48">
          {/* Header */}
          <div className="text-left mb-8">
            <h1 className="text-3xl font-semibold text-red-500 mb-4"><span className="text-gray-700">About</span> Us</h1>
            <p className="text-md font-light text-gray-700">
              Drape, established in 2015, specializes in the sales and supply of generator parts, equipment, and maintenance services. We offer a wide range of products from top aftermarket brands, ensuring reliability and long-lasting performance. Our inventory includes key components for major generator brands, such as Cummins, Perkins, Caterpillar, FG Wilson, and Honda. Additionally, we provide high-quality oils and lubricants from renowned brands like Castrol and Denso, ensuring optimal efficiency for your generator. At Drape, we are committed to delivering top-notch products and expert service to keep your power systems operating smoothly.
            </p>
          </div>

          {/* Company Story */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-500 mb-4"><span className="text-gray-700">Our</span> Vision</h2>
            <p className="text-gray-700 font-light text-md mb-4">
              Drape aims to be recognized as one of the leading providers of
              excellent generator maintenance services in Ghana.
            </p>

            <h2 className="text-xl font-semibold text-red-500 mb-4"><span className="text-gray-700">Our</span> Mission</h2>
            <p className="text-gray-700 font-light mb-4">
              Drape was established with the goal of ensuring customer satisfaction by delivering products and services that meet international standards in the generator industry. To achieve this, we have equipped our workshop with state-of-the-art tools and technology to meet our clients' generator maintenance and repair needs, including engine diagnostics, system calibration, generator inspections, and comprehensive servicing.
            </p>

            <h2 className="text-xl font-semibold text-red-500 mb-4"><span className="text-gray-700">Our</span> Commitment</h2>
            <p className="text-gray-700 font-light mb-4">
              Drape is dedicated to delivering top-quality services. We benchmark our processes against international standards such as ISO 9001 (Quality Management System) and IATF 16949 (Automotive Quality Management System). This ensures that every generator serviced or repaired by us is handled with professionalism and precision. Additionally, we provide a warranty on all parts purchased, alongside a customer satisfaction system to address any post-service concerns.
            </p>

            <p className="text-gray-700 font-light">
              Moreover, Drape's management prioritizes Health, Safety, and Environmental (HSE) best practices, adhering to global standards like ISO 45001 (Occupational Health and Safety Management System) and ISO 14001 (Environmental Management System). This reflects our commitment not only to high-quality service but also to ensuring a safe and sustainable operational environment.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

