import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', formData);
      const { token } = res.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Welcome Back</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Email input */}
          <div className="relative">
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer placeholder-transparent border border-gray-300 rounded-md px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
                        peer-placeholder-shown:top-3.5 
                        peer-placeholder-shown:text-base 
                        peer-placeholder-shown:text-gray-400 
                        peer-focus:top-1 
                        peer-focus:text-sm 
                        peer-focus:text-indigo-600 
                        peer-valid:top-1 
                        peer-valid:text-sm"
            >
              Email address
            </label>
          </div>

          {/* Password input */}
          <div className="relative">
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              className="peer placeholder-transparent border border-gray-300 rounded-md px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
                        peer-placeholder-shown:top-3.5 
                        peer-placeholder-shown:text-base 
                        peer-placeholder-shown:text-gray-400 
                        peer-focus:top-1 
                        peer-focus:text-sm 
                        peer-focus:text-indigo-600 
                        peer-valid:top-1 
                        peer-valid:text-sm"
            >
              Password
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <a href="/SignUpPage" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
