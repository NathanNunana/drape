import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div id="spinner" className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

