import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { NavBar, SidePanel } from '../components';
import { useAuth } from '../context/AuthContext';

function Exams() {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { courseId } = useParams();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/course/${courseId}/exams/`);
                console.log("Response data:", response.data); // Log the entire response data
                setExams(response.data);
            } catch (error) {
                console.error("Error fetching exams:", error);
            }
        };

        fetchExams();
    }, [courseId]);

    const navbarProps = {
        isLoggedIn:!!user,
        username: user?.username,
    };

    return (
        <div>
            <NavBar {...navbarProps} />
            <div className="flex">
                <SidePanel />
                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Exams</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {exams.map(exam => {
                            console.log("Exam:", exam); // Add this line for debugging
                            return (
                                <div key={exam.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-lg font-semibold mb-2">{exam.title}</h3>
                                    <p className="text-gray-600 mb-2">{exam.description}</p>
                                    <p className="text-gray-500 mb-2">Duration: {exam.duration} minutes</p>
                                    <p className="text-gray-500 mb-2">Total Questions: {exam.total_questions}</p>
                                    <p className="text-gray-500 mb-2">Total Marks: {exam.total_marks}</p>
                                    <p className="text-gray-500 mb-2">Start Time: {new Date(exam.start_time).toLocaleString()}</p>
                                    <p className="text-gray-500 mb-2">End Time: {new Date(exam.end_time).toLocaleString()}</p>
                                    <button
                                        onClick={() => navigate(`/dl-lms/course/${courseId}/exam/${exam.id}/add/question`)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Add Questions
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exams;