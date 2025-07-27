// components/Balance.jsx
import React, { useState } from 'react';

const Balance = ({ balance }) => {
  const [showBalance, setShowBalance] = useState(false);
  
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-purple-100 text-sm">Available Balance</p>
          <div className="flex items-center space-x-3 mt-2">
            <h2 className="text-3xl font-bold">
              ₹{showBalance ? balance?.toLocaleString() || '0' : '****'}
            </h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-purple-100 hover:text-white w-6 h-6 flex items-center justify-center"
            >
              {showBalance ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-full p-3 w-12 h-12 flex items-center justify-center">
          💳
        </div>
      </div>
    </div>
  );
};

export default Balance;