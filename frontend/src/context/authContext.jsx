import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check Authentication State on Page Load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/auth/me')
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login Function
  const login = async (email, password) => {
    const response = await api.post('/auth/signin', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ id: response.data.userId });
  };

  // Signup Function
  const signup = async (username, email, password) => {
    await api.post('/auth/signup', { username, email, password });
    await login(email, password);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
