import React, { useState } from 'react'
import { nextArrow, commentImage } from '../assets'

const Comments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = [
    {
      image : commentImage,
      Usercomment : "We are having a lot of positive feedback about our new LMS. It is so exciting to have such great results from our employees. Recently we received a suggestion from a supervisor for Winterwood. She requested access to see her employee activity results for the team of managers she supervises and eLeaP had this feature right there.",
      commentator : "Jane Doe",
      info : "Global Head of Capability Development",
      company : "Company X",
      position : "Marketing Manager"
    },

    {
      image : commentImage,
      Usercomment : "Test 2",
      commentator : "Test 2",
      info : "Global Head of",
      company : "Company",
      position : "Manager"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1));
  };

  return (
    <div>
      {/* <div className='border bg-strathmore-grey bg-opacity-20 pt-[4.5vw] pb-[3vw] px-[3vw] flex mb-[5vw]'>
        <img src={nextArrow} className='h-[4vw] bg-white rounded-[1.9vw] rotate-180 mt-[7vw] cursor-pointer' />

        {carouselData.map((life, index) => (
          <div key={index} className=' flex gap-[3vw] ml-[15vw]'>
            <img src={life.image} className='h-[17vw]' />

            <div className='w-[33vw] text-[1.05vw] mt-[1vw]'>
              <div>
                <p className='text-strathmore-grey font-semibold leading-[1.7vw]'>
                  {life.Usercomment}
                </p>

                <div className='text-center mt-[2vw] leading-[2vw]'>
                  <p className='font-bold'>
                    {life.comentator}
                  </p>

                  <p className='font-semibold text-strathmore-grey'>
                    {life.info}
                  </p>

                  <p className='font-bold'>
                    {life.company}
                  </p>

                  <p className='font-semibold text-strathmore-grey'>
                    {life.position}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <img src={nextArrow} className='h-[4vw] bg-white rounded-[1.9vw] right-[3vw] absolute mt-[7vw] cursor-pointer' />
      </div> */}

      <div className='border bg-strathmore-grey bg-opacity-20 pt-[4.5vw] pb-[3vw] px-[3vw] flex mb-[5vw]'>
        <img
          src={nextArrow}
          className='h-[4vw] bg-white rounded-[1.9vw] rotate-180 mt-[7vw] cursor-pointer'
          onClick={handlePrev}
        />

        <div className='flex gap-[3vw] ml-[15vw]'>
          <img src={carouselData[currentIndex].image} className='h-[16vw] rounded-[10vw] mt-[1.5vw]' />
          <div className='w-[33vw] text-[1.05vw] mt-[1vw]'>
            <div>
              <p className='text-strathmore-grey font-semibold leading-[1.7vw]'>
                {carouselData[currentIndex].Usercomment}
              </p>
              <div className='text-center mt-[2vw] leading-[2vw]'>
                <p className='font-bold'>{carouselData[currentIndex].commentator}</p>
                <p className='font-semibold text-strathmore-grey'>{carouselData[currentIndex].info}</p>
                <p className='font-bold'>{carouselData[currentIndex].company}</p>
                <p className='font-semibold text-strathmore-grey'>{carouselData[currentIndex].position}</p>
              </div>
            </div>
          </div>
        </div>

        <img
          src={nextArrow}
          className='h-[4vw] bg-white rounded-[1.9vw] right-[3vw] absolute mt-[7vw] cursor-pointer'
          onClick={handleNext}
        />
      </div>
    </div>
  )
}

export default Comments