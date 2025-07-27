// components/Appbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Appbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

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
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-1 rounded"
          >
            <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center text-xs">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <span className="text-sm">Hi, {user?.firstName || 'User'}</span>
          </button>
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