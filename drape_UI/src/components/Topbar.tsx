import React from 'react';
import { FaSearchLocation, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Topbar: React.FC = () => {
  return (
    <div className="bg-gray-100 p-0">
      <div className="lg:flex justify-between items-center px-8 py-2">
        <div className="flex space-x-8 py-2 text-gray-700">
          <div className="flex items-center">
            <div className='text-blue-500 mr-2'>
              <FaSearchLocation />
            </div>
            <span className='text-sm'>123 Street, New York, USA</span>
          </div>
          <div className="flex items-center">
            <div className='text-blue-500 mr-2'>
              <FaClock />
            </div>
            <span className='text-sm'>Mon - Fri : 09.00 AM - 09.00 PM</span>
          </div>
        </div>
        <div className="hidden lg:flex space-x-2">
          <div className='bg-white p-3 rounded text-blue-500'>
            <FaFacebook />
          </div>
          <div className='bg-white p-3 rounded text-blue-500'>
            <FaTwitter />
          </div>
          <div className='bg-white p-3 rounded text-blue-500'>
            <FaLinkedin />
          </div>
          <div className='bg-white p-3 rounded text-blue-500'>
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

