import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2s
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Reset Your Password</h2>
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className="relative">
            <input
              type="password"
              required
              placeholder="New Password"
              className="border border-gray-300 rounded-md px-4 py-3 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              required
              placeholder="Confirm New Password"
              className="border border-gray-300 rounded-md px-4 py-3 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Reset Password
          </button>

          {message && (
            <p className="text-center text-sm text-red-500 mt-4">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
