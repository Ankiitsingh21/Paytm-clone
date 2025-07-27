// pages/signUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !username || !password || !amount) {
      alert('Please fill in all fields');
      return;
    }

    if (parseFloat(amount) < 0) {
      alert('Initial amount must be positive');
      return;
    }

    try {
      setLoading(true);
      await signUp({
        firstName,
        lastName,
        username,
        password,
        amount: parseFloat(amount)
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <Heading label="Create Account" />
          <SubHeading label="Join thousands of users" />
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          
          <InputBox
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          
          <InputBox
            label="Initial Amount"
            placeholder="Enter initial amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          
          <Button 
            label={loading ? "Creating Account..." : "Sign Up"} 
            onClick={handleSubmit}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
          />
        </form>
        
        <BottomWarning
          label="Already have an account?"
          buttonText="Sign in"
          onClick={() => navigate('/signin')}
        />
      </div>
    </div>
  );
};

export default SignUp;