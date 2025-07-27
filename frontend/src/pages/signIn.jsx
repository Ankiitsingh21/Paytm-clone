// pages/signIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signIn({ username, password });
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <Heading label="Welcome Back" />
          <SubHeading label="Sign in to your account" />
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputBox
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          
          <InputBox
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          
          <Button 
            label={loading ? "Signing in..." : "Sign In"} 
            onClick={handleSubmit}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
          />
        </form>
        
        <BottomWarning
          label="Don't have an account?"
          buttonText="Sign up"
          onClick={() => navigate('/signup')}
        />
      </div>
    </div>
  );
};

export default SignIn;