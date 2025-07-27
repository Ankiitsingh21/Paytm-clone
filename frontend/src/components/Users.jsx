import React, { useState } from 'react';
import InputBox from './InputBox';

const Users = ({ users, onSendMoney }) => {
  const [filter, setFilter] = useState("");
  
  const filteredUsers = users?.filter(user =>
    user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
    user.lastName.toLowerCase().includes(filter.toLowerCase())
  ) || [];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Send Money</h3>
      <div className="mb-4">
        <InputBox
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => onSendMoney(user)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <span className="text-sm">📤</span>
              <span>Send</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;