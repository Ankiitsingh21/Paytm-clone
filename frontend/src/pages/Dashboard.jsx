// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import apiService from '../services/api';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // For now, we'll use mock data since we need to create these endpoints in backend
      // In a real scenario, you would uncomment these API calls after creating the endpoints
      
      // const balanceResponse = await apiService.getBalance(token);
      // const usersResponse = await apiService.getUsers(token);
      
      // Mock data for demonstration
      setBalance(5000);
      setUsers([
        { 
          _id: '1', 
          firstName: 'John', 
          lastName: 'Doe', 
          username: 'john_doe',
          email: 'john@example.com' 
        },
        { 
          _id: '2', 
          firstName: 'Jane', 
          lastName: 'Smith', 
          username: 'jane_smith',
          email: 'jane@example.com' 
        },
        { 
          _id: '3', 
          firstName: 'Bob', 
          lastName: 'Johnson', 
          username: 'bob_johnson',
          email: 'bob@example.com' 
        },
        { 
          _id: '4', 
          firstName: 'Alice', 
          lastName: 'Brown', 
          username: 'alice_brown',
          email: 'alice@example.com' 
        },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMoney = (selectedUser) => {
    navigate('/send', { state: { selectedUser } });
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-16 w-full mb-6"></div>
          <div className="p-6 space-y-6">
            <div className="bg-gray-300 h-32 rounded-xl"></div>
            <div className="bg-gray-300 h-64 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar user={user} onLogout={handleLogout} />
      <div className="p-6 space-y-6">
        <Balance balance={balance} />
        <Users users={users} onSendMoney={handleSendMoney} />
      </div>
    </div>
  );
};

export default Dashboard;