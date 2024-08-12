// TimedExamPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimedExamPage = ({ exam }) => {
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // duration in seconds
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/exams/${exam.id}/submit/`, { answers });
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  return (
    <div>
      <h1>{exam.title}</h1>
      <p>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
      {exam.questions.map(question => (
        <div key={question.id}>
          <p>{question.question_text}</p>
          <input
            type="text"
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Exam</button>
      {result && (
        <div>
          <h2>Exam Results</h2>
          <p>Score: {result.score} / {result.total_questions}</p>
          <p>Percentage: {result.percentage.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default TimedExamPage;
