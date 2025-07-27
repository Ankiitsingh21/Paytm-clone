import React from 'react';

const BottomWarning = ({ label, buttonText, to, onClick }) => {
  return (
    <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 mt-4">
      <span>{label}</span>
      <button
        onClick={onClick}
        className="text-blue-600 hover:text-blue-800 underline font-medium"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default BottomWarning;