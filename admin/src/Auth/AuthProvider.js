import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStoredToken = () =>
    localStorage.getItem('token') || sessionStorage.getItem('token');

  const login = (token, remember) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('token', token);
    setUser(token); // Simplified for demo
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const validateToken = async () => {
      const token = getStoredToken();
      if (token) {
        try {
          const response = await axios.get('/api/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};