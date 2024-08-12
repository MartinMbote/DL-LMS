import React, { useState, useEffect } from 'react';
import { star } from '../assets';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const stars = [star, star, star, star, star];

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      let response = await fetch('http://127.0.0.1:8000/api/courses/', {
        method: 'GET'
      });
      let data = await response.json();

      if (response.status === 200) {
        console.log(data); // Log the fetched data
        setCourses(data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.review_rating), 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div>
      <div className='border w-full h-[8.5vw] bg-opacity-20 bg-strathmore-grey'>
        <p className='text-strathmore-red text-[3vw] mt-[2vw] ml-[8vw]'>
          Explore Courses
        </p>
      </div>

      <div>
        <div className='flex justify-center mt-[1.2vw]'>
          {['Data Science', 'Game Development', '3D Animation', 'Project Management', 'Cyber Security', 'Design'].map((category, index) => (
            <div
              key={index}
              className='w-[10vw] py-[0.5vw] border-b-[0.25vw] border-strathmore-grey text-center text-[1.08vw] text-strathmore-grey font-semibold hover:text-nav-blue hover:border-nav-blue cursor-pointer'
            >
              <p>{category}</p>
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-[1.2vw]'>
          <div className='border w-[80vw] py-[3vw] flex flex-wrap justify-center gap-[2vw]'>
            {courses.map((course, index) => (
              <div key={index} className='cursor-pointer w-[20vw]'>
                {course?.id ? (
                  <Link to={`/dl-lms/course/${course.id}`}>
                    <img src={course.image} alt={course.title} className='h-[9vw]' />
                    <div className='ml-[2vw] text-[1vw] font-bold mt-[0.7vw]'>
                      <div>
                        <p>{course.title}</p>
                        <div className='flex text-[0.8vw] my-[0.2vw]'>
                          <p>{calculateAverageRating(course.reviews)}</p>
                          <div className='flex gap-[0.2vw] mt-[0.25vw] mx-[0.5vw]'>
                            {stars.slice(0, Math.round(calculateAverageRating(course.reviews))).map((star, idx) => (
                              <img key={idx} src={star} className='h-[0.7vw]' />
                            ))}
                          </div>
                          <p className='text-strathmore-grey'>({course.reviews?.length || 0})</p>
                        </div>
                        <p className='text-[0.9vw]'>${course.price}</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <p>Course ID undefined</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

