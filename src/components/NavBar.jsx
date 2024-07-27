import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import { bellIcon, messengerIcon, downArrow } from '../assets';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';  // Ensure axios is imported

const NavBar = ({ isLoggedIn, username }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const { logoutUser } = useAuth();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsVisible(false);
      setIsMessageVisible(false);
      setIsNotificationVisible(false);
    };

    const fetchCounts = async () => {
      try {
        const messagesResponse = await axios.get('http://127.0.0.1:8000/api/unread_messages_count/');
        const notificationsResponse = await axios.get('http://127.0.0.1:8000/api/unread_notifications_count/');
        
        setUnreadMessagesCount(messagesResponse.data.unread_messages_count);
        setUnreadNotificationsCount(notificationsResponse.data.unread_notifications_count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    fetchCounts();

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : '';
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    logoutUser();
    console.log('Logout function called');
  };

  return (
    <div>
      {isLoggedIn ? (
        <nav className='w-full h-[5vw] bg-nav-logged'>
          <Link to="/dl-lms/">
            <div className='absolute mt-[0.9vw] ml-[1.5vw]'>
              <div className='flex font-bold gap-[0.8vw]'>
                <div className='text-white bg-nav-blue w-[3.3vw] h-[3.3vw] rounded-[0.7vw] text-[1.4vw] flex justify-center leading-[3.2vw] '>
                  <p>DL</p>
                </div>
                <p className='text-nav-blue mt-[0.8vw] text-[1.1vw]'>DIGITAL LEARNING</p>
              </div>
            </div>
          </Link>
          
          <div className='absolute left-[31vw] top-[1vw] border'>
            <SearchComponent isLoggedIn={true} />
          </div>

          <div className='absolute right-[1.5vw] top-[1vw] flex text-white gap-[0.95vw]'>
            <div className='flex gap-[0.8vw] mt-[0.8vw]'>
              <div onClick={() => setIsNotificationVisible(!isNotificationVisible)}>
                <img src={bellIcon} className='h-[1.5vw] cursor-pointer' />
                <span></span>
                <div className='w-[0.5vw] h-[0.5vw] bg-red-600 mt-[-1.4vw] ml-[0.8vw] rounded-[3vw] z-10'></div>
              </div>
              <img src={messengerIcon} className='h-[1.4vw] cursor-pointer' onClick={() => setIsMessageVisible(!isMessageVisible)} />
              <span></span>
            </div>

            <div className='flex gap-[0.5vw] cursor-pointer' onClick={() => setIsVisible(!isVisible)}>
              <div className='h-[3vw] w-[3vw] bg-blue-500 rounded-[1.5vw] flex items-center justify-center text-white text-[1.2vw]'>
                {getInitials(username)}
              </div>
              <div className='text-strathmore-grey text-[0.9vw] font-semibold flex gap-[0.3vw] mt-[0.7vw]'>
                <p>{username}</p>
                <img src={downArrow} className='h-[0.6vw] mt-[0.43vw]' />
              </div>
            </div>
          </div>

          {isVisible && (
            <div className='absolute w-[12vw] right-[1.2vw] top-[5.5vw] bg-nav-logged rounded-[0.6vw] text-[1vw] font-semibold border pb-[0.4vw] pt-[0.7vw]'>
              <div className='cursor-pointer'>
                <p className='ml-[1.2vw] pt-[0.3vw] mb-[0.6vw]'>Profile</p>
              </div>
              <div className='cursor-pointer'>
                <p className='ml-[1.2vw] pt-[0.3vw] mb-[0.6vw]'>Settings</p>
              </div>
              <div className='cursor-pointer' onClick={handleLogout}>
                <div className='flex justify-center'>
                  <div className='w-[10.5vw] h-[0.05vw] bg-gray-300'></div>
                </div>
                <p className='ml-[1.2vw] mt-[0.2vw] py-[0.3vw]'>Log Out</p>
              </div>
            </div>
          )}

          {isMessageVisible && (
            <div className='absolute w-[17vw] right-[1.7vw] top-[5.5vw] bg-nav-logged text-[1vw] border pb-[0.4vw] pt-[0.7vw] rounded-[0.6vw]'>
              <div className='cursor-pointer'>
                <p className='ml-[1vw] py-[0.3vw]'>In publishing and graphic design, Lorem ipsum is a</p>
              </div>
              <div className='flex justify-center'>
                <div className='w-[15.5vw] h-[0.05vw] bg-gray-300 mt-[0.3vw]'></div>
              </div>
              <div className='cursor-pointer'>
                <p className='ml-[1vw] py-[0.3vw]'>In publishing and graphic design, Lorem ipsum is a</p>
              </div>
            </div>
          )}

          {/* Uncomment and complete this section to show notifications */}
          {isNotificationVisible && (
            <div className='absolute w-[13vw] right-[5.5vw] top-[5.5vw] bg-nav-logged text-[1vw] border pb-[0.4vw] pt-[0.7vw] rounded-[0.6vw] font-semibold'>
              <div className='cursor-pointer'>
                <p className='ml-[1.2vw] py-[0.3vw]'>Notification 1</p>
              </div>
              <div className='flex justify-center'>
                <div className='w-[10vw] h-[0.05vw] bg-gray-300 mt-[0.3vw]'></div>
              </div>
              <div className='cursor-pointer'>
                <p className='ml-[1.2vw] py-[0.3vw]'>Notification 2</p>
              </div>
            </div>
          )}
        </nav>
      ) : (
        <nav className='w-full h-[5vw] bg-nav-blue'>
          <div className='absolute mt-[0.9vw] ml-[1.5vw]'>
            <div className='flex font-bold gap-[0.8vw]'>
              <div className='text-nav-blue bg-white w-[3.3vw] h-[3.3vw] rounded-[0.7vw] text-[1.4vw] flex justify-center leading-[3.2vw] '>
                <p>DL</p>
              </div>
              <p className='text-white mt-[0.8vw] text-[1.1vw]'>DIGITAL LEARNING</p>
            </div>
          </div>
          
          <div className='absolute left-[31vw] top-[1vw] border'>
            <SearchComponent />
          </div>

          <div className='absolute right-[1.5vw] top-[1vw] flex text-white gap-[1.9vw]'>
            <Link to='/dl-lms/LogInPage'>
              <p className='text-[1.1vw] mt-[0.6vw] cursor-pointer hover:text-strathmore-yellow transition-colors duration-200 ease-in-out'>Login</p>
            </Link>
            <Link to='/dl-lms/SignUpPage'>
              <div className='w-[7.5vw] h-[2.9vw] border-[0.15vw] rounded-[0.6vw] text-center text-[1.2vw] leading-[2.5vw] cursor-pointer hover:text-strathmore-yellow hover:border-strathmore-yellow transition-colors duration-200 ease-in-out'>
                <p>Get Started</p>
              </div>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
