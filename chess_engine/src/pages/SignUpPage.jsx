import React, { useState } from 'react';
import axios from 'axios'; // or use your custom API instance
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Create Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="relative">
            <input
              id="name"
              type="text"
              required
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              className="peer border border-gray-300 rounded-md px-4 py-3 w-full text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <label
              htmlFor="name"
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
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              id="email"
              type="email"
              required
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
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

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              type="password"
              required
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
