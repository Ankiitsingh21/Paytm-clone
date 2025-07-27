// pages/signIn.jsx
import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SignIn = ({ onSignIn, onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSignIn(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <Heading label="Welcome Back" />
          <SubHeading label="Sign in to your account" />
        </div>
        
        <div className="space-y-4">
          <InputBox
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          
          <InputBox
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          
          <Button label="Sign In" onClick={handleSubmit} />
        </div>
        
        <BottomWarning
          label="Don't have an account?"
          buttonText="Sign up"
          onClick={onSwitchToSignUp}
        />
      </div>
    </div>
  );
};

export default SignIn;