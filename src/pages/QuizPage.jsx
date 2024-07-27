import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanelAdmin } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function QuizPage() {
    const [quiz, setQuiz] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionState, setQuestionState] = useState(null);
    const [buttonText, setButtonText] = useState("Submit");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, authTokens, logout } = useAuth();
    const { courseId, chapterId, subchapterId } = useParams();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/course/${courseId}/chapter/${chapterId}/subchapter/${subchapterId}/content/list/`, 
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authTokens.access}`
                        }
                    }
                );
                setQuiz(response.data.quizzes);
                setLoading(false);
            } catch (error) {
                if (error.response?.status === 401) {
                    // Handle token refresh if unauthorized
                    await logout();
                } else {
                    setError('Error fetching quiz data');
                }
                setLoading(false);
                console.error("Error fetching quiz:", error);
            }
        };

        fetchQuiz();
    }, [courseId, chapterId, subchapterId, authTokens.access, logout]);

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentQuestion = quiz[currentQuestionIndex];
        const selectedAnswerObj = currentQuestion.answers[selectedAnswer];

        if (selectedAnswerObj.is_correct) {
            setQuestionState('correct');
            setButtonText('Next');
        } else {
            setQuestionState('incorrect');
            setButtonText('Try Again');
        }

        Toastify({
            text: "Answer submitted",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: selectedAnswerObj.is_correct ? "rgba(2, 141, 2, 0.4)" : "rgba(141, 2, 2, 0.4)",
                borderRadius: "10px",
                fontSize: "15px",
                padding: "15px"
            }
        }).showToast();
    };

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setQuestionState(null);
        setButtonText("Submit");
    };

    const navbarProps = {
        isLoggedIn: !!user,
        username: user?.username,
    };

    const currentQuestion = quiz[currentQuestionIndex];

    return (
        <div>
            <NavBar {...navbarProps} />
            <div className="flex">
                <SidePanelAdmin />
                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Quiz</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && !error && currentQuestion && (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {currentQuestion.question}
                                    </label>
                                    {currentQuestion.answers.map((answer, answerIndex) => (
                                        <div key={answerIndex} className="ml-4">
                                            <input
                                                type="radio"
                                                id={`question-${currentQuestionIndex}-answer-${answerIndex}`}
                                                name={`question-${currentQuestionIndex}`}
                                                value={answerIndex}
                                                checked={selectedAnswer === answerIndex}
                                                onChange={() => handleAnswerSelect(answerIndex)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`question-${currentQuestionIndex}-answer-${answerIndex}`} className="text-sm font-medium text-gray-700">
                                                {answer.text}
                                            </label>
                                        </div>
                                    ))}
                                    {questionState && (
                                        <p className={`text-sm ${questionState === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                                            {questionState === 'correct' ? 'Correct' : 'Incorrect'}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                type={questionState === 'correct' ? 'button' : 'submit'}
                                onClick={questionState === 'correct' ? handleNext : undefined}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {buttonText}
                            </button>
                        </form>
                    )}
                    {!loading && !error && !currentQuestion && (
                        <p>You've completed all the quizzes!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuizPage;
