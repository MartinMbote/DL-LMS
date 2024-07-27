import React, { useEffect, useState } from 'react';
import { NavBar, SidePanel } from '../components';
import { useAuth } from '../context/AuthContext';
import { pinksweater } from '../assets';
import { Link } from 'react-router-dom';

const MyCoursePage = () => {
  const [userData, setUserData] = useState({});
  const { user, authTokens } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
    chapters: [
      {
        title: '',
        subchapters: [{ title: '', video: null }]
      }
    ]
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [categories, setCategories] = useState([]);

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

    const fetchMyCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/instructor/courses/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch my courses');
        }

        const data = await response.json();
        setMyCourses(data);
      } catch (error) {
        console.error('Failed to fetch my courses:', error);
      }
    };

    fetchUserData();
    fetchMyCourses();
  }, [authTokens]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleChapterChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = formData.chapters.map((chapter, i) => (
      i === index ? { ...chapter, [name]: value } : chapter
    ));
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const handleSubchapterChange = (chapterIndex, subchapterIndex, e) => {
    const { name, value, files } = e.target;
    const updatedChapters = formData.chapters.map((chapter, i) => (
      i === chapterIndex
        ? {
            ...chapter,
            subchapters: chapter.subchapters.map((subchapter, j) => (
              j === subchapterIndex ? { ...subchapter, [name]: files ? files[0] : value } : subchapter
            ))
          }
        : chapter
    ));
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const handleAddChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { title: '', subchapters: [{ title: '', video: null }] }]
    });
  };

  const handleAddSubchapter = (index) => {
    const updatedChapters = formData.chapters.map((chapter, i) => (
      i === index
        ? { ...chapter, subchapters: [...chapter.subchapters, { title: '', video: null }] }
        : chapter
    ));
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const handleCreateCourse = async () => {
    // Add the logic to create a course
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/course/${courseId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      setMyCourses(myCourses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  return (
    <div>
      <NavBar isLoggedIn={!!user} username={user?.username} profilePicture={userData.profile_picture} />
      <div className='mt-[3vw] ml-[8vw]'>
        <h2 className='text-strathmore-red text-[2vw] font-semibold'>Create a New Course</h2>
        <form className='flex flex-col gap-[1vw]'>
          <input
            type='text'
            name='title'
            placeholder='Course Title'
            value={formData.title}
            onChange={handleInputChange}
            className='p-[1vw] border text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
          />
          <textarea
            name='description'
            placeholder='Course Description'
            value={formData.description}
            onChange={handleInputChange}
            className='p-[1vw] border text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
          />
          <input
            type='number'
            name='price'
            placeholder='Course Price'
            value={formData.price}
            onChange={handleInputChange}
            className='p-[1vw] border text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
          />
          <select name='category' value={formData.category} onChange={handleInputChange} className='p-[1vw] border'>
            <option value=''>Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <input type='file' name='image' onChange={handleImageChange} className='p-[1vw] border ' />
          {formData.chapters.map((chapter, index) => (
            <div key={index} className='border p-[1vw] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>
              <input
                type='text'
                name='title'
                placeholder='Chapter Title'
                value={chapter.title}
                onChange={(e) => handleChapterChange(index, e)}
                className='p-[1vw] border text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
              />
              {chapter.subchapters.map((subchapter, subIndex) => (
                <div key={subIndex} className='border p-[1vw]'>
                  <input
                    type='text'
                    name='title'
                    placeholder='Subchapter Title'
                    value={subchapter.title}
                    onChange={(e) => handleSubchapterChange(index, subIndex, e)}
                    className='p-[1vw] border text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
                  />
                  <input
                    type='file'
                    name='video'
                    onChange={(e) => handleSubchapterChange(index, subIndex, e)}
                    className='p-[1vw] border'
                  />
                </div>
              ))}
              <button type='button' onClick={() => handleAddSubchapter(index)} className='bg-strathmore-red text-white px-[1vw] py-[0.5vw] mt-[1vw] rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>Add Subchapter</button>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default MyCoursePage;

