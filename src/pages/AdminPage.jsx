import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanelAdmin } from '../components';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

const AdminPage = () => {
  const [userData, setUserData] = useState({});
  const { user, authTokens } = useAuth();
  const [pendingApprovalCount, setPendingApprovalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingApprovals = async (retry = true) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/teachers/pending/count/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401 && retry) {
        // If unauthorized, try to refresh the token
        await updateToken();
        fetchPendingApprovals(false); // Retry the request once after refreshing the token
      } else if (!response.ok) {
        throw new Error('Failed to fetch pending approvals');
      } else {
        const data = await response.json();
        setPendingApprovalCount(data.count);
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to fetch pending approvals');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingApprovals();
  }, [authTokens]);

  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: userData.profile_picture,
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className="flex">
        <SidePanelAdmin />
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="max-w-sm p-6 bg-nav-blue border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="w-7 h-7 text-white dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
              </svg>
              <Link to="/dl-lms/PendingTeachersList">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Pending Teacher Approvals</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-500 text-white">{pendingApprovalCount}</p>
              <Link to="/dl-lms/PendingTeacherList" className="inline-flex font-medium items-center text-gray-900 hover:underline">
                View
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
              </Link>
            </div>
            <div className="max-w-sm p-6 bg-nav-blue border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="w-7 h-7 text-white dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.013 10.013 0 0 0 10 0Zm1 15H9v-2h2Zm0-4H9V5h2Z"/>
              </svg>
              <Link to="/dl-lms/CreateCategory">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Create Category</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-500 text-white">Create new categories for organizing courses.</p>
              <Link to="/dl-lms/Category/Create" className="inline-flex font-medium items-center text-gray-900 hover:underline">
                Create
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default AdminPage;
