import React, { useEffect, useState } from 'react';
import { NavBar, SidePanel } from '../components';
import { Link } from 'react-router-dom';
import { pinksweater, clearArrow } from '../assets';
import { useAuth } from '../context/AuthContext';

const UserHomePage = () => {
  const [userData, setUserData] = useState({});
  const { user, authTokens } = useAuth();
  const [newReleases, setNewReleases] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [popularCoursesThisWeek, setPopularCoursesThisWeek] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

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
        setNewReleases(data);
      } catch (error) {
        console.error('Failed to fetch new releases:', error);
      }
    };

    const fetchTopPicks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/top-picks/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch top picks');
        }

        const data = await response.json();
        setTopPicks(data);
        setSuggestions(data); // Assuming topPicks should also be suggestions
      } catch (error) {
        console.error('Failed to fetch top picks:', error);
      }
    };

    const fetchPopularCoursesThisWeek = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/popular-courses-this-week/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch popular courses this week');
        }

        const data = await response.json();
        setPopularCoursesThisWeek(data);
      } catch (error) {
        console.error('Failed to fetch popular courses this week:', error);
      }
    };

    const fetchPopularCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/popular-courses/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch popular courses');
        }

        const data = await response.json();
        setPopularCourses(data);
      } catch (error) {
        console.error('Failed to fetch popular courses:', error);
      }
    };

    fetchUserData();
    fetchData();
  }, [authTokens]);

  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: userData.profile_picture,
  };

  const username = user?.username;

  const sectionTitle = [
    {
      title: `Top Picks for ${username || ''}`,
      courses: topPicks,
    },
    {
      title: `Suggested for ${username || ''}`,
      courses: suggestions, // Display suggestions instead of topPicks if they are the same
    },
    {
      title: "This week's top Courses",
      courses: popularCoursesThisWeek,
    },
    {
      title: "Popular on DL Learning",
      courses: popularCourses,
    },
    {
      title: "New Releases",
      courses: newReleases,
    },
  ];

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className='flex'>
        <SidePanel />
        <div className='w-full h-[43.8vw] overflow-y-auto'>
          <div className='flex gap-[1vw]'>
            <div className='w-[31vw] top-[17vw] left-[8vw] mt-[11vw] ml-[5vw]'>
              <p className='text-strathmore-red text-[3vw] font-semibold leading-[4vw]'>
                {username ? `${username}, Keep learning at a safe and steady pace.` : 'Keep learning at a safe and steady pace.'}
              </p>
              <p className='text-strathmore-grey font-semibold mt-[2vw] mb-[2.2vw] text-[1.05vw]'>
                <span className='text-nav-blue'>Expert-led courses</span> across a variety of <span className='text-nav-blue'>online class topics</span> for every step of your career. Instructors with real-world experience.
              </p>
              <div className='flex gap-[2.8vw] justify-center'>
                <div className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white hover:scale-105 transition-transform'>
                  <p>Start my free Month</p>
                </div>
                <div className='w-[11vw] h-[2.8vw] border-[0.15vw] border-strathmore-grey text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-strathmore-grey text-[1vw] hover:scale-105 transition-transform'>
                  <p>Buy for my Team</p>
                </div>
              </div>
            </div>
            <div>
              <img src={pinksweater} className='h-[35vw] mt-[6vw]' alt='Pink Sweater' />
            </div>
          </div>
          {sectionTitle.map((section, index) => (
            <div className='mb-[3vw]' key={index}>
              <div className='border w-full h-[8.5vw] bg-opacity-20 bg-strathmore-grey'>
                <p className='text-strathmore-red text-[3vw] mt-[1.8vw] ml-[8vw]'>
                  {section.title}
                </p>
              </div>
              <div>
                <div className='flex justify-end gap-[0.5vw] mr-[2vw] mt-[1.3vw]'>
                  <img src={clearArrow} className='h-[2vw] rotate-180 cursor-pointer' alt='Clear Arrow' />
                  <img src={clearArrow} className='h-[2vw] cursor-pointer' alt='Clear Arrow' />
                </div>
                <div className='flex justify-center mt-[1.2vw]'>
                  <div className='border w-[80vw] py-[2vw] flex'>
                    <div className='flex gap-[2vw] overflow-x-auto'>
                      <div className='w-[0vw] h-[1vw] bg-black'></div>
                      {section.courses.map((course, i) => (
                        <Link key={i} className='flex gap-[2vw]' to={`/dl-lms/course/${course.id}`}>
                          <div className='cursor-pointer flex-shrink-0 hover:scale-105 transition-transform mt-[1vw]'>
                            <img src={`http://localhost:8000/${course.image}`} className='h-[9vw]' alt={course.title} />
                            <div className='flex ml-[1.5vw] text-[1vw] font-bold mt-[0.7vw]'>
                              <div>
                                <p className='text-strathmore-grey font-semibold mt-[-0.4vw] mb-[0.2vw] text-[0.95vw]'>
                                  Course
                                </p>
                                <p>{course.title}</p>
                                <div className='flex text-[0.8vw] my-[0.2vw]'>
                                  <p className='text-[0.7vw] text-strathmore-grey mb-[1vw]'>
                                    By: {course.instructor || course.created_by}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className='w-[0vw] h-[1vw] bg-black'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
