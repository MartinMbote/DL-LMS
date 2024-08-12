import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function CreateExamQuestion() {
    const [questions, setQuestions] = useState([{ question_text: "", question_type: "MCQ", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "" }]);
    const navigate = useNavigate();
    const { user, authTokens } = useAuth();
    const { examId } = useParams();

    useEffect(() => {
        if (!examId) {
            console.error("No exam ID provided.");
            navigate("/");
        }
    }, [examId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            questions: questions.map(q => ({
                question_text: q.question_text.trim(),
                question_type: q.question_type,
                option_a: q.option_a.trim(),
                option_b: q.option_b.trim(),
                option_c: q.option_c.trim(),
                option_d: q.option_d.trim(),
                correct_answer: q.correct_answer.trim(),
            }))
        };

        console.log("Submitting data:", JSON.stringify(data, null, 2));

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/exams/${examId}/questions/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });

            if (response.status === 201) {
                Toastify({
                    text: "Exam questions created successfully",
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

                setQuestions([{ question_text: "", question_type: "MCQ", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "" }]);
            }
        } catch (error) {
            console.error("Error creating the exam questions:", error);
            const errorMessage = error.response?.data?.message || "Failed to create questions, please try again.";
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

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = questions.map((q, i) => {
            if (i === index) {
                return { ...q, [field]: value };
            }
            return q;
        });
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question_text: "", question_type: "MCQ", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "" }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
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
                    <h2 className="text-xl font-semibold mb-4">Create Exam Questions</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {questions.map((q, index) => (
                            <div key={index} className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Question Text
                                    </label>
                                    <input
                                        type="text"
                                        value={q.question_text}
                                        onChange={(e) => handleQuestionChange(index, "question_text", e.target.value)}
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
                                        value={q.question_type}
                                        onChange={(e) => handleQuestionChange(index, "question_type", e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="MCQ">Multiple Choice</option>
                                        <option value="WR">Written</option>
                                        <option value="TF">True/False</option>
                                    </select>
                                </div>

                                {q.question_type === "MCQ" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Option A
                                            </label>
                                            <input
                                                type="text"
                                                value={q.option_a}
                                                onChange={(e) => handleQuestionChange(index, "option_a", e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="Enter Option A"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Option B
                                            </label>
                                            <input
                                                type="text"
                                                value={q.option_b}
                                                onChange={(e) => handleQuestionChange(index, "option_b", e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="Enter Option B"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Option C
                                            </label>
                                            <input
                                                type="text"
                                                value={q.option_c}
                                                onChange={(e) => handleQuestionChange(index, "option_c", e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="Enter Option C"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Option D
                                            </label>
                                            <input
                                                type="text"
                                                value={q.option_d}
                                                onChange={(e) => handleQuestionChange(index, "option_d", e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="Enter Option D"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {q.question_type === "TF" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                True/False Answer
                                            </label>
                                            <select
                                                value={q.correct_answer}
                                                onChange={(e) => handleQuestionChange(index, "correct_answer", e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                required
                                            >
                                                <option value="">Select the correct answer</option>
                                                <option value="True">True</option>
                                                <option value="False">False</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {q.question_type === "MCQ" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Correct Answer
                                        </label>
                                        <select
                                            value={q.correct_answer}
                                            onChange={(e) => handleQuestionChange(index, "correct_answer", e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select the correct answer</option>
                                            <option value="A">Option A</option>
                                            <option value="B">Option B</option>
                                            <option value="C">Option C</option>
                                            <option value="D">Option D</option>
                                        </select>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => removeQuestion(index)}
                                    className="text-red
-500 hover
text-sm"
>
Remove Question
</button>
</div>
))}

bash
Copy code
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                    >
                        Add Question
                    </button>

                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>

                <button
                    onClick={() => navigate(`/exams/${examId}/questions/`)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                    View Questions
                </button>
            </div>
        </div>
    </div>
);
}

export default CreateExamQuestion;