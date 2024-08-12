import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanelAdmin } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [userData, setUserData] = useState({});
  const { user, authTokens } = useAuth();
  const [pendingApprovalCount, setPendingApprovalCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [error, setError] = useState(null);

  const fetchPendingApprovals = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/teachers/pending/count/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pending approvals');
      } else {
        const data = await response.json();
        setPendingApprovalCount(data.count);
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to fetch pending approvals');
      console.error(error);
    }
  };

  const fetchCountsAndIncome = async () => {
    try {
      const coursesResponse = await axios.get('/api/courses/count', {
        headers: { 'Authorization': `Bearer ${authTokens.access}` },
      });
      setCoursesCount(coursesResponse.data.count);

      const teachersResponse = await axios.get('/api/teachers/count', {
        headers: { 'Authorization': `Bearer ${authTokens.access}` },
      });
      setTeachersCount(teachersResponse.data.count);

      const studentsResponse = await axios.get('/api/students/count', {
        headers: { 'Authorization': `Bearer ${authTokens.access}` },
      });
      setStudentsCount(studentsResponse.data.count);

      const incomeResponse = await axios.get('/api/income/total', {
        headers: { 'Authorization': `Bearer ${authTokens.access}` },
      });
      setTotalIncome(incomeResponse.data.total);
    } catch (error) {
      setError(error.message);
      toast.error('Failed to fetch counts or income');
      console.error(error);
    }
  };

 
    
    
  useEffect(() => {
    fetchPendingApprovals();
    fetchCountsAndIncome();
    const interval = setInterval(fetchPendingApprovals, 60000); // Poll every 60 seconds
     fetchPendingApprovals();
     fetchCountsAndIncome();

    return () => clearInterval(interval); // Cleanup on unmount
  }, [authTokens]);


  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: userData.profile_picture,
  };

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className="flex">
        <SidePanelAdmin />
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="max-w-sm p-6 bg-nav-blue border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="w-7 h-7 text-white dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
              </svg>
              <Link to="/dl-lms/PendingTeacherList">
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
              <Link to="/dl-lms/Category/Create">
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

            <div className="max-w-sm p-6 bg-nav-blue border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="w-7 h-7 text-white dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 0h2v20H9V0ZM2 5h2v15H2V5ZM16 10h2v10h-2V10Z"/>
              </svg>
              <Link to="/dl-lms/CourseList">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Total Courses</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-500 text-white">{coursesCount}</p>
              <Link to="/dl-lms/CourseList" className="inline-flex font-medium items-center text-gray-900 hover:underline">
                View
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
              </Link>
            </div>

            <div className="max-w-sm p-6 bg-nav-blue border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="w-7 h-7 text-white dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15.5 2A3.5 3.5 0 1 0 19 5.5 3.5 3.5 0 0 0 15.5 2Zm0 6A2.5 2.5 0 1 1 18 5.5 2.5 2.5 0 0 1 15.5 8ZM10 10H0v10a1 1 0 0 0 1 1h8V10Zm-4.975.645a1.987 1.987 0 0 0-.714 1.075A2.06 2.06 0 0 0 4 12.198V19H2v-6.802c0-.77-.14-1.536-.52-2.178a.98.98 0 0 1-.155-.227Zm6.893 1.575c.081.138.15.284.224.426.39.746.52 1.592.52 2.178V19H6v-6.802c0-.529-.123-1.062-.311-1.553a1.917 1.917 0 0 0-.381-.592c1.434.261 2.567.735 3.61 1.267ZM8 10h1.5a5.55 5.55 0 0 0-.794-1.422A6.036 6.036 0 0 0 8 7.7V10Zm2-2.3c.004 0 .004 0 0 0Z"/>
              </svg>
              <Link to="/dl-lms/TeacherList">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Total Teachers</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-500 text-white">{teachersCount}</p>
              <Link to="/dl-lms/TeacherList" className="inline-flex font-medium items-center text-gray-900 hover:underline">
                View
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
              </Link>
            </div>

            <div className="max-w-sm p-6 bg-nav-blue border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="w-7 h-7 text-white dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 8h-2a5 5 0 1 0-10 0H4a4 4 0 0 0-4 4v8h20v-8a4 4 0 0 0-4-4ZM5.5 14a2.5 2.5 0 1 1 2.5 2.5A2.503 2.503 0 0 1 5.5 14Zm9 2.5A2.5 2.5 0 1 1 17 14a2.503 2.503 0 0 1-2.5 2.5ZM8 8a4 4 0 0 1 8 0ZM6 8a6 6 0 1 1 12 0h2a8 8 0 1 0-16 0Z"/>
              </svg>
              <Link to="/dl-lms/StudentList">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Total Students</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-500 text-white">0</p>
              <Link to="/dl-lms/StudentList" className="inline-flex font-medium items-center text-gray-900 hover:underline">
                View
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
              </Link>
            </div>

            <div className="max-w-sm p-6 bg-nav-blue border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="w-7 h-7 text-white dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 0h2v20H9V0ZM2 5h2v15H2V5ZM16 10h2v10h-2V10Z"/>
              </svg>
              <Link to="/dl-lms/IncomeReport">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Total Income</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-500 text-white">${totalIncome}</p>
              <Link to="/dl-lms/IncomeReport" className="inline-flex font-medium items-center text-gray-900 hover:underline">
                View
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
