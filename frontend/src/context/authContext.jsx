// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await apiService.signUp(userData);
      
      if (response.token) {
        setToken(response.token);
        // Store user data (we'll get it from the token or make another API call)
        const userInfo = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
        };
        setUser(userInfo);
        
        // Save to localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        return response;
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await apiService.signIn(credentials);
      
      if (response.token) {
        setToken(response.token);
        // Store user data (we'll get it from the token or make another API call)
        const userInfo = {
          username: credentials.username,
        };
        setUser(userInfo);
        
        // Save to localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        return response;
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = async (updateData) => {
    try {
      setError(null);
      const response = await apiService.updateProfile(token, updateData);
      
      // Update user data
      const updatedUser = { ...user, ...updateData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const transferMoney = async (transferData) => {
    try {
      setError(null);
      const response = await apiService.transferMoney(token, transferData);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    signUp,
    signIn,
    logout,
    updateProfile,
    transferMoney,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};