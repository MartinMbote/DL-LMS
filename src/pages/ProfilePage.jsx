import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';

const ProfilePage = () => {
  const { user } = useAuth();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      console.log(`Fetching profile data for user: ${username}`);
      axios.get(`http://127.0.0.1:8000/api/user-profile/${username}/`)
        .then(response => {
          setProfileData(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the profile data!", error);
        });
    }
  }, [username]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleMessageClick = () => {
    navigate(`/dl-lms/MessageBox/${profileData.username}`, {
      state: { selectedUser: profileData }
    });
  };
  const navbarProps = {
        isLoggedIn: !!user,
        username: user?.username,
    };

  return (
    <div>
    <NavBar {...navbarProps} />
      <section className="bg-gray-100 py-5">
        <div className="container mx-auto py-5">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-4">
              <div className="bg-white rounded shadow p-4 text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-full w-36 mx-auto mb-4"
                />
                <p className="text-gray-600 mb-1">{profileData.expertise}</p>
                <p className="text-gray-400 mb-4">{profileData.address}</p>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={handleMessageClick}
                    className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white border-[0.15vw] border-white text-[1vw] drop-shadow hover:scale-105 transition-transform'
                  >
                    Message
                  </button>
                </div>
              </div>

            
            </div>

            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded shadow p-4 mb-4">
                <div className="flex flex-wrap mb-4">
                  <div className="w-1/3">
                    <p className="font-bold">Full Name</p>
                  </div>
                  <div className="w-2/3">
                    <p className="text-gray-500">{profileData.username}</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap mb-4">
                  <div className="w-1/3">
                    <p className="font-bold">Email</p>
                  </div>
                  <div className="w-2/3">
                    <p className="text-gray-500">{profileData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap mb-4">
                  <div className="w-1/3">
                    <p className="font-bold">Qualifications</p>
                  </div>
                  <div className="w-2/3">
                    <p className="text-gray-500">{profileData.qualifications}</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap mb-4">
                  <div className="w-1/3">
                    <p className="font-bold">Institute</p>
                  </div>
                  <div className="w-2/3">
                    <p className="text-gray-500">{profileData.institute}</p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-wrap mb-4">
                  <div className="w-1/3">
                    <p className="font-bold">Profile Created At</p>
                  </div>
                  <div className="w-2/3">
                    <p className="text-gray-500">{new Date(profileData.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded shadow p-4">
                <p className="font-bold mb-2">About</p>
                <p className="text-gray-500">{profileData.about}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
