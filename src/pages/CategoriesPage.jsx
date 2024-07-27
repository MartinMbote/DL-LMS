import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanelAdmin, Categories } from '../components';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

const CategoriesPage = () => {
  const [userData, setUserData] = useState({});
  const { user, authTokens } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data or other data here
    // Example:
    // axios.get('/api/user/', { headers: { Authorization: `Bearer ${authTokens.access}` } })
    //   .then(response => setUserData(response.data))
    //   .catch(err => setError(err))
    //   .finally(() => setLoading(false));
  }, [authTokens]);

  return (
    <div>
      <NavBar />
      <div className="flex">
        <SidePanelAdmin />
        <div className="container mx-auto p-4">
          <Categories />
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default CategoriesPage;
