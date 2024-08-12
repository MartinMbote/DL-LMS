import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function ExamPage() {
    const { courseId, examId } = useParams();
    const { user, authTokens } = useAuth();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [results, setResults] = useState(null); // Add a state to store the results

    useEffect(() => {
        const fetchExam = async () => {
            if (!authTokens) {
                console.error("No auth tokens available");
                return;
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/course/${courseId}/exams/${examId}/content/`, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                        'Content-Type': 'application/json',
                      },
                });
                setExam(response.data.exam);
                setQuestions(response.data.questions);
                setTimeLeft(response.data.duration * 60); // convert minutes to seconds
            } catch (error) {
                console.error("Error fetching exam:", error);
            }
        };
        fetchExam();
    }, [courseId, examId, authTokens]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Move this here
    
        if (!authTokens) {
            console.error("No auth tokens available");
            return;
        }
    
        try {
            const answers = Object.entries(responses).map(([questionId, userAnswer]) => ({
                question: questionId,
                text: userAnswer,
            }));
    
            const response = await axios.post(`http://127.0.0.1:8000/api/course/${courseId}/exams/${examId}/submit/`, 
                answers, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });
    
            if (response.status === 201) {
                Toastify({
                    text: "Exam submitted successfully",
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
                navigate(`/dl-lms/course/${courseId}/exam/${examId}/Review`);
            }
        } catch (error) {
            console.error("Error submitting exam:", error);
            const errorMessage = error.response?.data?.message || "Failed to submit exam, please try again.";
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

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
        const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleChange = (questionId, value) => {
        setResponses({
            ...responses,
            [questionId]: value
        });
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const calculateResults = () => {
        const results = questions.map((question, index) => {
            const userAnswer = responses[question.id];
            const correctAnswer = question.correct_answer;
            return {
                question: question.question_text,
                correctAnswer: correctAnswer,
                userAnswer: userAnswer,
                isCorrect: correctAnswer === userAnswer,
            };
        });
        setResults(results);
    };

    useEffect(() => {
        if (responses && questions) {
            calculateResults();
        }
    }, [responses, questions]);

    if (!exam) {
        return <div>Loading...</div>;
    }

    const navbarProps = {
        isLoggedIn: !!user,
        username: user?.username,
    };

    return (
        <div>
            <NavBar {...navbarProps} />
            <div className="flex">
                <SidePanel />
                <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">{exam.title}</h2>
                    <div className="mb-6">
                        <span className="text-xl text-red-600 font-semibold">Time left: {formatTime(timeLeft)}</span>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {questions.map((question, index) => (
                            <div key={question.id} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
                                <label className="block text-lg font-medium text-gray-700 mb-2">
                                    {index + 1}. {question.question_text}
                                </label>
                                {question.question_type === 'MCQ' && (
                                    <div className="space-y-2">
                                        <div>
                                            <input
                                                type="radio"
                                                name={`question_${question.id}`}
                                                value="A"
                                                onChange={() => handleChange(question.id, 'A')}
                                                className="mr-2"
                                            />
                                            {question.option_a}
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name={`question_${question.id}`}
                                                value="B"
                                                onChange={() => handleChange(question.id, 'B')}
                                                className="mr-2"
                                            />
                                            {question.option_b}
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name={`question_${question.id}`}
                                                value="C"
                                                onChange={() => handleChange(question.id, 'C')}
                                                className="mr-2"
                                            />
                                            {question.option_c}
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name={`question_${question.id}`}
                                                value="D"
                                                onChange={() => handleChange(question.id, 'D')}
                                                className="mr-2"
                                            />
                                            {question.option_d}
                                        </div>
                                    </div>
                                )}
                                {question.question_type === 'TF' && (
                                    <div className="space-y-2">
                                        <div>
                                            <input
                                                type="radio"
                                                name={`question_${question.id}`}
                                                value="True"
                                                onChange={() => handleChange(question.id, 'True')}
                                                className="mr-2"
                                            />
                                            True
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name={`question_${question.id}`}
                                                value="False"
                                                onChange={() => handleChange(question.id, 'False')}
                                                className="mr-2"
                                            />
                                            False
                                        </div>
                                    </div>
                                )}
                                {question.question_type === 'WR' && (
                                    <div>
                                        <textarea
                                            name={`question_${question.id}`}
                                            onChange={(e) => handleChange(question.id, e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter your answer"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit Exam
                        </button>
                    </form>
                    {results && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
                            <ul>
                                {results.map((result, index) => (
                                    <li key={index} className="mb-2">
                                        <p>
                                            Question: {result.question}
                                        </p>
                                        <p>
                                            Correct answer: {result.correctAnswer}
                                        </p>
                                        <p>
                                            Your answer: {result.userAnswer}
                                        </p>
                                        <p>
                                            {result.isCorrect ? "Correct" : "Incorrect"}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <p>
                                You scored {results.filter((result) => result.isCorrect).length} out of {questions.length}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ExamPage;