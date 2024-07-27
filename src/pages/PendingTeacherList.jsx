import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS
import { NavBar, SidePanelAdmin } from '../components';

const PendingTeachersList = () => {
  const [userData, setUserData] = useState({});
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const { user, authTokens } = useAuth();

  useEffect(() => {
    const fetchPendingTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pending-teachers/', {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });
        setPendingTeachers(response.data);
      } catch (error) {
        console.error('Failed to fetch pending teachers:', error);
      }
    };

    fetchPendingTeachers(); // Call fetchPendingTeachers initially

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: userData.profile_picture,
  };// Empty dependency array to run effect only once

  const handleApprove = async (teacherId) => {
    try {
      await axios.post(`http://localhost:8000/api/pending-teachers/${teacherId}/approve/`, {}, {
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });
      toast.error('Failed to approve');
      // Refetch pending teachers to update the list
      fetchPendingTeachers();
    } catch (error) {
      toast.success('Teacher Approved');
      
    }
  };

  const handleReject = async (teacherId) => {
    try {
      await axios.post(`http://localhost:8000/api/pending-teachers/${teacherId}/reject/`, {}, {
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });
      toast.error('Failed to reject');
      // Refetch pending teachers to update the list
      fetchPendingTeachers();
    } catch (error) {
      toast.success('Teacher rejected');
      
    }
  };

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className="flex">
        <SidePanelAdmin />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Pending Approvals
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">A List of Pending Approvals</p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Applicants Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Experties
                </th>
                <th scope="col" className="px-6 py-3">
                  Cv Upload
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Approve</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Reject</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingTeachers.map((teacher) => (
                <tr key={teacher.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {teacher.username}
                  </td>
                  <td className="px-6 py-4">
                    {teacher.expertise}
                  </td>
                  <td className="px-6 py-4">
                    {teacher.cv_upload ? (
                      <a href={teacher.cv_upload} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">View CV</a>
                    ) : (
                      <span className="text-gray-400">No CV uploaded</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleApprove(teacher.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleReject(teacher.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default PendingTeachersList;
