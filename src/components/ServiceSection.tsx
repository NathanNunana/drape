import React from 'react';

const ServiceSection: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-md flex items-center">
            <i className="fas fa-certificate text-blue-500 text-4xl mr-4"></i>
            <div>
              <h5 className="text-xl font-semibold mb-2">Quality Servicing</h5>
              <p className="text-gray-700">Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md flex items-center">
            <i className="fas fa-users-cog text-blue-500 text-4xl mr-4"></i>
            <div>
              <h5 className="text-xl font-semibold mb-2">Expert Workers</h5>
              <p className="text-gray-700">Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
          <div className="bg-white p-6 shadow-md flex items-center">
            <i className="fas fa-tools text-blue-500 text-4xl mr-4"></i>
            <div>
              <h5 className="text-xl font-semibold mb-2">Modern Equipment</h5>
              <p className="text-gray-700">Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
