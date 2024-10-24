import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaPhoneAlt, FaEnvelope, FaFacebookF } from 'react-icons/fa';

const Topbar: React.FC = () => {
  return (
    <div className="bg-red-600 text-white py-3">
      <div className="flex justify-between items-center container mx-auto px-8 lg:px-32">
        <div className="text-sm font-light flex">
          <div className='flex items-center gap-2'>
            <a href="#" className="hover:opacity-75 text-sm text-slate-50"><FaEnvelope /></a>
            <a href="mailto:sales@tropicalpartsg.com" className="mr-6 hover:underline">
              sales@tropicalpartsg.com
            </a>
          </div>
          <div className='flex items-center gap-2'>
            <a href="#" className="hover:opacity-75 text-sm text-slate-50"><FaPhoneAlt /></a>
            <span className="mr-6">233206883274</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:opacity-75 text-sm text-slate-50"><FaTwitter /></a>
          <a href="#" className="hover:opacity-75 text-sm text-slate-50"><FaFacebookF /></a>
          <a href="#" className="hover:opacity-75 text-sm text-slate-50"><FaInstagram /></a>
          <a href="#" className="hover:opacity-75 text-sm text-slate-50"><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

