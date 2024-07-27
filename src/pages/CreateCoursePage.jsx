import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavBar, SidePanel } from '../components';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';


const CreateCoursePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [skills, setSkills] = useState(''); // New state for skills
  const { user, authTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    if (authTokens) {
      fetchCategories();
    }
  }, [authTokens]);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', selectedCategory);
    formData.append('skills', skills); // Append skills to formData

    try {
      const response = await fetch('http://localhost:8000/api/course/create/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      } 
      Toastify({
        text: 'Course created successfully',
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

      navigate('/dl-lms/InstructorPage');
    } catch (error) {
      console.error('Failed to create course:', error);

      // Show error toast
      const errorMessage = error.response?.data?.message || 'Failed to create course';
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
    }
  };

  return (
    <div>
      <NavBar isLoggedIn={!!user} username={user?.username} />
      <div className='flex'>
        <SidePanel />
        <div className='w-full h-[43.8vw] overflow-y-auto'>
          <form onSubmit={handleCreateCourse} className='mt-[3vw] ml-[8vw]'>
            <h2 className='text-strathmore-red text-[2vw] font-semibold'>Create Course</h2>
            <div className='mb-[2vw]'>
              <label className='block text-nav-blue text-[1.5vw] font-semibold mb-2'>Title</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border rounded w-full py-2 px-3'
                required
              />
            </div>
            <div className='mb-[2vw]'>
              <label className='block text-nav-blue text-[1.5vw] font-semibold mb-2'>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='border rounded w-full py-2 px-3'
                required
              />
            </div>
            <div className='mb-[2vw]'>
              <label className='block text-nav-blue text-[1.5vw] font-semibold mb-2'>Price</label>
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='border rounded w-full py-2 px-3'
                required
              />
            </div>
            <div className='mb-[2vw]'>
              <label className='block text-nav-blue text-[1.5vw] font-semibold mb-2'>Image</label>
              <input
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
                className='border rounded w-full py-2 px-3'
                required
              />
            </div>
            <div className='mb-[2vw]'>
              <label className='block text-nav-blue text-[1.5vw] font-semibold mb-2'>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='border rounded w-full py-2 px-3'
                required
              >
                <option value=''>Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-[2vw]'>
              <label className='block text-nav-blue text-[1.5vw] font-semibold mb-2'>Skills You Will Gain</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className='border rounded w-full py-2 px-3'
                required
              />
            </div>
            <button type='submit' className='bg-strathmore-red text-white px-4 py-2 mt-4 rounded'>
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
