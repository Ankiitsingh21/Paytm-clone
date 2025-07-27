import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const SendMoney = ({ selectedUser, onBack, onSend }) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSend = () => {
    if (amount && selectedUser) {
      onSend(selectedUser._id, parseFloat(amount), note);
      setAmount("");
      setNote("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center w-10 h-10">
          ←
        </button>
        <h1 className="text-xl font-semibold">Send Money</h1>
      </div>
      
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {selectedUser?.firstName[0]}{selectedUser?.lastName[0]}
            </div>
            <h2 className="text-xl font-semibold">{selectedUser?.firstName} {selectedUser?.lastName}</h2>
            <p className="text-gray-500">{selectedUser?.email}</p>
          </div>
          
          <InputBox
            label="Amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          
          <InputBox
            label="Note (Optional)"
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          
          <Button
            label={`Send ₹${amount || '0'}`}
            onClick={handleSend}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default SendMoney;