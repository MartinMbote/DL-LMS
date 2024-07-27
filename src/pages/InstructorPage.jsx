import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NavBar, SidePanel } from '../components';
import { pinksweater } from '../assets';
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authTokens) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/user/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log('User data:', data);
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchMyCourses = async () => {
      if (!authTokens) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/instructor/courses/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch my courses');
        }

        const data = await response.json();
        console.log('Fetched courses:', data);
        setMyCourses(data);
      } catch (error) {
        console.error('Failed to fetch my courses:', error);
        setError('Failed to fetch courses. Please try again.');
      }
    };

    if (authTokens) {
      fetchUserData();
      fetchMyCourses();
    }
  }, [authTokens]);

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

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      // Update state to reflect deletion
      setMyCourses(myCourses.filter(course => course.id !== courseId));

      // Show success toast
      Toastify({
        text: 'Course deleted successfully',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'rgba(2, 51, 141, 0.4)',
          borderRadius: '10px',
          fontSize: '15px',  // Increased font size
          padding: '15px',   // Increase padding
        },
      }).showToast();
    } catch (error) {
      console.error('Failed to delete course:', error);

      // Show error toast
      const errorMessage = error.response?.data?.message || 'Failed to delete course';
      Toastify({
        text: errorMessage,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'rgba(128, 0, 0, 0.4)',
          borderRadius: '10px',
          fontSize: '15px',  // Increased font size
          padding: '15px',   // Increase padding
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar isLoggedIn={!!user} username={user?.username} profilePicture={userData.profile_picture} />
      <div className='flex'>
        <SidePanel />
        <div className='w-full h-[43.8vw] overflow-y-auto'>
          <div className='flex gap-[1vw]'>
            <div className='w-[31vw] top-[17vw] left-[8vw] mt-[11vw] ml-[5vw]'>
              <p className='text-strathmore-red text-[3vw] font-semibold leading-[4vw]'>
                {user?.username
                  ? `${user.username}, Keep Teaching at a safe and steady pace.`
                  : 'Keep learning at a safe and steady pace.'}
              </p>
              <p className='text-strathmore-grey font-semibold mt-[2vw] mb-[2.2vw] text-[1.05vw]'>
                <span className='text-nav-blue'>Expert-led courses</span> across a variety of <span className='text-nav-blue'>online class topics</span> for every step of your career. Instructors with real-world experience.
              </p>
            </div>
            <div>
              <img src={pinksweater} className='h-[35vw] mt-[6vw]' alt="Pink Sweater" />
            </div>
          </div>
          <div className='mt-[3vw] ml-[8vw]'>
            <h2 className='text-strathmore-red text-[2vw] font-semibold'>Manage Courses</h2>
            {error && <p className="text-red-500">{error}</p>}
            {myCourses.length === 0 && <p>No courses available.</p>}
            {myCourses.map((course) => (
              <div key={course.id} className='border-b mb-[2vw] pb-[1vw]'>
                <h3 className='text-nav-blue text-[1.5vw] font-semibold'>{course.title}</h3>
                <img src={course.image} alt={course.title} className='h-[9vw]' />
                <div className='flex'>
                  <button
                    className='bg-strathmore-red text-white px-2 py-1 mt-1 mr-2 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dl-lms/course/${course.id}`}
                    className='bg-strathmore-red text-white px-2 py-1 mt-1 mr-2 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
                  >
                    View
                  </Link>
                  <Link
                    to={`/dl-lms/update/${course.id}`}
                    className='bg-strathmore-red text-white px-2 py-1 mt-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))}
            <Link
              to={`/dl-lms/CreateCoursePage/`}
              className='bg-strathmore-red text-white px-2 py-1 mt-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
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
