import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';
import "toastify-js/src/toastify.css";

function QuizPage() {
    const [quiz, setQuiz] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null); // State to store the results
    const [quizCompleted, setQuizCompleted] = useState(false); // State to track if the quiz is completed
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
                    await logout();
                } else {
                    setError('Error fetching quiz data');
                }
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [courseId, chapterId, subchapterId, authTokens.access, logout]);

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = answerIndex;
            return newAnswers;
        });
    };

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmit = () => {
        const results = quiz.map((question, index) => {
            const selectedAnswer = selectedAnswers[index];
            const correctAnswer = question.answers.find((answer) => answer.is_correct);
            return {
                question: question.question,
                correctAnswer: correctAnswer.text,
                userAnswer: question.answers[selectedAnswer].text,
                isCorrect: correctAnswer.text === question.answers[selectedAnswer].text,
            };
        });

        const marks = results.reduce((acc, result) => acc + (result.isCorrect ? 1 : 0), 0);

        setResults({ results, marks, quizLength: quiz.length });
        setQuizCompleted(true); // Set quiz as completed
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
                <SidePanel />
                <div className="container mx-auto p-4">
                    <h2 className="text-[1.4vw] font-semibold mb-[1vw]">Quiz</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && !error && !quizCompleted && currentQuestion && (
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <div>
                                    <label className="py-[1.5vw] text-[1.1vw] font-semibold text-strathmore-grey">
                                        {currentQuestion.question}
                                    </label>
                                    {currentQuestion.answers.map((answer, answerIndex) => (
                                        <div key={answerIndex} className="ml-4">
                                            <input
                                                type="radio"
                                                id={`question-${currentQuestionIndex}-answer-${answerIndex}`}
                                                name={`question-${currentQuestionIndex}`}
                                                value={answerIndex}
                                                checked={selectedAnswers[currentQuestionIndex] === answerIndex}
                                                onChange={() => handleAnswerSelect(answerIndex)}
                                                className="mr-2 text-strathmore-grey font-semibold mb-[1.2vw]"
                                            />
                                            <label htmlFor={`question-${currentQuestionIndex}-answer-${answerIndex}`} className="text-[0.9vw] text-strathmore-grey font-semibold mb-[1.2vw]">
                                                {answer.text}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                {currentQuestionIndex > 0 && (
                                    <button
                                        type="button"
                                        onClick={handlePrevious}
                                        className="w-[13.5vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white mt-[0.5vw]"
                                    >
                                        Previous
                                    </button>
                                )}
                                {currentQuestionIndex < quiz.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="w-[13.5vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white mt-[0.5vw]"
                                    >
                                        Next
                                    </button>
                                )}
                                {currentQuestionIndex === quiz.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="w-[13.5vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white mt-[0.5vw]"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                    {!loading && !error && quizCompleted && results && (
                       <div className="bg-white shadow-md rounded-lg p-6">
                       <h2 className="text-[1.4vw] font-semibold mb-[1vw]">Quiz Results</h2>
                       <p className="text-lg text-gray-700 mb-4">
                           You scored <span className="font-semibold text-blue-600">{results.marks}</span> out of <span className="font-semibold text-blue-600">{results.quizLength}</span>
                       </p>
                       <ul className="space-y-4">
                           {results.results.map((result, index) => (
                               <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                   <p className="text-md font-semibold text-gray-800 mb-2">Question: <span className="text-gray-600">{result.question}</span></p>
                                   <p className="text-md text-green-600 mb-1">Correct answer: <span className="font-semibold">{result.correctAnswer}</span></p>
                                   <p className={`text-md mb-1 ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                       Your answer: <span className="font-semibold">{result.userAnswer}</span>
                                   </p>
                                   <p className={`text-sm font-medium ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                       {result.isCorrect ? "Correct" : "Incorrect"}
                                   </p>
                               </li>
                           ))}
                       </ul>
                   </div>
                   
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuizPage;
