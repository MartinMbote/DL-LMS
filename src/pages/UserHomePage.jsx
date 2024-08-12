import React, { useEffect, useState } from 'react';
import { NavBar, SidePanel } from '../components';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of Link
import { clearArrow } from '../assets';
import { useAuth } from '../context/AuthContext';

const UserHomePage = () => {
  const [userData, setUserData] = useState({});
  const [newReleases, setNewReleases] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [popularCoursesThisWeek, setPopularCoursesThisWeek] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [profileData, setProfileData] = useState({});

  const [pageIndexes, setPageIndexes] = useState({
    topPicks: 0,
    enrolledCourses: 0,
    suggestions: 0,
    popularCoursesThisWeek: 0,
    popularCourses: 0,
    newReleases: 0,
  });
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const { user, authTokens } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const baseurl= 

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
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([
          fetchNewReleases(),
          fetchPopularCourses(),
          fetchTopPicks(),
          fetchPopularCoursesThisWeek(),
          fetchEnrolledCourses(),
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchUserData();
    fetchData();
  }, [authTokens]);

  const fetchNewReleases = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/new-releases/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch new releases');
      }
  
      const data = await response.json();
      // Filter out enrolled courses
      const filteredNewReleases = data.filter((course) => {
        return !enrolledCourses.find((enrolledCourse) => enrolledCourse.id === course.id);
      });
      setNewReleases(filteredNewReleases);
    } catch (error) {
      console.error('Failed to fetch new releases:', error);
    }
  };
  
  



  const handleNextPage = (key) => {
    setPageIndexes((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };
  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/profile/enrolled-courses/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch enrolled courses:', errorData);
        return;
      }
  
      const data = await response.json();
      setEnrolledCourses(data); // Update the enrolled courses state
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
    }
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/student-profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
    
        const data = await response.json();
        setEnrolledCourses(data); // Set the courses directly if that's what you're receiving
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, [authTokens]);
  const handlePreviousPage = (key) => {
    setPageIndexes((prev) => ({
      ...prev,
      [key]: prev[key] - 1,
    }));
  };

  const handleMouseEnter = (courseId) => {
    setHoveredCourse(courseId);
  };

  const handleMouseLeave = () => {
    setHoveredCourse(null);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/dl-lms/course/${courseId}`);
  };

  const addToTopPicks = async (courseId) => {
    try {
      const response = await fetch('http://localhost:8000/api/userprofile/add-course/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id: courseId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add to top picks:', errorData);
        alert(errorData.error || 'Failed to add to top picks');
        return;
      }
      const fetchEnrolledCourses = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/profile/enrolled-courses/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Profile Data:', profileData);
console.log('Enrolled Courses:', profileData?.enrolled_courses);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch enrolled courses:', errorData);
      return;
    }
    console.log('Profile Data:', profileData);
console.log('Enrolled Courses:', profileData?.enrolled_courses);

    const data = await response.json();
    
    // Display the enrolled courses in the UI
  } catch (error) {
    console.error('Failed to fetch enrolled courses:', error);
  }
};

      const data = await response.json();
      console.log(data);
      // Refresh the top picks list
      fetchTopPicks();
    } catch (error) {
      console.error('Failed to add to top picks:', error);
    }
  };

  const isTopPick = (course) => topPicks.some((topPick) => topPick.id === course.id);
  console.log('Profile Data:', profileData);
  console.log('Enrolled Courses:', profileData?.enrolled_courses);
  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: userData.profile_picture,
  };

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className='flex'>
        <SidePanel />
        <div className='w-full h-[43.8vw] overflow-y-auto'>
          <div className='flex gap-[1vw]'>
          </div>
          {[
            
            {
              title: `Top Picks for ${user?.username || ''}`,
              courses: enrolledCourses, // Use enrolledCourses state directly
              key: 'enrolledCourses',
            },
            {
              title: `Suggested for ${user?.username || ''}`,
              courses: enrolledCourses, // Use enrolledCourses state directly
              key: 'enrolledCourses',
            },
            {
              title: "New Releases",
              courses: newReleases,
              key: 'newReleases',
            },
          ].map((section, index) => {
            const startIdx = pageIndexes[section.key] * 4;
            const endIdx = startIdx + 4;
            const currentPageItems = section.courses.slice(startIdx, endIdx);
            const hasPreviousPage = pageIndexes[section.key] > 0;
            const hasNextPage = endIdx < section.courses.length;

            return (
              <div className='mb-[3vw]' key={index}>
                
                <div className='border w-full h-[8.5vw] bg-opacity-20 bg-strathmore-grey'>
                  <p className='text-strathmore-red text-[3vw] mt-[1.8vw] ml-[8vw]'>
                    {section.title}
                  </p>
                </div>
                <div>
                  <div className='flex justify-end gap-[0.5vw] mr-[2vw] mt-[1.3vw]'>
                    <img
                      src={clearArrow}
                      className={`h-[2vw] rotate-180 cursor-pointer ${!hasPreviousPage && 'opacity-50'}`}
                      alt='Previous'
                      onClick={() => hasPreviousPage && handlePreviousPage(section.key)}
                    />
                    <img
                      src={clearArrow}
                      className={`h-[2vw] cursor-pointer ${!hasNextPage && 'opacity-50'}`}
                      alt='Next'
                      onClick={() => hasNextPage && handleNextPage(section.key)}
                    />
                  </div>
                  <div className='flex flex-wrap gap-[2vw] '>
                    {currentPageItems.map((course) => (
                      <div
                        key={course.id}
                        className='flex gap-[2vw] cursor-pointer'
                        onClick={() => handleCourseClick(course.id)}
                        onMouseEnter={() => handleMouseEnter(course.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          className='flex-shrink-0 hover:scale-105 transition-transform mt-[1vw]'
                          style={{ position: 'relative' }}
                        >
                          <img src={`http://localhost:8000${course.image}`} className='h-[9vw]' alt={course.title} />
                          <div className='flex ml-[1.5vw] text-[1vw] font-bold mt-[0.7vw]'>
                            <div>
                              <p className='text-strathmore-grey font-semibold mt-[-0.4vw] mb-[0.2vw] text-[0.95vw]'>
                                Course
                              </p>
                              <p>{course.title}</p>
                              <div className='flex text-[0.8vw] my-[0.2vw]'>
                                <p>By:</p>
                                <div className='ml-[0.2vw]'>
                                  <p>{course.created_by_username}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Conditionally render "Add" button */}
                          {section.key !== 'enrolledCourses' && !isTopPick(course) && hoveredCourse === course.id && (
                  <div
                    className='absolute bottom-0 right-0 p-[0.5vw] bg-strathmore-red text-white cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      addToTopPicks(course.id);
                    }}
                  >
                    +
                  </div>
                )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
