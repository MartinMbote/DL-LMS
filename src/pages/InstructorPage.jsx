import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NavBar, SidePanel } from '../components';
import { useAuth } from '../context/AuthContext';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const InstructorPage = () => {
  const { user, authTokens } = useAuth();
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [myCourses, setMyCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!authTokens) return;

    try {
      const response = await fetch('http://localhost:8000/api/user/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [authTokens]);

  const fetchMyCourses = useCallback(async () => {
    if (!authTokens) return;

    try {
      const response = await fetch('http://localhost:8000/api/instructor/courses/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch my courses');

      const data = await response.json();
      setMyCourses(data);
    } catch (error) {
      console.error('Failed to fetch my courses:', error);
      setError('Failed to fetch courses. Please try again.');
    }
  }, [authTokens]);

  useEffect(() => {
    if (authTokens) {
      fetchUserData();
      fetchMyCourses();
    }
  }, [authTokens, fetchUserData, fetchMyCourses]);

  const handleDeleteCourse = async (courseId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/course/delete/${courseId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete course');

      setMyCourses(myCourses.filter(course => course.id !== courseId));

      Toastify({
        text: 'Course deleted successfully',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'rgba(2, 51, 141, 0.4)',
          borderRadius: '10px',
          fontSize: '15px',
          padding: '15px',
        },
      }).showToast();
    } catch (error) {
      console.error('Failed to delete course:', error);

      Toastify({
        text: error.message || 'Failed to delete course',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'rgba(128, 0, 0, 0.4)',
          borderRadius: '10px',
          fontSize: '15px',
          padding: '15px',
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar isLoggedIn={!!user} username={user?.username} profilePicture={userData.profile_picture} />
      <div className="flex">
        <SidePanel />
        <div className="w-full h-[43.8vw] overflow-y-auto">
          <div className="mt-[3vw] ml-[8vw]">
            <h2 className="text-strathmore-red text-[2vw] font-semibold">Manage Courses</h2>
            {error && <p className="text-red-500">{error}</p>}
         
            {myCourses.map((course) => (
              <div key={course.id} className="border-b mb-[2vw] pb-[1vw]">
                <h3 className="text-nav-blue text-[1.5vw] font-semibold">{course.title}</h3>
                <img src={course.image} alt={course.title} className="h-[9vw]" />
                <div className="flex">
                  <button
                    className="bg-strathmore-red text-white px-2 py-1 mt-1 mr-2 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    onClick={() => handleDeleteCourse(course.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dl-lms/course/${course.id}/examcreate`}
                    className="bg-strathmore-red text-white px-2 py-1 mt-1 mr-2 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  >
                    + Exams
                  </Link>
                  <Link
                    to={`/dl-lms/update/${course.id}`}
                    className="bg-strathmore-red text-white px-2 py-1 mt-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  >
                    + Chapters
                  </Link>
                  <Link
                    to={`/dl-lms/course/${course.id}/assignment/create`}
                    className="bg-strathmore-red text-white px-3 py-1 mt-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  >
                    + Assignment
                  </Link>
                </div>
              </div>
            ))}
            <Link
              to={`/dl-lms/CreateCoursePage/`}
              className="bg-strathmore-red text-white px-2 py-1 mt-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
            >
              Create Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
