import React from "react";

const UsefulLinks: React.FC = () => {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-md">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Useful Links</h4>
      <ul className="text-sm text-gray-600 space-y-2">
        <li><a href="#" className="hover:text-red-500">About Us</a></li>
        <li><a href="#" className="hover:text-red-500">Our Team</a></li>
        <li><a href="#" className="hover:text-red-500">Our Services</a></li>
        <li><a href="#" className="hover:text-red-500">Customer Service</a></li>
        <li><a href="#" className="hover:text-red-500">Promotions</a></li>
        <li><a href="#" className="hover:text-red-500">Products</a></li>
        <li><a href="#" className="hover:text-red-500">Service Package</a></li>
      </ul>

      {/* Social Icons */}
      <div className="mt-6">
        <h5 className="text-sm font-semibold mb-2">Our Social Networks</h5>
        <div className="flex space-x-3 text-gray-600">
          <a href="#" className="hover:text-red-500"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-red-500"><i className="fab fa-facebook"></i></a>
          <a href="#" className="hover:text-red-500"><i className="fab fa-instagram"></i></a>
          <a href="#" className="hover:text-red-500"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  );
};

export default UsefulLinks;
