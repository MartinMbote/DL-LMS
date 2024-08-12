import React, { useState, useEffect } from 'react';
import { NavBar } from '../components';
import { star, downArrow, playButton } from '../assets';
import ReactPlayer from 'react-player';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
import { useAuth } from '../context/AuthContext';
import { Subchapter } from '../components';
import { PaymentPrompt } from '../components';

const BASE_URL = 'http://localhost:8000';

const CoursePage = () => {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [rotation, setRotation] = useState({});
  const [visibility, setVisibility] = useState({});
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [exams, setExams] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const { user, authTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);
 
  
  useEffect(() => {
    fetchExams();
  }, [id]);

  useEffect(() => {
    if (user) {
      checkPurchaseStatus();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!authTokens) {
      setError('You must be logged in to submit a review');
      return;
    }

    try {
      const token = authTokens.access; // Ensure you have access to the token here
      const response = await axios.post(
        `http://127.0.0.1:8000/api/courses/${id}/reviews/`,
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
      fetchCourse(); // Refresh the course data to include the new review
      setRating(0); // Reset rating
      setReview(''); // Reset review
      setError(''); // Clear any errors
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/course/${id}/`);
      const data = await response.json();

      if (response.ok) {
        const courseChapters = data.chapters || [];
        courseChapters.forEach(chapter => {
          chapter.subchapters = chapter.subchapters || [];
        });

        setCourse(data);
        setChapters(courseChapters);

        const initialRotation = {};
        const initialVisibility = {};
        courseChapters.forEach((_, index) => {
          initialRotation[index] = 0;
          initialVisibility[index] = 'hidden';
        });
        setRotation(initialRotation);
        setVisibility(initialVisibility);
      } else {
        console.error("Error fetching course:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/course/${id}/exams/`);
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };


  const refreshToken = async () => {
    try {
      console.log(`authTokens.refresh: ${authTokens.refresh}`); // Log the refresh token
      const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: 'POST',
        body: JSON.stringify({ refresh: authTokens.refresh }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to refresh token: ${errorData.detail || response.statusText}`);
      }
  
      const data = await response.json();
      // Update authTokens with the new access token
      setAuthTokens({ ...authTokens, access: data.access });
      localStorage.setItem('authTokens', JSON.stringify({ ...authTokens, access: data.access }));
  
      return data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; // Propagate the error
    }
  };
  
  const checkPurchaseStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/purchase-status/${id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log('API response:', response.data);
  
      // Update purchaseStatus based on the purchased property
      setPurchaseStatus(response.data.purchased ? 'completed' : 'not-purchased');
  
      console.log('purchaseStatus set to:', purchaseStatus);
    } catch (error) {
      console.error('Error checking purchase status:', error);
    }
  };
  

  const handleSubchapterClick = (subInfo, isLocked, chapterIndex) => {
    if (!user) {
      setError('You must be logged in to access this chapter');
      return;
    }
  
    if (purchaseStatus === 'completed') {
      const videoUrl = subInfo.video?.startsWith('/media/')
        ? `${BASE_URL}${subInfo.video}`
        : subInfo.video;
  
      if (videoUrl) {
        setCurrentVideoUrl(videoUrl);
      } else {
        console.error('Invalid video URL:', videoUrl);
      }
    } else if (isLocked && (purchaseStatus === 'failed' || purchaseStatus === 'pending') && chapterIndex > 0) {
      setShowPaymentPrompt(true); // Show payment prompt only if user hasn't purchased the course and purchase status is not completed
    } else {
      const videoUrl = subInfo.video?.startsWith('/media/')
        ? `${BASE_URL}${subInfo.video}`
        : subInfo.video;
  
      if (videoUrl) {
        setCurrentVideoUrl(videoUrl);
      } else {
        console.error('Invalid video URL:', videoUrl);
      }
    }
  };
  
  const rotateImage = (index) => {
    setRotation(prevRotation => ({
      ...prevRotation,
      [index]: (prevRotation[index] || 0) + 180
    }));
    setVisibility(prevVisibility => ({
      ...prevVisibility,
      [index]: prevVisibility[index] === 'hidden' ? 'flex' : 'hidden'
    }));
  };

  const handleConfirmPurchase = () => {
    setShowPaymentPrompt(false);
    navigate(`/dl-lms/checkout/${id}/${course.price}`);
  };

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const averageRating = course.reviews?.length
    ? course.reviews.reduce((acc, review) => acc + parseFloat(review.review_rating), 0) / course.reviews.length
    : 0;

  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: user?.profile_picture,
  };

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className="ml-[5.6vw] flex gap-[3vw]">
        <div>
          <p className="py-[1.5vw] text-[1.1vw] font-semibold text-strathmore-grey">
            From the Course: <span className="text-nav-blue">{course.category_name || 'Uncategorized'}</span>
          </p>

          <div>
            <div className="flex justify-center h-[32.95vw] w-[58.5vw] border bg-black">
              {currentVideoUrl && (
                <ReactPlayer
                  url={currentVideoUrl}
                  width="100%"
                  height="100%"
                  config={{ file: { attributes: { controlsList: 'nodownload' } }, attributes: { controls: true } }}
                />
              )}
            </div>

            <div className="border w-[58.5vw] pl-[3vw] pt-[0.5vw] pb-[1.4vw]">
              <p className="text-[1.7vw] font-semibold">
                {course.title}
              </p>

              <p className="text-[1vw] text-strathmore-grey font-semibold">
                From the Course: <span className="text-nav-blue">{course.category_name || 'Uncategorized'}</span>
              </p>

              <div className="w-[13.5vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white mt-[0.5vw]">
                <p>
                  Start my 1-month free trial
                </p>
              </div>
            </div>

            <div className="pl-[3vw] pt-[3vw] w-[58.5vw] mb-[13vw]">
              <p className="text-[1.4vw] font-semibold mb-[1vw]">
                Course Details
              </p>

              <p className="text-[0.9vw] text-strathmore-grey font-semibold mb-[1.2vw]">
                {course.description}
              </p>

              <p className="text-[1.4vw] font-semibold mb-[0.8vw]">
                Skills you will gain
              </p>

              <p className="border-[0.15vw] py-[0.6vw] w-[16vw] text-[1vw] flex justify-center text-strathmore-grey font-semibold border-strathmore-grey rounded-[0.6vw] mb-[1vw] cursor-none">
                {course.skills}
              </p>

              <p className="text-[1.4vw] font-semibold mb-[0.6vw]">
                Meet the Instructor
              </p>

              <Link to={`/dl-lms/ProfilePage/${course.created_by_username}`}>
                <p className="ml-[1vw] text-[1.1vw] text-nav-blue font-semibold mb-[0.6vw]">
                  {course.created_by_username || 'Instructor'}
                </p>
              </Link>

              <p className="text-[1.4vw] font-semibold mb-[0.6vw]">
                Learner Reviews
              </p>

              <div className="flex">
                <p className="ml-[1vw] text-[1vw] text-strathmore-grey font-semibold">
                  {averageRating.toFixed(2)} out of 5
                </p>

                <div className="flex gap-[0.2vw] mt-[0.45vw] mx-[0.7vw]">
                  {Array(5).fill().map((_, idx) => (
                    <img
                      key={idx}
                      src={star}
                      className="h-[0.7vw]"
                      alt={`star-${idx}`}
                      style={{ opacity: idx < Math.round(averageRating) ? 1 : 0.5 }}
                    />
                  ))}
                </div>

                <div>
                  <p className="text-[1vw] text-strathmore-grey font-semibold">
                    {course.reviews?.length || 0} Ratings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className='py-[1.5vw] text-[1.1vw] font-semibold text-strathmore-grey'>
            Chapters
          </p>

          <div className='w-[22.8vw] border-[0.15vw] rounded-[0.4vw] border-gray-300 bg-white'>
            {chapters.length > 0 ? (
              chapters.map((chapter, chapterIndex) => (
                <div className='border-t-[0.15vw]' key={chapterIndex}>
                  <div className='py-[1.8vw] text-[1.1vw] flex font-semibold pl-[2vw] cursor-pointer' onClick={() => rotateImage(chapterIndex)}>
                    <p className='w-[16vw]'>
                      {chapter.title}
                    </p>

                    <img
                      src={downArrow}
                      className='transition ease-in-out duration-600 h-[1vw] mt-[0.32vw]'
                      style={{ transform: `rotate(${rotation[chapterIndex]}deg)` }}
                      alt={`arrow-${chapterIndex}`}
                    />
                  </div>

                  {chapter.subchapters.map((subInfo, subIndex) => (
  <div key={subIndex} className={`w-full active:bg-nav-blue active:bg-opacity-30 flex flex-col gap-[0.8vw] cursor-pointer ${visibility[chapterIndex]}`}>
    <div className='h-full w-[0.4vw] opacity-0 bg-nav-blue'></div>

    <div className='flex' onClick={() => {
  if (!user) {
    setError('You must be logged in to access this chapter');
  } else if (purchaseStatus !== null && purchaseStatus !== undefined) {
    if (purchaseStatus === 'completed') {
      const videoUrl = subInfo.video?.startsWith('/media/')
        ? `${BASE_URL}${subInfo.video}`
        : subInfo.video;
      if (videoUrl) {
        setCurrentVideoUrl(videoUrl);
      } else {
        console.error('Invalid video URL:', videoUrl);
      }
    } else if (purchaseStatus === 'not-purchased') {
      setShowPaymentPrompt(true);
    }
  } else {
    console.log('Purchase status is not available yet');
  }
}}>
      <img src={playButton} className='h-[1.2vw] mt-[0.95vw] ml-[1vw]' alt="play button" />

      <div className='font-semibold mt-[0.35vw]'>
        <p className='text-[0.85vw]'>
          {subInfo.title}
        </p>
        <p className='text-[0.7vw] text-strathmore-grey'>
          {formatDuration(subInfo.duration)}
        </p>
      </div>
    </div>

    <Link to={`/dl-lms/course/${id}/notes/${chapter.id}/${subInfo.id}`}>
      <div className='py-[1.8vw] text-[0.75vw] flex font-semibold pl-[2vw] cursor-pointer'>
        Notes
      </div>
    </Link>
    <Link to={`/dl-lms/quizpage/${id}/${chapter.id}/${subInfo.id}`}>
      <div className='py-[1.8vw] text-[0.75vw] flex font-semibold pl-[2vw] cursor-pointer'>
        Quiz
      </div>
    </Link>
  </div>
))}
                </div>
              ))
            ) : (
              <p>

              </p>
            )}
          </div>
          <div>
  <p className="py-[1.5vw] text-[1.1vw] font-semibold text-strathmore-grey">
    Exams
  </p>
  <div className="w-[22.8vw] border-[0.15vw] rounded-[0.4vw] border-gray-300 bg-white">
    {exams.map((exam, index) => (
      <div key={index} className="border-t-[0.15vw]">
        <p
          className="py-[1.8vw] text-[1.1vw] flex font-semibold pl-[2vw] cursor-pointer"
          onClick={() => navigate(`/dl-lms/course/${id}/exam/${exam.id}/page`)}
        >
          {exam.title}
        </p>
      </div>
    ))}
  </div>
</div>
        </div>
        
      </div>

      <div className="px-[5.6vw] pt-[2vw] pb-[5vw] bg-white border-t border-gray-300">
        <h2 className="text-[1.4vw] font-semibold mb-[0.6vw]">Rate and Review</h2>
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
        <button className="w-[13.5vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white mt-[0.5vw]" onClick={handleSubmit}>
          Submit
        </button>

        <div className="mt-8">
          <h2 className="text-[1.4vw] font-semibold mb-[1vw]">Reviews</h2>
          {course.reviews?.length ? (
            course.reviews.map((review, idx) => (
              <div key={idx} className="border-b py-4">
                <div className="flex items-center mb-2">
                  {Array(5).fill().map((_, starIdx) => (
                    <img
                      key={starIdx}
                      src={star}
                      className="h-[1.2vw]"
                      alt={`star-${starIdx}`}
                      style={{ opacity: starIdx < review.review_rating ? 1 : 0.5 }}
                    />
                  ))}
                  <p className="text-[0.9vw] text-strathmore-grey font-semibold mb-[1.2vw]">{review.review_rating} out of 5</p>
                </div>
                <p className="text-[0.9vw] text-strathmore-grey font-semibold mb-[1.2vw]">{review.review_text}</p>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>

      {showPaymentPrompt && !hasPurchased && (
  <PaymentPrompt
    coursePrice={course.price}
    courseTitle={course.title}
    courseId={course.id}
    onConfirm={handleConfirmPurchase}
    onClose={() => setShowPaymentPrompt(false)}
  />
)}
    </div>
  );
};

export default CoursePage;
