import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/welcome'; // Ensures a clean refresh after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <h1 className="text-xl font-bold">Event Dashboard</h1>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 transition-colors"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/attendees"
              className="hover:text-gray-300 transition-colors"
            >
              Attendees
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="hover:text-gray-300 transition-colors"
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/calendar"
              className="hover:text-gray-300 transition-colors"
            >
              Calendar
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
