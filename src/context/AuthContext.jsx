import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    try {
      const storedTokens = localStorage.getItem('authTokens');
      return storedTokens ? JSON.parse(storedTokens) : null;
    } catch (error) {
      console.error('Error parsing auth tokens from localStorage:', error);
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const storedTokens = localStorage.getItem('authTokens');
      return storedTokens ? jwtDecode(JSON.parse(storedTokens).access) : null;
    } catch (error) {
      console.error('Error decoding user from auth tokens:', error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]*)`);
    return cookieValue ? cookieValue[2] : null;
  };

  const loginUser = async (username, password) => {
    const csrftoken = getCookie('csrftoken');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      const decodedUser = jwtDecode(data.access);

      setAuthTokens(data);
      setUser(decodedUser);
      localStorage.setItem('authTokens', JSON.stringify(data));

      if (decodedUser.role === 'admin') {
        navigate('/dl-lms/AdminPage');
      } else if (decodedUser.role === 'teacher') {
        navigate('/dl-lms/InstructorPage');
      } else if (decodedUser.role === 'student') {
        navigate('/dl-lms/UserHomePage');
      } else {
        navigate('/dl-lms/');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    try {
      console.log('Logging out user...');
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem('authTokens');
      console.log('User logged out, navigating to root route...');
      navigate('/dl-lms/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateToken = async () => {
    try {
      if (!authTokens) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          logoutUser();
        } else {
          throw new Error('Token refresh failed');
        }
      }

      const data = await response.json();
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
    } catch (error) {
      console.error('Token refresh error:', error);
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const tokenRefreshInterval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 4);

    return () => clearInterval(tokenRefreshInterval);
  }, [authTokens, loading]);

  const contextData = {
    user,
    authTokens,
    login: loginUser,
    logout: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);