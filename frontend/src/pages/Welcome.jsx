import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Event Management Dashboard</h1>
      <p className="mb-6 text-lg text-gray-700">Manage events, tasks, and attendees seamlessly!</p>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/signup')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/login')}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Welcome;
