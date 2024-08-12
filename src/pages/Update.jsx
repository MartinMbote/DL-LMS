import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

function Update() {
    const [title, setTitle] = useState("");
    const [userData, setUserData] = useState({});
    const [subchapters, setSubchapters] = useState([{ title: "", videoUrl: "", note: "" }]);
    const navigate = useNavigate();
    const { user, authTokens } = useAuth();
    const { id } = useParams();

    useEffect(() => {
        console.log("Course ID:", id); // Log the id to ensure it's captured correctly
        if (!id) {
            console.error("No course ID provided.");
            navigate("/");
        }
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form fields
        if (title.trim() === "" || subchapters.some(subchapter => !subchapter.title || subchapter.title.trim() === "" || !subchapter.videoUrl.trim())) {
            alert("Please fill in all fields.");
            return;
        }
    
        // Prepare data
        const requestData = {
            title: title.trim(),
            subchapters: subchapters.map(subchapter => ({
                title: subchapter.title.trim(),
                video: subchapter.videoUrl.trim(),
                note: subchapter.note.trim()
            }))
        };
    
        try {
            // Send POST request
            const response = await axios.post(`http://127.0.0.1:8000/api/course/${id}/chapters/create/`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });
    
            if (response.status === 201) {
                Toastify({
                    text: "Chapter created successfully",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "rgba(2, 51, 141, 0.4)",
                        borderRadius: "10px",
                        fontSize: "15px",
                        padding: "15px",
                    },
                }).showToast();
    
                setTitle("");
                setSubchapters([{ title: "", videoUrl: "", note: "" }]);
                navigate(`/dl-lms/Update/${id}`);
            }
        } catch (error) {
            console.error("Error creating the chapter:", error); // Log error to console
            
            // Optionally send error details to a logging service
            try {
                await axios.post('http://127.0.0.1:8000/api/logs/', {
                    message: error.message,
                    stack: error.stack,
                    url: window.location.href
                });
            } catch (loggingError) {
                console.error("Error logging the error:", loggingError);
            }
    
            const errorMessage = error.response?.data?.message || "Failed to create chapter, please try again.";
            Toastify({
                text: errorMessage,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                style: {
                    background: "rgba(128, 0, 0, 0.4)",
                    borderRadius: "10px",
                    fontSize: "15px",
                    padding: "15px",
                },
            }).showToast();
        }
    };
    
    
    const handleSubchapterChange = (index, field, value) => {
        const newSubchapters = subchapters.map((subchapter, i) => {
            if (i === index) {
                return { ...subchapter, [field]: value };
            }
            return subchapter;
        });
        setSubchapters(newSubchapters);
    };

    const addSubchapter = () => {
        setSubchapters([...subchapters, { title: "", videoUrl: "", note: "" }]);
    };

    const removeSubchapter = (index) => {
        const newSubchapters = subchapters.filter((_, i) => i !== index);
        setSubchapters(newSubchapters);
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
                <div className="container mx-auto p-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Chapter Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Chapter Title"
                                required
                            />
                        </div>

                        {subchapters.map((subchapter, index) => (
                            <div key={index} className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Subchapter Title
                                    </label>
                                    <input
                                        type="text"
                                        value={subchapter.title}
                                        onChange={(e) => handleSubchapterChange(index, "title", e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Subchapter Title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Subchapter Video URL
                                    </label>
                                    <input
                                        type="text"
                                        value={subchapter.videoUrl}
                                        onChange={(e) => handleSubchapterChange(index, "videoUrl", e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Video URL"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Subchapter Notes
                                    </label>
                                    <ReactQuill
                                        value={subchapter.note}
                                        onChange={(value) => handleSubchapterChange(index, "note", value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Subchapter Notes"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeSubchapter(index)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove Subchapter
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addSubchapter}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                        >
                            Add Subchapter
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>

                    <button
                        onClick={() => navigate('/dl-lms/course/' + id + '/chapters/')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        View Chapters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Update;
