import React, { useState, useEffect } from 'react';
import { NavBar, SidePanel } from '../components';
import { useAuth } from '../context/AuthContext';

const TempPage = () => {
  const [userData, setUserData] = useState({});
  const { user, authTokens } = useAuth();

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

    fetchUserData();
  }, [authTokens]);

  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: userData.profile_picture,
  };

  return (
    <div>
      <NavBar {...navbarProps} />
      <div>
        <SidePanel />
        <p>Temp Page</p>
        <div className='w-full h-[16.5vw]'></div>
      </div>
    </div>
  );
}

export default TempPage;
