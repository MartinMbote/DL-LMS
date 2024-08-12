import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import ReactQuill from "react-quill"; // Rich text editor
import "react-quill/dist/quill.snow.css";

function AssignmentCreatePage() {
    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        dueDate: "",
        maxPoints: "",
        fileUpload: null
    });
    const navigate = useNavigate();
    const { user, authTokens } = useAuth();
    const { courseId } = useParams();

    useEffect(() => {
        if (!courseId) {
            console.error("No course ID provided.");
            navigate("/");
        }
    }, [courseId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignment({
            ...assignment,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setAssignment({
            ...assignment,
            fileUpload: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", assignment.title);
        formData.append("description", assignment.description);
        formData.append("due_date", assignment.dueDate);
        formData.append("max_points", assignment.maxPoints);
        formData.append("course", courseId);  // Add this line
        if (assignment.fileUpload) {
            formData.append("file_upload", assignment.fileUpload);
        }
    
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/course/${courseId}/assignments/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                }
            );
    
            if (response.status === 201) {
                Toastify({
                    text: "Assignment created successfully",
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
    
                setAssignment({
                    title: "",
                    description: "",
                    dueDate: "",
                    maxPoints: "",
                    fileUpload: null
                });
            }
        } catch (error) {
            console.error("Error creating the assignment:", error);
            const errorMessage = error.response?.data?.message || "Failed to create assignment, please try again.";
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
    

    const navbarProps = {
        isLoggedIn: !!user,
        username: user?.username,
    };

    return (
        <div>
            <NavBar {...navbarProps} />
            <div className="flex">
                <SidePanel />
                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={assignment.title}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Assignment Title"
                                required
                            />
                        </div>
                        <div>
    <label className="block text-sm font-medium text-gray-700">Description:</label>
    <ReactQuill value={assignment.description} onChange={(value) => setAssignment({ ...assignment, description: value })} />
</div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="datetime-local"
                                name="dueDate"
                                value={assignment.dueDate}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Maximum Points
                            </label>
                            <input
                                type="number"
                                name="maxPoints"
                                value={assignment.maxPoints}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                File Upload (Optional)
                            </label>
                            <input
                                type="file"
                                name="fileUpload"
                                onChange={handleFileChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>

                    <button
                        onClick={() => navigate(`/dl-lms/course/${courseId}/assignments/`)}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        View Assignments
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AssignmentCreatePage;
