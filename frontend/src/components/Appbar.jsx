// components/Appbar.jsx
import React from 'react';

const Appbar = ({ user, onLogout }) => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">P</span>
        </div>
        <h1 className="text-xl font-bold">PayWallet</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 cursor-pointer hover:bg-blue-700 rounded p-1 flex items-center justify-center">
          🔔
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Hi, {user?.firstName || 'User'}</span>
          <button
            onClick={onLogout}
            className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;