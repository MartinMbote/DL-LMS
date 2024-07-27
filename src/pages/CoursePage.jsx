// src/pages/CoursePage.js
import React, { useState, useEffect } from 'react';
import { NavBar } from '../components';
import { star, downArrow, playButton } from '../assets';
import ReactPlayer from 'react-player';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReviewPrompt from './ReviewPrompt';
import { useAuth } from '../context/AuthContext';
import { Subchapter } from '../components';
import {PaymentPrompt} from '../components';

const BASE_URL = 'http://localhost:8000';

const CoursePage = () => {
  const [course, setCourse] = useState({});
  const [userData, setUserData] = useState({});
  const [chapters, setChapters] = useState([]);
  const { user, authTokens } = useAuth();
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const stars = [star, star, star, star, star];
  const { id } = useParams();
  const [rotation, setRotation] = useState({});
  const [visibility, setVisibility] = useState({});
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const history = useNavigate();

  const rotateImage = (index) => {
    setRotation((prevRotation) => ({
      ...prevRotation,
      [index]: (prevRotation[index] || 0) + 180
    }));
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: prevVisibility[index] === 'hidden' ? 'flex' : 'hidden'
    }));
  };

  useEffect(() => {
    if (id) {
      getCourse();
    }
  }, [id]);

 const handleSubchapterClick = (subInfo, isLocked) => {
  if (isLocked && !hasPurchased) {
    setShowPaymentPrompt(true);
    return;
  }

  let videoUrl = subInfo.video;

  if (videoUrl) {
    if (videoUrl.startsWith('/media/')) {
      videoUrl = `${BASE_URL}${videoUrl}`;
    }
    setCurrentVideoUrl(videoUrl);
  } else {
    console.error('Invalid video URL:', videoUrl);
  }

  console.log("Subchapter clicked, subInfo:", subInfo);
  console.log("Setting video URL to:", videoUrl);

  // Show review prompt after 1 minute
  setTimeout(() => {
    setShowReviewPrompt(true);
  }, 60000); // 60000 milliseconds = 1 minute
};


  const getCourse = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/course/${id}/`);
      const data = await response.json();

      if (response.ok) {
        setCourse(data);
        setChapters(Array.isArray(data.chapters) ? data.chapters : []);

        if (typeof data.category === 'number') {
          const categoryResponse = await fetch(`http://127.0.0.1:8000/api/categories/${data.category}/`);
          const categoryData = await categoryResponse.json();
          if (categoryResponse.ok) {
            data.category = categoryData;
          }
        }

        const initialRotation = {};
        const initialVisibility = {};
        if (Array.isArray(data.chapters)) {
          data.chapters.forEach((_, index) => {
            initialRotation[index] = 0;
            initialVisibility[index] = 'hidden';
          });
        }
        setRotation(initialRotation);
        setVisibility(initialVisibility);
      } else {
        console.error("Error fetching course:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const checkPurchaseStatus = async () => {
    // Implement the logic to check if the user has purchased the course
    // For example, fetch the purchase status from your backend
    const response = await fetch(`${BASE_URL}/api/purchase-status/${id}/`, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`
      }
    });
    const data = await response.json();
    setHasPurchased(data.hasPurchased);
  };

  useEffect(() => {
    if (user) {
      checkPurchaseStatus();
    }
  }, [user]);

  const handleConfirmPurchase = () => {
    setShowPaymentPrompt(false);
    history.push(`/checkout/${id}`);
  };

  const handleReviewClose = () => {
    setShowReviewPrompt(false);
  };

  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: userData.profile_picture,
  };

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const averageRating = course.reviews && course.reviews.length > 0
    ? course.reviews.reduce((acc, review) => acc + parseFloat(review.review_rating), 0) / course.reviews.length
    : 0;

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
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload'
                      }
                    },
                    attributes: {
                      controls: true
                    }
                  }}
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
              <Subchapter />

              <p className="text-[1.4vw] font-semibold mb-[0.6vw]">
                Learner Reviews
              </p>

              <div className="flex">
                <p className="ml-[1vw] text-[1vw] text-strathmore-grey font-semibold">
                  {averageRating.toFixed(2)} out of 5
                </p>

                <div className="flex gap-[0.2vw] mt-[0.45vw] mx-[0.7vw]">
                  {stars.map((starImg, idx) => (
                    <img
                      key={idx}
                      src={starImg}
                      className="h-[0.7vw]"
                      alt={`star-${idx}`}
                      style={{ opacity: idx < Math.round(averageRating) ? 1 : 0.5 }}
                    />
                  ))}
                </div>

                <div>
                  <p className="text-[1vw] text-strathmore-grey font-semibold">
                    {course.reviews ? course.reviews.length : 0} Ratings
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
            {chapters.map((chapter, chapterIndex) => (
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

                    <div className='flex' onClick={() => handleSubchapterClick(subInfo, chapterIndex > 0)}>
                      <img src={playButton} className='h-[1.2vw] mt-[0.95vw] ml-[1vw]' alt="play button" />

                      <div className='font-semibold mt-[0.35vw]'>
                        <p className='text-[0.85vw]'>
                          {subInfo.title}
                        </p>
                        <p className='text-[0.7vw] text-strathmore-grey'>
                          10m 30s
                        </p>
                      </div>
                    </div>

                    <Link to={`/dl-lms/quizpage/${id}/${chapter.id}/${subInfo.id}`}>
                      <div className='py-[1.8vw] text-[0.75vw] flex font-semibold pl-[2vw] cursor-pointer'>
                        Quiz
                      </div>
                    </Link>
                     
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showReviewPrompt && <ReviewPrompt courseId={id} onClose={handleReviewClose} />}
      {showPaymentPrompt && (
        <PaymentPrompt
          course={course}
          onClose={() => setShowPaymentPrompt(false)}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
};

export default CoursePage;
