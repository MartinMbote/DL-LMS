import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function CreateExamPage() {
    const [exam, setExam] = useState({
        title: "",
        description: "",
        duration: "",
        total_questions: "",
        total_marks: "",
        start_time: "",
        end_time: ""
    });
    const navigate = useNavigate();
    const { user, authTokens } = useAuth();
    const { courseId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            ...exam,
            duration: parseInt(exam.duration, 10),
            total_questions: parseInt(exam.total_questions, 10),
            total_marks: parseInt(exam.total_marks, 10)
        };

        console.log("Submitting data:", JSON.stringify(data, null, 2));

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/courses/${courseId}/exams/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });

            if (response.status === 201) {
                Toastify({
                    text: "Exam created successfully",
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

                setExam({
                    title: "",
                    description: "",
                    duration: "",
                    total_questions: "",
                    total_marks: "",
                    start_time: "",
                    end_time: ""
                });
            }
        } catch (error) {
            console.error("Error creating the exam:", error);
            const errorMessage = error.response?.data?.message || "Failed to create exam, please try again.";
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExam(prevExam => ({
            ...prevExam,
            [name]: value
        }));
    };

    const navbarProps = {
        isLoggedIn: !!user,
        username: user?.username,
    };

    return (
        <div>
            <NavBar {...navbarProps} />
            <div className="flex">
                <SidePanel/>
                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Create Exam</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Exam Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={exam.title}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Exam Title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={exam.description}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Description"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                value={exam.duration}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Duration"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Total Questions
                            </label>
                            <input
                                type="number"
                                name="total_questions"
                                value={exam.total_questions}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Total Questions"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Total Marks
                            </label>
                            <input
                                type="number"
                                name="total_marks"
                                value={exam.total_marks}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Total Marks"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Start Time
                            </label>
                            <input
                                type="datetime-local"
                                name="start_time"
                                value={exam.start_time}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                End Time
                            </label>
                            <input
                                type="datetime-local"
                                name="end_time"
                                value={exam.end_time}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
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
                        onClick={() => navigate(`/dl-lms/course/${courseId}/exams/`)}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        View Exams
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateExamPage;
