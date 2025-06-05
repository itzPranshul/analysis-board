import React from 'react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Create Account</h2>
        <form className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <input
              id="name"
              type="text"
              required
              placeholder=" "
              className="peer placeholder-transparent border border-gray-300 rounded-md px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-600"
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
              className="peer placeholder-transparent border border-gray-300 rounded-md px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-600"
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
              className="peer placeholder-transparent border border-gray-300 rounded-md px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-600"
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
