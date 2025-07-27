import React from 'react';

const Heading = ({ label }) => {
  return (
    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
      {label}
    </h1>
  );
};

export default Heading;