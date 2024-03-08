import React from 'react'
import { NavBar } from '../components'
import { pinksweater, pythonForDataScience, star, bigDataImage, dataStructureImg, DataAnalytics } from '../assets'

const UserHomePage = () => {

  const stars = [star, star, star, star, star];
    const coursesImages = [pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics];
    const courseText = ["Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics"];

  return (
    <div>
      <NavBar isLoggedIn={true} />
      
      <div className='flex'>
        <div className='w-[20.5vw] h-[43.8vw] bg-nav-blue'>
          <p>
            Sidepanel
          </p>
        </div>

        
        <div className='w-full h-[43.8vw] overflow-y-auto'>
          <div className='flex gap-[1vw]'>
            <div className='w-[31vw] top-[17vw] left-[8vw] mt-[11vw] ml-[5vw]'>
              <p className='text-strathmore-red text-[3vw] font-semibold leading-[4vw]'>
                Martin, Keep learning at a safe and steady pace.
              </p>

              <p className='text-strathmore-grey font-semibold mt-[2vw] mb-[2.2vw] text-[1.05vw]'>
                <span className='text-nav-blue'>Expert-led courses</span> across a variety of <span className='text-nav-blue'>online class topics</span> for every step of your career. Instructors with real-world experience.
              </p>

              <div className=' flex gap-[2.8vw] justify-center'>
                {/* <Link to="/dl-lms/LearnCoursePage">
                  <div className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white'>
                    <p>
                      Try my free Month
                    </p>
                  </div>
                </Link> */}

                <div className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white'>
                    <p>
                      Start my free Month
                    </p>
                  </div>

                <div className='w-[11vw] h-[2.8vw] border-[0.15vw] border-strathmore-grey text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-strathmore-grey text-[1vw]'>
                  <p>
                    Buy for my Team
                  </p>
                </div>
              </div>
            </div>

            <div>
              <img src={pinksweater} className='h-[35vw] mt-[6vw]' />
            </div>
          </div>


          <div>
            <div className='border w-full h-[8.5vw] bg-opacity-20 bg-strathmore-grey'>
                <p className='text-strathmore-red text-[3vw] mt-[1.8vw] ml-[8vw]'>
                    Top Picks for Martin
                </p>
            </div>

            <div>
                

                <div className='flex justify-center mt-[1.2vw]'>
                    <div className='border w-[80vw] py-[3vw] flex justify-center'>
                        {/* <div>
                            {coursesImages.map((image, index) => (
                                <img key={index} src={image} className='h-[9vw]' />
                            ))}

                            <div className='flex justify-center text-[1vw] font-bold mt-[0.7vw]'>
                                <div>
                                    {courseText.map((text, index) => (
                                        <p key={index}>
                                            {text}
                                        </p>
                                    ))}

                                    <div className='flex text-[0.8vw] my-[0.2vw]'>
                                        <p>
                                            5.0
                                        </p>

                                        <div className='flex gap-[0.2vw] mt-[0.25vw]  mx-[0.5vw]'>
                                            {stars.map((star, index) => (
                                                <img key={index} src={star} className='h-[0.7vw]' />
                                            ))}
                                        </div>

                                        <p className='text-strathmore-grey'>
                                            (23,121)
                                        </p>
                                    </div>

                                    <p className='text-[0.9vw]'>
                                        $74.69
                                    </p>
                                </div>
                            </div>
                        </div> */}


                        <div className='flex gap-[2vw]'>
                            {coursesImages.map((image, index) => (
                                <div key={index} className='cursor-pointer'>
                                    <img src={image} className='h-[9vw]' />
                                    <div className='flex justify-center text-[1vw] font-bold mt-[0.7vw]'>
                                        <div>
                                            <p>{courseText[index]}</p>
                                            <div className='flex text-[0.8vw] my-[0.2vw]'>
                                                <p>5.0</p>
                                                <div className='flex gap-[0.2vw] mt-[0.25vw] mx-[0.5vw]'>
                                                    {stars.map((star, idx) => (
                                                        <img key={idx} src={star} className='h-[0.7vw]' />
                                                    ))}
                                                </div>
                                                <p className='text-strathmore-grey'>(23,121)</p>
                                            </div>
                                            <p className='text-[0.9vw]'>$74.69</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default UserHomePage