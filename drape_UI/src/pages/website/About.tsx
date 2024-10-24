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
              Tropical Parts & Services Limited (TPSL) was established in 2015 and
              mainly into the sales and supply of automobile parts, garage equipment
              and auto maintenance services. We deal in most aftermarket popular
              brands including CTR, Tokico, KYB, RBI, Steinteile, Valor Brakes,
              KoreaStar, Global Auto Parts (GAP), Nissan, Toyota, Mitsubishi and
              Land Rover, Denso and Castrol lubricants.
            </p>
          </div>

          {/* Company Story */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-500 mb-4"><span className="text-gray-700">Our</span> Vision</h2>
            <p className="text-gray-700 font-light text-md mb-4">
              TPSL aims to be recognized as one of the leading providers of
              excellent automobiles maintenance services in Ghana.
            </p>

            <h2 className="text-xl font-semibold text-red-500 mb-4"><span className="text-gray-700">Our</span> Mission</h2>
            <p className="text-gray-700 font-light mb-4">
              TPSL was established with the aim of ensuring that our customers are
              happy with our products and services benchmarked with international
              standards of the industry. As a result, we have set up an ultramodern
              workshop with state-of-the-art equipment to meet the service and
              repair needs of our customers including engine, steering, suspension,
              braking, air-conditioning, vehicle inspection & diagnostics, wheel
              alignment, tire services, and the like.
            </p>

            <h2 className="text-xl font-semibold text-red-500 mb-4"><span className="text-gray-700">Our</span> Commitment</h2>
            <p className="text-gray-700 font-light mb-4">
              TPSL is committed to quality and to demonstrate this, we benchmark our
              processes and practices with international standards: ISO 9001
              (Quality Management System) and IATF 16949 (Automotive Quality
              Management System) to ensure that not only do we fix your vehicle, but
              we do so in a highly professional manner. We offer our customers
              warranty for all purchased parts and have a system in place for
              enhancing customer satisfaction.
            </p>

            <p className="text-gray-700 font-light">
              Aside from our focus on quality, the management of TPSL also believes
              in industry best practices on Health, Safety, and Environment (HSE). We
              demonstrate this by benchmarking and following the processes and
              practices of the international standards ISO 45001 (Occupational
              Health and Safety Management System) and ISO 14001 (Environmental
              Management System).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

