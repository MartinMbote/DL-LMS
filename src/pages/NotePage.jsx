import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';

const BASE_URL = 'http://localhost:8000';

const NotePage = () => {
  const { id, chapterId, subInfoId } = useParams();
  const [noteContent, setNoteContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchNotes();
  }, [id, chapterId, subInfoId]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/course/${id}/chapter/${chapterId}/subchapter/${subInfoId}/notes/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNoteContent(data.note || 'No notes available');
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNoteContent('Error fetching notes');
    }
  };

  const handleCopyContent = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(noteContent).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: userData.profile_picture,
  };

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className="flex">
        <SidePanel />
        <div>
          <div dangerouslySetInnerHTML={{ __html: noteContent }} />
          <button onClick={handleCopyContent}>
           
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
