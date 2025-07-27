// pages/Profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout, error } = useAuth();
  
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    if (!firstName || !lastName) {
      alert('First name and last name are required');
      return;
    }

    try {
      setLoading(true);
      const updateData = { firstName, lastName };
      
      // Only include password if it's provided
      if (password) {
        updateData.password = password;
      }
      
      await updateProfile(updateData);
      setSuccess(true);
      setPassword(''); // Clear password field
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex items-center space-x-4">
        <button 
          onClick={handleBack} 
          className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center w-10 h-10"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold">Profile Settings</h1>
      </div>
      
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <h2 className="text-xl font-semibold">Update Profile</h2>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Profile updated successfully!
            </div>
          )}
          
          <div className="space-y-4">
            <InputBox
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            
            <InputBox
              label="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            
            <InputBox
              label="Username"
              placeholder="Username"
              value={username}
              onChange={() => {}} // Username is readonly for now
              className="bg-gray-100 cursor-not-allowed"
            />
            
            <InputBox
              label="New Password (Optional)"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            
            <Button
              label={loading ? "Updating..." : "Update Profile"}
              onClick={handleUpdate}
              className={loading ? 'opacity-50 cursor-not-allowed' : ''}
            />
            
            <Button
              label="Back to Dashboard"
              onClick={handleBack}
              variant="secondary"
            />
            
            <Button
              label="Logout"
              onClick={handleLogout}
              variant="danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;