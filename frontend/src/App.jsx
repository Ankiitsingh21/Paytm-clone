// App.jsx
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/sendMoney';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

const App = () => {
  const [currentPage, setCurrentPage] = useState('signin');
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(5000);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Sample users data - replace with your API calls
  const [users] = useState([
    { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { _id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    { _id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com' },
    { _id: '4', firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com' },
  ]);

  const handleSignIn = (email, password) => {
    // Replace with your API call
    console.log('Sign in:', { email, password });
    setUser({ firstName: 'Demo', lastName: 'User', email });
    setCurrentPage('dashboard');
  };

  const handleSignUp = (firstName, lastName, email, password) => {
    // Replace with your API call
    console.log('Sign up:', { firstName, lastName, email, password });
    setUser({ firstName, lastName, email });
    setCurrentPage('dashboard');
  };

  const handleSendMoney = (userId, amount, note) => {
    // Replace with your API call
    console.log('Send money:', { userId, amount, note });
    setBalance(prev => prev - amount);
    setCurrentPage('dashboard');
    setSelectedUser(null);
  };

  const handleSelectUserForMoney = (user) => {
    setSelectedUser(user);
    setCurrentPage('sendmoney');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('signin');
  };

  // Route rendering
  switch (currentPage) {
    case 'signin':
      return (
        <SignIn
          onSignIn={handleSignIn}
          onSwitchToSignUp={() => setCurrentPage('signup')}
        />
      );
    
    case 'signup':
      return (
        <SignUp
          onSignUp={handleSignUp}
          onSwitchToSignIn={() => setCurrentPage('signin')}
        />
      );
    
    case 'dashboard':
      return (
        <Dashboard
          user={user}
          balance={balance}
          users={users}
          onSendMoney={handleSelectUserForMoney}
          onLogout={handleLogout}
        />
      );
    
    case 'sendmoney':
      return (
        <SendMoney
          selectedUser={selectedUser}
          onBack={() => setCurrentPage('dashboard')}
          onSend={handleSendMoney}
        />
      );
    
    default:
      return <SignIn onSignIn={handleSignIn} onSwitchToSignUp={() => setCurrentPage('signup')} />;
  }
};

export default App;