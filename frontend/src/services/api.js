// src/services/api.js
const API_BASE_URL = 'http://localhost:3000/api/v1';

class ApiService {
  // Helper method to make API calls
  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }

  // Sign up user
  async signUp(userData) {
    return this.makeRequest('/signUp', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Sign in user
  async signIn(credentials) {
    return this.makeRequest('/signIn', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Update user profile
  async updateProfile(token, updateData) {
    return this.makeRequest('/update', {
      method: 'PUT',
      body: JSON.stringify({
        token,
        ...updateData,
      }),
    });
  }

  // Transfer money
  async transferMoney(token, transferData) {
    return this.makeRequest('/transfer', {
      method: 'POST',
      body: JSON.stringify({
        token,
        ...transferData,
      }),
    });
  }

  // Get user balance (we'll need to create this endpoint in backend)
  async getBalance(token) {
    return this.makeRequest('/balance', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  // Get all users (we'll need to create this endpoint in backend)
  async getUsers(token) {
    return this.makeRequest('/users', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
}

export default new ApiService();