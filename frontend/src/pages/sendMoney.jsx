// pages/sendMoney.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const SendMoney = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transferMoney, error } = useAuth();
  const selectedUser = location.state?.selectedUser;
  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect to dashboard if no user selected
  React.useEffect(() => {
    if (!selectedUser) {
      navigate('/dashboard');
    }
  }, [selectedUser, navigate]);

  const handleSend = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      const response = await transferMoney({
        username: selectedUser.username,
        amount: parseFloat(amount)
      });
      
      setSuccess(true);
      console.log('Transfer successful:', response);
      
      // Show success message and redirect after delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Transfer error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (!selectedUser) {
    return null; // Will redirect in useEffect
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Transfer Successful!</h2>
          <p className="text-gray-600 mb-4">
            ₹{amount} has been sent to {selectedUser.firstName} {selectedUser.lastName}
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex items-center space-x-4">
        <button 
          onClick={handleBack} 
          className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center w-10 h-10"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold">Send Money</h1>
      </div>
      
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {selectedUser.firstName[0]}{selectedUser.lastName[0]}
            </div>
            <h2 className="text-xl font-semibold">
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <p className="text-gray-500">@{selectedUser.username}</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <InputBox
            label="Amount (₹)"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          
          <Button
            label={loading ? "Sending..." : `Send ₹${amount || '0'}`}
            onClick={handleSend}
            className={`mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          
          <Button
            label="Cancel"
            onClick={handleBack}
            variant="secondary"
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SendMoney;