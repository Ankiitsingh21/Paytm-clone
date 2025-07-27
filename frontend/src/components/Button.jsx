import React from 'react';

const Button = ({ label, onClick, className = "", variant = "primary" }) => {
  const baseClasses = "w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;