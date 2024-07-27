import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeacherDetails = () => {
  const { authTokens, updateToken } = useAuth();
  const { teacherId } = useParams(); // Make sure this matches the param name from your URL
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/pending-teachers/${teacherId}/`, {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
          },
        });
        setTeacherProfile(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          await updateToken();
          fetchTeacherProfile(); // Retry the request once after refreshing the token
        } else {
          setError('Failed to fetch teacher profile details');
          console.error('Failed to fetch teacher profile details:', error);
        }
      }
    };

    fetchTeacherProfile();
  }, [authTokens, teacherId, updateToken]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!teacherProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Teacher Profile Detail</h2>
      <p>Username: {teacherProfile.user.username}</p>
      <p>Email: {teacherProfile.user.email}</p>
      <p>Qualifications: {teacherProfile.qualifications}</p>
      <p>Institute: {teacherProfile.institute}</p>
      <p>Experience: {teacherProfile.experience} years</p>
      {/* Add other fields you want to display */}
    </div>
  );
};

export default TeacherDetails;
