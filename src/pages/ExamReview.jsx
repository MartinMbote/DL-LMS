import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanel } from '../components';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function ExamReview() {
    const { courseId, examId } = useParams();
    const { user, authTokens } = useAuth();
    const [exam, setExam] = useState(null);
    const [responses, setResponses] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const fetchExamReview = async () => {
            let response; // Define response variable here
            if (!authTokens) {
              console.error("No auth tokens available");
              return;
            }
            try {
              response = await axios.get(`http://127.0.0.1:8000/api/course/${courseId}/exams/${examId}/review/`, {
                headers: {
                  Authorization: `Bearer ${authTokens.access}`,
                  'Content-Type': 'application/json',
                },
              });
              const { exam, responses, total_score, percentage } = response.data;
              if (!exam || typeof exam.total_questions!== 'number') {
                throw new Error('Invalid exam data');
              }
              setExam(exam);
              setResponses(responses);
              setTotalScore(total_score);
              setPercentage(percentage);
            } catch (error) {
              console.error("Error fetching exam review:", error);
              Toastify({
                text: "Error fetching exam review.",
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
            // Use response variable here
            calculateScores(responses, exam.total_questions);
          };
        
                const { exam, responses, total_score, percentage } = response.data;
        
               
        
        fetchExamReview();
    }, [courseId, examId, authTokens]);

    const calculateScores = (responses, totalQuestions) => {
        let score = 0;
        responses.forEach(response => {
            if (response.is_correct) {
                score += 1;
            }
        });
        setTotalScore(score);
        setPercentage((score / totalQuestions) * 100);
    };

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
                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">{exam.title} - Review</h2>
                    {responses.map((response, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold">{index + 1}. {response.question_text}</h3>
                            <p><strong>Your Response:</strong> {response.user_response}</p>
                            <p><strong>Correct Answer:</strong> {response.correct_answer}</p>
                            <p><strong>Result:</strong> {response.is_correct ? "Correct" : "Incorrect"}</p>
                        </div>
                    ))}
                    <div className="mt-4">
                        <p><strong>Total Score:</strong> {totalScore}</p>
                        <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamReview;
