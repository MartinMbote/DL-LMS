import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';  // Assuming AuthProvider is correctly implemented

const ReviewPrompt = ({ onClose, courseId, onReviewPosted }) => {
  const { authTokens } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!authTokens) {
      setError('You must be logged in to submit a review');
      return;
    }

    try {
      const token = authTokens.access; // Ensure you have access to the token here
      const response = await axios.post(
        `http://127.0.0.1:8000/api/courses/${courseId}/reviews/`,
        {
          review_text: review,
          review_rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Review submitted:', response.data);
      onReviewPosted(response.data); // Call callback to update reviews
      onClose(); // Close modal or perform other action upon successful submission
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Rate and Review</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="w-full border p-2 rounded-lg mb-4"
          rows="4"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSubmit}>
            Submit
          </button>
          <a href="#" className="text-blue-500 underline ml-4" onClick={(e) => { e.preventDefault(); onClose(); }}>
            Not Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReviewPrompt;
