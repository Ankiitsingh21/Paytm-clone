// pages/Dashboard.jsx
import React from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';

const Dashboard = ({ user, balance, users, onSendMoney, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar user={user} onLogout={onLogout} />
      <div className="p-6 space-y-6">
        <Balance balance={balance} />
        <Users users={users} onSendMoney={onSendMoney} />
      </div>
    </div>
  );
};

export default Dashboard;