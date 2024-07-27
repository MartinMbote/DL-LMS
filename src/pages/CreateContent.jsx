import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanelAdmin } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function CreateContent() {
    const [quiz, setQuiz] = useState([{ question: "", answers: ["", "", "", ""], correctAnswerIndex: null }]);
    const navigate = useNavigate();
    const { user, authTokens } = useAuth();
    const { courseId, chapterId, subchapterId } = useParams();

    useEffect(() => {
        if (!subchapterId) {
            console.error("No subchapter ID provided.");
            navigate("/");
        }
    }, [subchapterId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            quiz: quiz.map(q => ({
                question: q.question.trim(),
                answers: q.answers.map((a, index) => ({
                    text: a.trim(),
                    is_correct: index === q.correctAnswerIndex
                }))
            }))
        };

        console.log("Submitting data:", JSON.stringify(data, null, 2));

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/course/${courseId}/chapter/${chapterId}/subchapter/${subchapterId}/content/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });

            if (response.status === 201) {
                Toastify({
                    text: "Subchapter content created successfully",
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

                setQuiz([{ question: "", answers: ["", "", "", ""], correctAnswerIndex: null }]);
            }
        } catch (error) {
            console.error("Error creating the subchapter content:", error);
            const errorMessage = error.response?.data?.message || "Failed to create content, please try again.";
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

    const handleQuizChange = (index, field, value) => {
        const newQuiz = quiz.map((q, i) => {
            if (i === index) {
                return { ...q, [field]: value };
            }
            return q;
        });
        setQuiz(newQuiz);
    };

    const handleAnswerChange = (quizIndex, answerIndex, value) => {
        const newQuiz = quiz.map((q, i) => {
            if (i === quizIndex) {
                const newAnswers = q.answers.map((a, j) => {
                    if (j === answerIndex) {
                        return value;
                    }
                    return a;
                });
                return { ...q, answers: newAnswers };
            }
            return q;
        });
        setQuiz(newQuiz);
    };

    const addQuiz = () => {
        setQuiz([...quiz, { question: "", answers: ["", "", "", ""], correctAnswerIndex: null }]);
    };

    const removeQuiz = (index) => {
        const newQuiz = quiz.filter((_, i) => i !== index);
        setQuiz(newQuiz);
    };

    const navbarProps = {
        isLoggedIn: !!user,
        username: user?.username,
    };

    return (
        <div>
            <NavBar {...navbarProps} />
            <div className="flex">
                <SidePanelAdmin />
                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Create Subchapter Content</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {quiz.map((q, index) => (
                            <div key={index} className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Quiz Question
                                    </label>
                                    <input
                                        type="text"
                                        value={q.question}
                                        onChange={(e) => handleQuizChange(index, "question", e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Quiz Question"
                                        required
                                    />
                                </div>

                                {q.answers.map((answer, i) => (
                                    <div key={i} className="ml-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Answer {i + 1}
                                        </label>
                                        <input
                                            type="text"
                                            value={answer}
                                            onChange={(e) => handleAnswerChange(index, i, e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder={`Enter Answer ${i + 1}`}
                                            required
                                        />
                                    </div>
                                ))}

                                <div className="ml-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Correct Answer Index
                                    </label>
                                    <select
                                        value={q.correctAnswerIndex}
                                        onChange={(e) => handleQuizChange(index, "correctAnswerIndex", parseInt(e.target.value))}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="" disabled>Select the correct answer</option>
                                        {q.answers.map((_, i) => (
                                            <option key={i} value={i}>{`Answer ${i + 1}`}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeQuiz(index)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove Quiz
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addQuiz}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                        >
                            Add Quiz
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>

                    <button
                        onClick={() => navigate(`/course/${courseId}/chapter/${chapterId}/subchapters/`)}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        View Subchapters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateContent;
