import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanelAdmin } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategoryPage = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const { authTokens, user } = useAuth();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/category/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });

            if (response.status === 201) {
                toast.success('Category created successfully');
                setTimeout(() => {
                    navigate('/dl-lms/AdminPage');
                }, 2000); // Delay navigation by 2 seconds
            }
        } catch (error) {
            toast.error('Error creating category');
            console.error('Error creating category:', error);
        }
    };

    const navbarProps = {
        isLoggedIn: !!user,
        username: user?.username,
        profilePicture: userData.profile_picture,
    };

    // Test button to manually trigger a toast notification
    const triggerTestToast = () => {
        toast.success('This is a test notification!');
    };

    return (
        <div>
            <NavBar {...navbarProps} />
            <div className="flex">
                <SidePanelAdmin />
                <div className="container mx-auto p-4">
                    <h2 className="text-2xl font-bold mb-4">Create Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Category Image</label>
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Category
                        </button>
                    </form>
                    <button
                        type="button"
                        onClick={triggerTestToast}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Trigger Test Toast
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateCategoryPage;
