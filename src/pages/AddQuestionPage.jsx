import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function AddQuestionPage() {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({
        question_text: "",
        question_type: "MCQ",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: ""
    });
    const navigate = useNavigate();
    const { user, authTokens } = useAuth();
    const { examId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const questionData = { ...question, exam: examId };
        const response = await axios.post(`http://127.0.0.1:8000/api/exams/${examId}/questions/`, questionData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            }
        });

            if (response.status === 201) {
                Toastify({
                    text: "Questions added successfully",
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

                setQuestions([]);
                setQuestion({
                    question_text: "",
                    question_type: "MCQ",
                    option_a: "",
                    option_b: "",
                    option_c: "",
                    option_d: "",
                    correct_answer: ""
                });
            }
        } catch (error) {
            console.error("Error adding questions:", error);
            const errorMessage = error.response?.data?.message || "Failed to add questions, please try again.";
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

    const handleAddQuestion = () => {
        setQuestions(prevQuestions => [...prevQuestions, { ...question, exam: examId }]);
        setQuestion({
            question_text: "",
            question_type: "MCQ",
            option_a: "",
            option_b: "",
            option_c: "",
            option_d: "",
            correct_answer: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion(prevQuestion => ({
            ...prevQuestion,
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
                <SidePanel />
                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Add Question</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Question Text
                            </label>
                            <textarea
                                name="question_text"
                                value={question.question_text}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Question Text"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Question Type
                            </label>
                            <select
                                name="question_type"
                                value={question.question_type}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="MCQ">Multiple Choice</option>
                                <option value="WR">Written</option>
                                <option value="TF">True/False</option>
                            </select>
                        </div>
                        {question.question_type === 'MCQ' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Option A
                                    </label>
                                    <input
                                        type="text"
                                        name="option_a"
                                        value={question.option_a}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Option A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Option B
                                    </label>
                                    <input
                                        type="text"
                                        name="option_b"
                                        value={question.option_b}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Option B"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Option C
                                    </label>
                                    <input
                                        type="text"
                                        name="option_c"
                                        value={question.option_c}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Option C"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Option D
                                    </label>
                                    <input
                                        type="text"
                                        name="option_d"
                                        value={question.option_d}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Option D"
                                    />
                                </div>
                            </>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Correct Answer
                            </label>
                            <input
                                type="text"
                                name="correct_answer"
                                value={question.correct_answer}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Correct Answer"
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Add Question
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Submit All
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Questions to be submitted:</h3>
                        <ul className="list-disc list-inside">
                            {questions.map((q, index) => (
                                <li key={index}>{q.question_text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddQuestionPage;
